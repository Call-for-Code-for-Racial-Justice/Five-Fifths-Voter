<script>
import createDebug from 'debug';
const debug = createDebug('map:marker');

export default {
  props: {
    google: {
      type: Object,
      required: true,
    },
    map: {
      type: Object,
      required: true,
    },
    marker: {
      type: Object,
      required: true,
    },
    geocode: {
      type: Boolean,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    collection: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      theinfo: null,
      mapMarker: null,
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
  async mounted() {
    const { Geocoder, Marker, InfoWindow } = this.google.maps;
    debug('creating map pin for', this.marker);

    if (!this.marker?.position?.lat || !this.marker?.position?.lng) {
      if (this.geocode) {
        // try to get a latitude & longitude for this address
        const geocoder = new Geocoder();
        const results = await geocoder.geocode({ address: this.marker.position.address });
        debug('geocoded', results);
        this.marker.position = results[0]?.geometry?.location;
      }
    }

    // If we have latitude & longitude for this address
    if (this.marker?.position?.lat && this.marker?.position?.lng) {
      const markerConfig = {
        position: this.marker.position,
        title: this.marker.title,
        marker: this.marker,
        map: this.map,
      };
      if (this.icon) {
        markerConfig.icon = this.icon;
      }
      this.mapMarker = new Marker(markerConfig);

      // Attached an info window to the marker and open it on click
      if (this.marker.info) {
        this.theinfo = new InfoWindow({
          content: this.marker.info,
        });
        this.theinfo.set('map', this.map);
        this.theinfo.set('marker', this.mapMarker);
        this.mapMarker.addListener('click', this.showInfo);
      }
      this.collection.push(this.mapMarker);
    }
  },
  methods: {
    showInfo() {
      const map = this.theinfo.get('map');
      const mrk = this.theinfo.get('marker');
      this.theinfo.open(map, mrk);
    },
  },
  render() {
    return null;
  },
};
</script>
