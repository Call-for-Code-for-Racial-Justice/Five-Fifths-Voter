<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside">
        <div class="aside__container--text">
          <h2 class="aside__header">
            Vote early or find your polling location.
          </h2>
          <p class="aside__description">
            Need help knowing where to go on voting day? Want to know what
            location in your precinct allows for early voting? We can help you
            figure it out. Input your address below, and select either "Vote
            Now" or "Vote Early". We'll do the rest.
          </p>
          <div class="wrapper wrapper--address">
            <cv-text-input
              :label="addressLabel"
              v-model="addressValue"
              :placeholder="placeholder"
              @input="updatedAddress"
            >
            </cv-text-input>
            <div class="wrapper wrapper--button">
              <cv-button
                class="button--early-voting"
                kind="secondary"
                @click="showEarlyPollingLocation"
                :disabled="buttonDisabled"
              >
                Early Voting
              </cv-button>
              <cv-button
                class="button--early-voting"
                kind="primary"
                @click="showNowPollingLocation"
                :disabled="buttonDisabled"
              >
                Polling Location
              </cv-button>
            </div>
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
              <span v-if="absenteeVotingInfoUrl">
                <cv-link :href="absenteeVotingInfoUrl">
                  Get Absentee Ballot</cv-link
                ><br />
              </span>
              <span v-if="placeholderMap"
                >No known locations. Check with your local election officials.
              </span>
              <cv-list v-if="locationList">
                <cv-list-item
                  v-for="item in locationList"
                  :key="item.address.locationName"
                >
                  <span class="loc-name">{{ item.address.locationName }}</span>
                  <span v-if="!early && item.pollingHours" class="loc-name">{{
                    item.pollingHours
                  }}</span>

                  <span v-if="item.address.line1" class="loc-line">{{
                    item.address.line1
                  }}</span>
                  <span v-if="item.address.line2" class="loc-line">{{
                    item.address.line2
                  }}</span>
                  <span v-if="item.address.line3" class="loc-line">{{
                    item.address.line3
                  }}</span>
                  <span v-if="item.address.city" class="loc-city">{{
                    item.address.city
                  }}</span>
                  <span v-if="item.address.state" class="loc-state">{{
                    item.address.state
                  }}</span>
                </cv-list-item>
              </cv-list>

              <span><br />Powered by the Civic Information API</span>
            </div>
          </div>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside v-if="placeholderMap" class="aside__container--img">
        <img
          class="aside__image"
          src="../../assets/holder-atlanta-map.png"
          alt="google map img"
        />
      </aside>
      <aside v-else>
        <GoogleMap
          v-if="!placeholderMap"
          class="side-map"
          :markers="mapMarkers"
        />
      </aside>
    </template>
  </MainContent>
</template>

<script>
import axios from 'axios';
import MainContent from '../../components/MainContent';
import GoogleMap from '../../components/Maps/GoogleMap';

export default {
  name: 'earlyvoting',
  components: { MainContent, GoogleMap },
  data() {
    return {
      addressLabel: 'Adress where you are registered to vote',
      addressValue: '',
      placeholder: '123 Main St GA 30076',
      buttonDisabled: true,
      early: false,
      voterData: {}
    };
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
    placeholderMap() {
      return this.mapMarkers.length === 0;
    },
    mapMarkers() {
      var list = [];
      try {
        var index = 0;
        var locations = [];
        if (this.early) locations = this.voterData.earlyVoteSites;
        else locations = this.voterData.pollingLocations;
        while (index < locations.length) {
          var item = locations[index];
          list.push({
            id: item.address.locationName,
            position: { lat: item.latitude, lng: item.longitude }
          });
          index++;
        }
        return list;
      } catch (error) {
        return list;
      }
    },
    locationList() {
      try {
        var locations = [];
        if (this.early) locations = this.voterData.earlyVoteSites;
        else locations = this.voterData.pollingLocations;

        return locations;
      } catch (error) {
        return null;
      }
    }
  },
  mounted() {},
  methods: {
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
    showEarlyPollingLocation() {
      this.early = true;
      this.showPollingLocation();
    },
    showNowPollingLocation() {
      this.early = false;
      this.showPollingLocation();
    },
    updatedAddress() {
      this.buttonDisabled = this.addressValue.length < 10;
    }
  }
};
</script>

<style lang="scss">
@import './earlyvoting';
</style>
