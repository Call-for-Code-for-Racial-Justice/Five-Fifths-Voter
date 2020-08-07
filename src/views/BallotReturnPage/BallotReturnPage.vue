<template>
  <div class="bx--grid bx--grid--full-width landing-page">
    <div class="bx--row landing-page__r2">
      <div class="bx--col-lg-16">
        <div v-html="locationTable"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ballotreturn',
  data() {
    return {
      locationTable: 'Locations'
    };
  },
  mounted() {
    axios
      .get('/ballotreturn/locations', {
        baseURL: process.env.VUE_APP_SERVICE_API_HOST,
        params: {
          stateid: 'GA',
          locid: 'FULTON'
        }
      })
      .then(response => (this.locationTable = response.data.dom));
  },
  methods: {}
};
</script>
