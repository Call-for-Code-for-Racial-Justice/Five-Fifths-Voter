<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside">
        <div class="aside__container--text">
          <h2 class="aside__header">Find your local ballot dropbox</h2>
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
                kind="primary"
                @click="showPollingLocation"
                :disabled="buttonDisabled"
              >
                Show Ballot Drop Off Locations
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
                >No known drop off locations. Check with your local election
                officials.
              </span>
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
        <GoogleMap class="map__container" :markers="mapMarkers" />
      </aside>
    </template>
  </MainContent>
</template>

<script>
//todo: The zip lookup and the templates parts that use it should be its own component.
// This componet should be able to just include, for example, <ZipToData service='/ballotreturn/locations'/>

import axios from 'axios';
import MainContent from '../../components/MainContent';
import GoogleMap from '../../components/Maps/GoogleMap';

export default {
  name: 'ballotreturn',
  components: { MainContent, GoogleMap },
  data() {
    return {
      addressLabel: 'Adress where you are registered to vote',
      addressValue: '',
      placeholder: '123 Main St GA 30076',
      buttonDisabled: true,
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
        while (index < this.voterData.dropOffLocations.length) {
          var item = this.voterData.dropOffLocations[index];
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
    updatedAddress() {
      this.buttonDisabled = this.addressValue.length < 10;
    }
  }
};
</script>
<style lang="scss">
@import './ballotreturn';
</style>
