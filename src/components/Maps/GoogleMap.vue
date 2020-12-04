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

      <!-- home / center marker -->
      <GoogleMapMarker
        :key="voterAddress.id"
        :marker="voterAddress"
        :google="google"
        :map="map"
        :geocode="true"
        :icon="require('@/assets/icons/user.png')"
        :collection="centerRef"
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
    markers: Array,
    home: String
  },
  data() {
    return {
      apiKey: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
      markerRefs: [],
      centerRef: []
    };
  },
  watch: {},
  computed: {
    voterAddress() {
      return {
        id: this.home,
        position: { address: this.home },
        title: 'Voter Address'
      };
    },
    mapConfig() {
      return {
        ...mapSettings,
        center: this.mapCenter
      };
    },
    mapCenter() {
      // Use the center ref or the first map marker as the center
      var cntr;
      if (this.centerRef && this.centerRef.length) {
        var posHome = this.centerRef[0].getPosition();
        cntr = posHome;
      } else if (this.markerRefs && this.markerRefs.length) {
        var pos = this.markerRefs[0].getPosition();
        cntr = pos;
      } else cntr = { lat: 38.889805, lng: -77.009056 };
      return cntr;
    }
  },
  methods: {}
};
</script>
