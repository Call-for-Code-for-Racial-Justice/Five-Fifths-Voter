<template>
  <GoogleMapLoader :mapConfig="mapConfig" :apiKey="apiKey">
    <template slot-scope="{ google, map }">
      <GoogleMapMarker
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :google="google"
        :map="map"
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
    //return { apiKey: process.env.VUE_APP_GOOGLE_MAP_API_KEY };
    return { apiKey: 'AIzaSyCv4YnvgzgyoPUf0kI9JuUxrG928fR5XdY' };
  },

  computed: {
    mapConfig() {
      return {
        ...mapSettings,
        center: this.mapCenter
      };
    },

    mapCenter() {
      return this.markers[0].position;
    }
  }
};
</script>
