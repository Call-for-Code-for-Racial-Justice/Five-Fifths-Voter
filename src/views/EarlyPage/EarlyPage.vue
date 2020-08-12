<template>
  <cv-content id="#main-content">
    <div class="bx--grid bx--grid--full-width landing-page">
      <div class="bx--row landing-page__r2">
        <div class="bx--col-lg-16">
          <cv-text-input
            v-model.trim="postal_code"
            label="Zip Code?"
            placeholder="99999"
            :invalid-message="invalid_zip"
            @input="zipChange"
          ></cv-text-input>
          <div
            v-if="state !== 'GA' && state !== ''"
          >{{ counties[0] }}, {{ state }} is not supported at this time</div>
          <div v-html="locationTable"></div>
          <div v-if="state !== ''" class="smalllink">
            Zip Code data powered by
            <cv-link href="https://www.geonames.org" target="_blank">geonames.org</cv-link>
          </div>
        </div>
      </div>
    </div>
  </cv-content>
</template>

<script>
import axios from 'axios';
const zipregex = /^[0-9]{5}$/;

export default {
  name: 'earlyvoting',
  data() {
    return {
      locationTable: 'Search by Zip Code',
      postal_code: '',
      invalid_zip: '',
      state: '',
      counties: '',
    };
  },
  mounted() {},
  methods: {
    zipChange: function () {
      this.counties = '';
      this.state = '';

      if (this.postal_code !== '') {
        let m = zipregex.exec(this.postal_code);
        if (m === null) {
          this.invalid_zip =
            'Enter valid zip code (' + zipregex.exec(this.postal_code) + ')';
        } else {
          this.invalid_zip = '';
          axios
            .get('/postcode', {
              baseURL: process.env.VUE_APP_SERVICE_API_HOST,
              params: {
                id: this.postal_code,
              },
            })
            .then((response) => {
              this.counties = response.data.county;
              this.state = response.data.state;
              axios
                .get('/earlyvoting/locations', {
                  baseURL: process.env.VUE_APP_SERVICE_API_HOST,
                  params: {
                    stateid: this.state,
                    locid: this.counties[0],
                  },
                })
                .then((response) => (this.locationTable = response.data.dom))
                .catch((error) => {
                  error;
                  this.locationTable = 'No Data Available';
                });
            })
            .catch((error) => {
              error;
              this.invalid_zip = 'Enter valid zip code';
            });
        }
      } else {
        this.invalid_zip = '';
      }
    },
  },
};
</script>
