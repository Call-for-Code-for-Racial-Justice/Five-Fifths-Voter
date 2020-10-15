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
      map: null
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
      // Recenter / re-zoom the map whe the center changes
      this.reCenter();
    }
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig);
    },
    reCenter() {
      // reset the center and zoom level
      try {
        this.map.panTo(this.center);
        this.map.setZoom(this.mapConfig.zoom);
      } catch (error) {
        /* eslint no-console: 0 */
        console.error(error);
      }
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
