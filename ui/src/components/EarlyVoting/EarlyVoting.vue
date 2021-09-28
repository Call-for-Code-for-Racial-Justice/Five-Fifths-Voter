<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside" aria-label="early voting information">
        <div class="aside__container--text">
          <h2 class="aside__header">
            {{ $t('voteTitle') }}
          </h2>
          <p class="aside__description">
            {{ $t('voteTitleDesc', ['Five Fifths Voter']) }}
          </p>
          <br />
          <p class="aside__description">
            {{ $t('voteElectionMissing') }}
          </p>
          <div class="wrapper wrapper--address">
            <cv-select :label="$t('voteSelectElection')" v-model="electionId">
              <cv-select-option disabled selected hidden>{{
                $t('voteChooseElection')
              }}</cv-select-option>
              <cv-select-option v-for="elec in fileredElections" :value="elec.id" :key="elec.id">
                {{ elec.name }} {{ elec.electionDay }}
              </cv-select-option>
            </cv-select>
            <cv-text-input
              :label="$t('voteAddressLabel')"
              v-model="addressValue"
              :placeholder="placeholder"
              @input="updatedAddress"
              :disabled="disabledAddress"
            >
            </cv-text-input>
            <div class="wrapper wrapper--button">
              <cv-button
                class="button--early-voting"
                kind="secondary"
                @click="showEarlyPollingLocation"
                :disabled="buttonDisabled"
              >
                {{ $t('voteEarlyVotingBtn') }}
              </cv-button>
              <cv-button
                class="button--early-voting"
                kind="primary"
                @click="showNowPollingLocation"
                :disabled="buttonDisabled"
              >
                {{ $t('votePollingLocationBtn') }}
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
                <cv-link :href="absenteeVotingInfoUrl"> Get Absentee Ballot</cv-link><br />
              </span>
              <span v-if="!locationAvailable"> {{ $t('voteEarlyNoLocationFound') }} </span>
              <cv-select v-if="electionList.length" label="Select Your Election">
                <cv-select-option disabled selected hidden>Choose an election</cv-select-option>
                <cv-select-option
                  v-for="(item, index) in electionList"
                  :key="index"
                  :selected="index == 0 ? 'selected' : ''"
                  >{{ item }}</cv-select-option
                >
              </cv-select>
              <cv-list v-if="locationList">
                <cv-list-item v-for="(item, index) in locationList" :key="index">
                  <span class="loc-name">{{ item.address.locationName }}</span>
                  <span v-if="!early && item.pollingHours" class="loc-name">{{
                    item.pollingHours
                  }}</span>

                  <span v-if="item.address.line1" class="loc-line">{{ item.address.line1 }}</span>
                  <span v-if="item.address.line2" class="loc-line">{{ item.address.line2 }}</span>
                  <span v-if="item.address.line3" class="loc-line">{{ item.address.line3 }}</span>
                  <span v-if="item.address.city" class="loc-city">{{ item.address.city }}</span>
                  <span v-if="item.address.state" class="loc-state"> {{ item.address.state }}</span>
                  <cv-link :href="directionsLink(item)" target="_blank">
                    Directions
                  </cv-link>
                </cv-list-item>
              </cv-list>

              <span><br />Powered by the Civic Information API</span>
            </div>
          </div>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside v-if="placeholderMap" class="aside__container--img" aria-label="early voting image">
        <img class="aside__image" src="../../assets/holder-atlanta-map.png" alt="google map img" />
      </aside>
      <aside v-else>
        <GoogleMap
          class="side-map"
          :markers="mapMarkers"
          :home="normalizedAddressValue"
          :key="normalizedAddressValue"
          ref="earlyMap"
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
      addressValue: '',
      normalizedAddressValue: '',
      placeholder: '123 Main St GA 30076',
      buttonDisabled: true,
      early: false,
      electionName: '',
      voterData: {},
      elections: [],
      electionId: ''
    };
  },
  created() {
    try {
      this.$amplitude
        .getInstance()
        .logEvent('Page Visit', { page: 'Journey Page', component: 'Early Voting' });
    } catch (e) {
      /* eslint no-console: 0 */
      console.error(e);
    }

    axios
      .get('/services/elections')
      .then(response => {
        this.elections = response.data.elections;
      })
      .catch(error => {
        /* eslint no-console: 0 */
        console.error(error);
      });
  },

  computed: {
    electionInfoUrl() {
      try {
        return this.voterData.state[0].electionAdministrationBody.electionInfoUrl;
      } catch (error) {
        return '';
      }
    },
    electionRegistrationUrl() {
      try {
        return this.voterData.state[0].electionAdministrationBody.electionRegistrationUrl;
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
        return this.voterData.state[0].electionAdministrationBody.absenteeVotingInfoUrl;
      } catch (error) {
        return '';
      }
    },
    votingLocationFinderUrl() {
      try {
        return this.voterData.state[0].electionAdministrationBody.votingLocationFinderUrl;
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
    electionList() {
      try {
        if (!this.voterData.fivefifthsdata || !this.voterData.fivefifthsdata.elections) return [];

        var elections = this.voterData.fivefifthsdata.elections;

        if (elections.length > 1) return elections;
        else return [];
      } catch (error) {
        return [];
      }
    },
    locationAvailable() {
      var locations;
      if (this.early) locations = this.voterData.earlyVoteSites;
      else locations = this.voterData.pollingLocations;

      var good = locations && locations.length > 0;
      return good;
    },
    locationList() {
      try {
        var locations = [];
        if (this.early) locations = this.voterData.earlyVoteSites;
        else locations = this.voterData.pollingLocations;
        if (!locations) locations = [];

        var filteredLocation = locations.filter(function(item) {
          return !item.address.electionName || item.address.electionName === this.electionName;
        }, this);

        return filteredLocation;
      } catch (error) {
        //console.error(error);
        return null;
      }
    },
    mapMarkers() {
      var list = [];
      try {
        var index = 0;
        var locations = this.locationList;

        while (index < locations.length) {
          var item = locations[index];
          if (!item.latitude || !item.longitude) {
            var dir_address = '';
            if (item.address.line1) dir_address += item.address.line1;
            if (item.address.line2) dir_address += ' ' + item.address.line2;
            if (item.address.line3) dir_address += ' ' + item.address.line3;
            if (item.address.city) dir_address += ' ' + item.address.city;
            if (item.address.state) dir_address += ' ' + item.address.state;
          }

          list.push({
            id: item.address.locationName + index,
            position: { lat: item.latitude, lng: item.longitude, address: dir_address },
            info: this.locationInfo(item),
            title: item.address.locationName
          });
          index++;
        }
        return list;
      } catch (error) {
        console.error(error);
        return list;
      }
    },
    fileredElections() {
      return this.elections.filter(item => item.id != '2000');
    },
    disabledAddress() {
      return !this.electionId;
    }
  },
  mounted() {},
  methods: {
    showPollingLocation() {
      axios
        .post('/services/pollingplace', {
          data: {
            address: this.addressValue,
            electionId: this.electionId
          }
        })
        .then(response => {
          try {
            this.voterData = response.data;
            this.normalizedAddressValue = '';
            Object.values(this.voterData.normalizedInput).forEach(element => {
              this.normalizedAddressValue = this.normalizedAddressValue + ' ' + element;
            });
            this.normalizedAddressValue = this.normalizedAddressValue.trim();

            if (this.voterData.fivefifthsdata && this.voterData.fivefifthsdata.elections) {
              var elections = this.voterData.fivefifthsdata.elections;
              this.electionName = elections[elections.length - 1];
            }
          } catch (error) {
            console.error(error);
          }
        })
        .catch(error => {
          error;
          /* eslint no-console: 0 */
          console.error(error);
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
    },

    /**
     * Create a google link to directions
     */
    directionsLink(item) {
      var dir_address = '';
      if (item.address.line1) dir_address += item.address.line1;
      if (item.address.line2) dir_address += ' ' + item.address.line2;
      if (item.address.line3) dir_address += ' ' + item.address.line3;
      if (item.address.city) dir_address += ' ' + item.address.city;
      if (item.address.state) dir_address += ' ' + item.address.state;
      const escapedValue = encodeURIComponent(dir_address).replaceAll('%20', '+');
      var dir_link = 'https://www.google.com/maps/search/?api=1&query=' + escapedValue;
      return dir_link;
    },

    /**
     * This is used by the map to contruct an info window for each marker. Styling is mostly
     * controlled by the map api but simple things should work ok.
     */
    locationInfo(item) {
      var info = '<div><b>' + item.address.locationName + '</b></div>';
      if (!this.early && item.pollingHours) info += '<div><b>' + item.pollingHours + '</b></div>';
      if (item.address.line1) info += '<div>' + item.address.line1 + '</div>';
      if (item.address.line2) info += '<div>' + item.address.line2 + '</div>';
      if (item.address.line3) info += '<div>' + item.address.line3 + '</div>';
      if (item.address.city) info += '<span>' + item.address.city + '</span>';
      if (item.address.state) info += '<span> ' + item.address.state + '</span>';

      var dir_link = this.directionsLink(item);

      info +=
        '<div><a target="_blank" alt="directions" href="' + dir_link + '">Directions</a></div>';
      return info;
    }
  }
};
</script>

<style lang="scss">
@import './earlyvoting';
</style>
