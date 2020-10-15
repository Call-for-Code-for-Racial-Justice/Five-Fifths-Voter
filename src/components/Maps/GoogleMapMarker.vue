<script>
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
    collection: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      theinfo: null,
    };
  },
  mounted() {
    const { Marker, InfoWindow } = this.google.maps;

    var mapMarker = new Marker({
      position: this.marker.position,
      title: this.marker.title,
      marker: this.marker,
      map: this.map,
    });

    // Attached an info window to the marker and open it on click
    if (this.marker.info) {
      this.theinfo = new InfoWindow({
        content: this.marker.info,
      });
      this.theinfo.set('map', this.map);
      this.theinfo.set('marker', mapMarker);
      mapMarker.addListener('click', this.showInfo);
    }

    this.collection.push(mapMarker);
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
