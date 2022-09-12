<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside" :aria-label="$t('ariaEarly')">
        <div class="aside__container--text">
          <select-state />

          <h2 class="aside__header" style="margin-top: 2rem">
            {{ $t('voteTitle') }}
          </h2>

          <territory-info v-if="info.register.territory" />

          <!-- Early voting start -->
          <mark-down
            class="journey-info__deadline"
            :content="
              $t('voteEarlyStart', {
                medDate: niceDate(info.early_voting.start_date),
                relativeDays: daysLeft(info.early_voting.start_date),
              })
            "
          />
          <!-- Early voting end -->
          <mark-down
            class="journey-info__deadline"
            :content="
              $t('voteEarlyEnd', {
                medDate: niceDate(info.early_voting.last_date),
                relativeDays: daysLeft(info.early_voting.last_date),
              })
            "
          />

          <!-- info link -->
          <div class="register-info" v-if="info.early_voting.more_link">
            <mark-down :content="$t('voteEarlyMore', { link: info.early_voting.more_link })" />
          </div>

          <!-- Election day voting -->
          <mark-down
            class="journey-info__deadline"
            :content="
              $t('voteElectionDay', {
                medDate: niceIsoDate(info.election_start || '2022-11-08T12:00:00.000Z'),
                relativeDays: daysLeftIso(info.election_start || '2022-11-08T12:00:00.000Z'),
              })
            "
          />
          <span class="register-faq" v-if="'election_day_info' in info">{{
            `\u21b3 ` + info.election_day_info
          }}</span>

          <div class="register-faq-header">{{ $t('faq') }}</div>
          <!-- Vote early -->
          <div class="register-faq" v-if="'available' in info.early_voting">
            <span>{{ $t('voteEarlyAvailable') }}</span
            ><span>{{ info.early_voting.available ? $t('yes') : $t('no') }}</span>
          </div>

          <!-- ID needed -->
          <div class="register-faq" v-if="'id_needed' in info.mail_in">
            <span>{{ $t('voteEarlyIdNeeded') }}</span>
            <span>{{ info.early_voting.id_needed ? $t('yes') : $t('no') }}</span>
          </div>

          <div class="wrapper wrapper--address">
            <cv-select :label="$t('voteSelectElection')" v-model="electionId">
              <cv-select-option value="" :selected="true" :disabled="true" :hidden="true">{{
                $t('voteChooseElection')
              }}</cv-select-option>
              <cv-select-option v-for="elec in filteredElections" :value="elec.id" :key="elec.id">
                {{ elec.name }} {{ elec.electionDay }}
              </cv-select-option>
            </cv-select>
            <cv-text-input
              :label="$t('voteAddressLabel')"
              v-model="addressValue"
              :placeholder="placeholder"
              :disabled="disabledAddress"
            >
            </cv-text-input>
            <div class="wrapper wrapper--button">
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
                <cv-select-option selected>Choose an election</cv-select-option>
                <cv-select-option
                  v-for="(item, index) in electionList"
                  :key="index"
                  :selected="index == 0 ? 'selected' : ''"
                  >{{ item }}</cv-select-option
                >
              </cv-select>
              <location-list v-if="voterData.state" :votingData="voterData" />

              <span><br />Powered by the Civic Information API</span>
            </div>
          </div>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside
        v-if="placeholderMap"
        class="aside__container--img"
        :aria-label="$t('ariaSupportingImage')"
      >
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
import SelectState from './SelectState';
import TerritoryInfo from './TerritoryInfo';
import { mapState } from 'vuex';
import electionInfo from '@/data/usa-2022-midterms-info.json';
import dateFormatter from '@/api/dateFormatter';
import MarkDown from '@/components/MarkDown/MarkDown';
import LocationList from '@/views/JourneyPage/LocationList';

export default {
  name: 'VoteNow',
  components: { LocationList, MarkDown, MainContent, GoogleMap, SelectState, TerritoryInfo },
  data() {
    return {
      addressValue: '301 County Rd 195 Dover, Delaware',
      good: '836 Lincoln St Dover, Delaware',
      normalizedAddressValue: '',
      placeholder: '123 Main St GA 30076',
      early: false,
      electionName: '',
      voterData: {},
      elections: [],
      electionId: '',
      loading: false,
    };
  },
  created() {
    this.loading = true;
    axios
      .get('/services/elections')
      .then((response) => {
        this.elections = response.data.elections;
      })
      .catch((error) => {
        /* eslint no-console: 0 */
        console.error(error);
      })
      .finally(() => {
        this.loading = false;
      });
    this.actionUsaState();
    this.addressValue = this.votingAddress;
  },
  watch: {
    usaCode() {
      this.actionUsaState();
    },
    elections() {
      this.actionUsaState();
    },
    votingAddress() {
      this.addressValue = this.votingAddress;
    },
  },
  computed: {
    ...mapState({
      usaState: (state) => state.user.info?.location?.region,
      usaCode: (state) => state.user.info?.location?.region_code,
      votingAddress: (state) => state.user.info?.voting_address,
    }),
    info() {
      const code = this.usaCode?.toLowerCase() || 'unknown';
      return electionInfo[code] || { register: { territory: true } };
    },
    buttonDisabled() {
      return this.electionId === '' || this.addressValue < 10;
    },

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

        var filteredLocation = locations.filter(function (item) {
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
            title: item.address.locationName,
          });
          index++;
        }
        return list;
      } catch (error) {
        console.error(error);
        return list;
      }
    },
    filteredElections() {
      return this.elections.filter((item) => item.id != '2000');
    },
    disabledAddress() {
      return !this.electionId;
    },
  },
  methods: {
    daysLeft: (dateStr) => dateFormatter.daysLeft(dateStr),
    daysLeftIso: (dateStr) => dateFormatter.daysLeftIso(dateStr),
    niceDate: (dateStr) => dateFormatter.niceDate(dateStr),
    niceIsoDate: (dateStr) => dateFormatter.niceIsoDate(dateStr),

    actionUsaState() {
      const found = this.elections.find((election) =>
        election.ocdDivisionId?.endsWith(`state:${this.usaCode}`)
      );
      if (found) this.electionId = found.id;
      else this.electionId = '';
    },

    showPollingLocation() {
      this.loading = true;
      axios
        .post('/services/pollingplace', {
          data: {
            address: this.addressValue,
            electionId: this.electionId,
          },
        })
        .then((response) => {
          try {
            /**
             * @typedef VoterData
             * @property {object} VoterData.normalizedInput
             */
            this.voterData = response.data;

            // Get a normalized address from the result
            /*
             *   "normalizedInput": {
             *     "line1": "123 Main Street",
             *     "city": "Any Town",
             *     "state": "GA",
             *     "zip": "30000"
             *   },
             */
            const addressParts = Object.values(this.voterData?.normalizedInput);
            if (addressParts?.length > 0) this.normalizedAddressValue = '';
            else this.normalizedAddressValue = this.addressValue;

            addressParts.forEach((element) => {
              this.normalizedAddressValue = this.normalizedAddressValue + ' ' + element;
            });
            this.normalizedAddressValue = this.normalizedAddressValue.trim();
            this.$store.commit('setVotingAddress', this.normalizedAddressValue);

            if (this.voterData.fivefifthsdata && this.voterData.fivefifthsdata.elections) {
              var elections = this.voterData.fivefifthsdata.elections;
              this.electionName = elections[elections.length - 1];
            }
          } catch (error) {
            console.error(error);
          }
        })
        .catch((error) => {
          /* eslint no-console: 0 */
          console.error(error);
          this.voterData = { error: true };
        })
        .finally(() => {
          this.loading = false;
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
    },
  },
};
</script>

<style lang="scss">
@import '@/components/Register/register';
@import './earlyvoting';
</style>
