<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside">
        <div class="aside__container--text">
          <h2 class="aside__header">
            Candidates, deadlines and signups, oh my!
          </h2>
          <p class="aside__paragraph">
            Vote early if you can but if today is election day get to the polls
            now!
          </p>
          <cv-text-input
            :label="addressLabel"
            v-model="addressValue"
            :placeholder="placeholder"
            @input="updatedAddress"
          >
          </cv-text-input>
          <cv-button
            kind="primary"
            @click="showPollingLocation"
            :disabled="buttonDisabled"
          >
            Show Polling Location
          </cv-button>
          <p>{{ message }}</p>

          <p v-if="voterData.election">
            {{ voterData.election.name }}
          </p>
          <div v-if="voterData.state">
            <p>
              {{ voterData.state[0].name }}
              <span v-if="voterData.state[0].electionAdministrationBody.name">
                -
                {{ voterData.state[0].electionAdministrationBody.name }}
              </span>
            </p>
            <span v-if="electionInfoUrl">
              <cv-link :href="electionInfoUrl"> Election Info</cv-link><br />
            </span>
            <span v-if="electionRegistrationUrl">
              <cv-link :href="electionRegistrationUrl">
                Register To Vote</cv-link
              ><br />
            </span>
            <span v-if="electionRegistrationConfirmationUrl">
              <cv-link :href="electionRegistrationConfirmationUrl">
                Confirm you are Registered To Vote</cv-link
              ><br />
            </span>
            <span v-if="absenteeVotingInfoUrl">
              <cv-link :href="absenteeVotingInfoUrl">
                Get Absentee Ballot</cv-link
              ><br />
            </span>
            <span v-if="votingLocationFinderUrl">
              <cv-link :href="votingLocationFinderUrl">
                Confirm Your Polling Location</cv-link
              ><br />
            </span>
            <span v-if="ballotInfoUrl">
              <cv-link :href="ballotInfoUrl"> What's On The Ballot</cv-link
              ><br />
            </span>
            <div>
              <p v-for="item in voterData.pollingLocations" :key="item.index">
                <span class="polling-hours">
                  {{ item.pollingHours }}
                </span>
                <span class="polling-name">
                  {{ item.address.locationName }}
                </span>
                <span class="address-line" v-if="item.address.line1">
                  {{ item.address.line1 }}
                </span>
                <span class="address-line" v-if="item.address.line2">
                  {{ item.address.line2 }}
                </span>
                <span class="address-line" v-if="item.address.line3">
                  {{ item.address.line3 }}
                </span>
                <span class="address-city" v-if="item.address.city">
                  {{ item.address.city }}
                </span>
                <span class="address-state" v-if="item.address.city">
                  {{ item.address.state }}
                </span>
                <span class="address-zip" v-if="item.address.city">
                  {{ item.address.zip }}
                </span>
              </p>
              <iframe
                v-if="mapAddress"
                width="100%"
                height="350"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                :src="mapAddress"
              ></iframe>
            </div>
          </div>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside class="aside__container--img">
        <img
          class="aside__image"
          src="../../assets/vote-now-black-man-red-flower-1515201899114-98ba64d41df7.jpeg"
          alt="Black man ready to vote"
        />
      </aside>
    </template>
  </MainContent>
</template>

<script>
import MainContent from '../../components/MainContent';
import axios from 'axios';

export default {
  name: 'voteNow',
  components: { MainContent },
  data() {
    return {
      addressLabel: 'Adress where you are registered to vote',
      addressValue: '',
      placeholder: '123 Main St GA 30076',
      buttonDisabled: true,
      voterData: {},
      message: ''
    };
  },
  created() {
    this.regData = this.$route.params.regData;
  },
  computed: {
    electionInfoUrl() {
      try {
        return this.voterData.state[0].electionAdministrationBody
          .electionInfoUrl;
      } catch (error) {
        return '';
      }
    },
    electionRegistrationUrl() {
      try {
        return this.voterData.state[0].electionAdministrationBody
          .electionRegistrationUrl;
      } catch (error) {
        return '';
      }
    },
    electionRegistrationConfirmationUrl() {
      try {
        return this.voterData.state[0].electionAdministrationBody
          .electionRegistrationConfirmationUrl;
      } catch (error) {
        return '';
      }
    },
    absenteeVotingInfoUrl() {
      try {
        return this.voterData.state[0].electionAdministrationBody
          .absenteeVotingInfoUrl;
      } catch (error) {
        return '';
      }
    },
    votingLocationFinderUrl() {
      try {
        return this.voterData.state[0].electionAdministrationBody
          .votingLocationFinderUrl;
      } catch (error) {
        return '';
      }
    },
    ballotInfoUrl() {
      try {
        return this.voterData.state[0].electionAdministrationBody.ballotInfoUrl;
      } catch (error) {
        return '';
      }
    },
    mapAddress() {
      try {
        var querystring = require('querystring');
        var address = this.voterData.pollingLocations[0].address.locationName;
        if (this.voterData.pollingLocations[0].address.line1)
          address =
            address + ' ' + this.voterData.pollingLocations[0].address.line1;
        if (this.voterData.pollingLocations[0].address.line2)
          address =
            address + ' ' + this.voterData.pollingLocations[0].address.line2;
        if (this.voterData.pollingLocations[0].address.line3)
          address =
            address + ' ' + this.voterData.pollingLocations[0].address.line3;
        if (this.voterData.pollingLocations[0].address.city)
          address =
            address + ' ' + this.voterData.pollingLocations[0].address.city;
        if (this.voterData.pollingLocations[0].address.state)
          address =
            address + ' ' + this.voterData.pollingLocations[0].address.state;
        var result = querystring.stringify({ q: address, output: 'embed' });
        return 'https://maps.google.com/maps?' + result;
      } catch (error) {
        return '';
      }
    }
  },
  methods: {
    navigate() {},
    showPollingLocation() {
      axios
        .post(process.env.VUE_APP_SERVICE_API_HOST + '/pollingplace', {
          data: {
            address: this.addressValue
          }
        })
        .then(response => {
          this.voterData = response.data;
        })
        .catch(error => {
          error;
          this.voterData = { error: true };
        });
    },
    updatedAddress() {
      this.buttonDisabled = this.addressValue.length < 10;
    }
  },
  mounted() {
    //this.showtool();
  }
};
</script>

<style lang="scss">
@import './votenow';
</style>
