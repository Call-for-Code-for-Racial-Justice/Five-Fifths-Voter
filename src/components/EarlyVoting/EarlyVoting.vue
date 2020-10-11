<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside">
        <div class="aside__container--text">
          <h2 class="aside__header">Vote like it's hot</h2>
          <p class="aside__paragraph">
            voting is the future for your neighbors, your friends, your family,
            and yourself.
          </p>
          <cv-button>Register to vote now</cv-button>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside class="aside__container--img">
        <img
          class="aside__image"
          src="../../assets/support-page-father-baby-image-1.jpg"
          alt="Man lounges on beanbag chair while browsing on his laptop"
        />
      </aside>
    </template>
  </MainContent>
  <!-- <section class="main main--early-voting">
    <aside class="locations">
      <h1 class="heading--lg">find your early voting location.</h1>
      <cv-text-input
        v-model.trim="postal_code"
        label="enter a 5 digit zip code below."
        placeholder="99999"
        :invalid-message="invalid_zip"
        @input="zipChange"
      ></cv-text-input>
      <div v-if="state !== 'GA' && state !== ''">
        {{ counties[0] }}, {{ state }} is not supported at this time
      </div>
      <div v-if="state === ''" v-html="locationTable"></div>
      {{ /* todo: only GA is supported but this should really be a check against the available states */ }}
      <div
        v-if="state === 'GA'"
        class="locations__table"
        v-html="locationTable"
      ></div>
      <div v-if="state !== ''" class="smalllink">
        Zip Code data powered by
        <cv-link href="https://www.geonames.org" target="_blank"
          >geonames.org</cv-link
        >
      </div>
    </aside>
    <img
      class="map"
      src="../../assets/holder-atlanta-map.png"
      alt="google map img"
    />
  </section> -->
</template>

<script>
//todo: The zip lookup and the templates parts that use it should be its own component.
// This componet should be able to just include, for example, <ZipToData service='/earlyvoting/locations'/>

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
      counties: ''
    };
  },
  mounted() {},
  methods: {
    zipChange: function() {
      this.counties = '';
      this.state = '';

      if (this.postal_code !== '') {
        let m = zipregex.exec(this.postal_code);
        if (m === null) {
          this.invalid_zip =
            'Enter valid zip code (' + zipregex.exec(this.postal_code) + ')';
          this.locationTable = 'No Data Available';
        } else {
          this.invalid_zip = '';
          axios
            .get('/postcode', {
              baseURL: process.env.VUE_APP_SERVICE_API_HOST,
              params: {
                id: this.postal_code
              }
            })
            .then(response => {
              this.counties = response.data.county;
              this.state = response.data.state;
              axios
                .get('/earlyvoting/locations', {
                  baseURL: process.env.VUE_APP_SERVICE_API_HOST,
                  params: {
                    stateid: this.state,
                    locid: this.counties[0]
                  }
                })
                .then(response => (this.locationTable = response.data.dom))
                .catch(error => {
                  error;
                  this.locationTable = 'No Data Available';
                });
            })
            .catch(error => {
              error;
              this.invalid_zip = 'Enter valid zip code';
            });
        }
      } else {
        this.invalid_zip = '';
      }
    }
  }
};
</script>
