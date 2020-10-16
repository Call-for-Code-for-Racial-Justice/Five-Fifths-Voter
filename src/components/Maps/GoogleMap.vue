<template>
  <GoogleMapLoader :mapConfig="mapConfig" :center="mapCenter" :apiKey="apiKey">
    <template slot-scope="{ google, map }">
      <GoogleMapMarker
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :google="google"
        :map="map"
        :collection="markerRefs"
      />
    </template>
  </GoogleMapLoader>
</template>

<script>
import GoogleMapLoader from './GoogleMapLoader';
import GoogleMapMarker from './GoogleMapMarker';

import { mapSettings } from './constants/mapSettings';

export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker
  },
  props: {
    markers: Array
  },
  data() {
    return {
      apiKey: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
      markerRefs: []
    };
  },
  watch: {},
  computed: {
    mapConfig() {
      return {
        ...mapSettings,
        center: this.mapCenter
      };
    },
    mapCenter() {
      var cntr;
      if (this.markers && this.markers.length) cntr = this.markers[0].position;
      else cntr = { lat: 38.889805, lng: -77.009056 };
      return cntr;
    }
  },
  methods: {
    clearMarkers() {
      // Remove all the existing markers. This should be called when the polling place request is updated
      try {
        this.markerRefs.forEach(element => {
          if (element.setMap) element.setMap(null);
        });
        this.markerRefs = [];
      } catch (error) {
        /* eslint no-console: 0 */
        console.error(error);
      }
    }
  }
};
</script>
