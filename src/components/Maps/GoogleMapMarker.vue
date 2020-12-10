<script>
export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    marker: {
      type: Object,
      required: true
    },
    geocode: {
      type: Boolean,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    collection: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      theinfo: null,
      mapMarker: null
    };
  },
  beforeDestroy() {
    //console.log('remove from map', this.marker.position);
    try {
      this.mapMarker.setMap(null);
    } catch (error) {
      error;
    }
  },
  mounted() {
    const { Geocoder, GeocoderStatus, Marker, InfoWindow } = this.google.maps;

    new Promise((resolve, reject) => {
      // If there is already a lat/lng then we are done
      if (this.marker.position.lat && this.marker.position.lng) {
        return resolve(this.marker);
      }

      if (!this.geocode) return reject('geocoding not enabled');

      // otherwise the address has to be geocoded
      var geocoder = new Geocoder();
      geocoder.geocode(
        { address: this.marker.position.address },
        function(results, status) {
          if (status == GeocoderStatus.OK) {
            // update the position with the lat/lng for mthe geocoder
            this.marker.position = results[0].geometry.location;
            return resolve(this.marker);
          }
          return reject('geocoded failed');
        }.bind(this)
      );
    })
      .then(marker => {
        // At this point we have a marker that includes a lat/lng
        this.marker = marker;
        var markerConfig = {
          position: this.marker.position,
          title: this.marker.title,
          marker: this.marker,
          map: this.map
        };
        if (this.icon) {
          markerConfig.icon = this.icon;
        }
        this.mapMarker = new Marker(markerConfig);

        // Attached an info window to the marker and open it on click
        if (this.marker.info) {
          this.theinfo = new InfoWindow({
            content: this.marker.info
          });
          this.theinfo.set('map', this.map);
          this.theinfo.set('marker', this.mapMarker);
          this.mapMarker.addListener('click', this.showInfo);
        }

        this.collection.push(this.mapMarker);
        return null;
      })
      .catch(reason => {
        // do no create a marker for this address
        /* eslint no-console: 0 */
        console.error(reason);
      });
  },
  methods: {
    showInfo() {
      const map = this.theinfo.get('map');
      const mrk = this.theinfo.get('marker');
      this.theinfo.open(map, mrk);
    }
  },
  render() {
    return null;
  }
};
</script>
