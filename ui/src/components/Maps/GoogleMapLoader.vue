<template>
  <div>
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot :google="google" :map="map" />
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader';

export default {
  props: {
    mapConfig: Object,
    apiKey: { type: String, required: true },
    center: { type: Object, required: true }
  },

  data() {
    return {
      google: null,
      map: null,
      codedCenter: {},
      codedAddress: ''
    };
  },

  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    });
    this.google = googleMapApi;
    this.initializeMap();
  },
  watch: {
    center() {
      //console.log('center changed', this.center);

      // Recenter / re-zoom the map whe the center changes
      this.reCenter();
    }
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      var config = this.mapConfig;
      if (!config.center.lat || !config.center.lat) {
        // use place holder center
        config.center = { lat: 38.889805, lng: -77.009056 }; // Washington DC
        setTimeout(() => {
          this.reCenter();
        }, 0.5);
      }
      this.map = new this.google.maps.Map(mapContainer, config);
    },
    reCenter() {
      const { Geocoder, GeocoderStatus } = this.google.maps;
      // reset the center and zoom level
      new Promise((resolve, reject) => {
        // If there is already a lat/lng then we are done
        if (this.center.lat && this.center.lng) {
          this.codedCenter = this.center; // center is already geocoded
          //console.log('center is already geocoded', this.center);
          return resolve(this.codedCenter);
        }

        // Maybe we already coded this address?
        if (this.codedAddress === this.center.address) {
          //console.log('center previously geocoded', this.center, this.codedCenter);
          return resolve(this.codedCenter);
        } else {
          this.codedCenter = {};
          this.codedAddress = '';
        }

        // otherwise the address has to be geocoded
        //console.log('geocoding', this.center.address);
        var geocoder = new Geocoder();
        geocoder.geocode(
          { address: this.center.address },
          function(results, status) {
            if (status == GeocoderStatus.OK) {
              // update the position with the lat/lng for mthe geocoder
              this.codedCenter = results[0].geometry.location;
              this.codedAddress = this.center.address;
              return resolve(this.codedCenter);
            }
            console.error(results, status);
            return reject('geocoded failed');
          }.bind(this)
        );
      })
        .then(cntr => {
          // At this point we have a center that includes a lat/lng
          this.map.panTo(cntr);
          this.map.setZoom(this.mapConfig.zoom);
          return null;
        })
        .catch(reason => {
          /* eslint no-console: 0 */
          console.error(reason);
        });
    }
  }
};
</script>

<style scoped>
.google-map {
  width: 100%;
  min-height: 100%;
}
</style>
