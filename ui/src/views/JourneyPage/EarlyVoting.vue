<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside" :aria-label="$t('ariaEarly')">
        <div class="aside__container--text">
          <select-state />

          <h2 class="aside__header" style="margin-top: 2rem">
            {{ $t('voteTitle') }}
          </h2>

          <!-- this appears after user enter their address -->
          <div class="journey-info__section" v-if="voterData.state">
            <location-list :votingData="voterData" />
            <civic-data :voter-data="voterData" />
          </div>

          <div class="journey-info__collapsable" ref="generalInfo">
            <territory-info v-if="info.register.territory" />

            <!-- Early voting start -->
            <mark-down
              class="journey-info__deadline"
              :content="
                $t('voteEarlyStart', {
                  date: niceDate(info.early_voting.start_date),
                  days: daysLeft(info.early_voting.start_date),
                })
              "
            />
            <!-- Early voting end -->
            <mark-down
              class="journey-info__deadline"
              :content="
                $t('voteEarlyEnd', {
                  date: niceDate(info.early_voting.last_date),
                  days: daysLeft(info.early_voting.last_date),
                })
              "
            />

            <!-- info link -->
            <mark-down
              class="journey-info__more"
              v-if="info.early_voting.more_link"
              :content="`\u21b3 ` + $t('voteEarlyMore', { link: info.early_voting.more_link })"
            />

            <!-- Election day voting -->
            <mark-down
              class="journey-info__deadline"
              :content="
                $t('voteElectionDay', {
                  date: niceIsoDate(info.election_start || '2022-11-08T12:00:00.000Z'),
                  days: daysLeftIso(info.election_start || '2022-11-08T12:00:00.000Z'),
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
                @click="showPollingLocation"
                :disabled="buttonDisabled"
              >
                {{ $t('votePollingLocationBtn') }}
              </cv-button>
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
import CivicData from '@/views/JourneyPage/CivicData';
import { DateTime } from 'luxon';
import readableId from '@/api/base58id';

/**
 * Help for IDE
 * @property {?Object} early_voting
 * @property {?string} start_date
 * @property {?string} last_date
 * @property {?string} more_link
 * @property {?string} election_start
 * @property {?boolean} id_needed
 * @property {?boolean} available
 * @property {?string} line1
 * @property {?string} line2
 * @property {?string} line3
 * @property {?string} electionDay
 * @property {?string} ocdDivisionId
 * @property {?string} pollingHours
 */

export default {
  name: 'VoteNow',
  components: {
    CivicData,
    LocationList,
    MarkDown,
    MainContent,
    GoogleMap,
    SelectState,
    TerritoryInfo,
  },
  data() {
    return {
      addressValue: '',
      normalizedAddressValue: '',
      placeholder: '123 Main St GA 30076',
      electionName: '',
      voterData: {},
      elections: [],
      electionId: '',
      loading: false,
      infoHeight: '',
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

    locationList() {
      try {
        const electionDate = DateTime.fromISO(
          this.info.election_start || '2022-11-08T12:00:00.000Z'
        );
        const preferEarly = Date.now() < electionDate.toMillis();

        let locations = [];
        if (preferEarly && 'earlyVoteSites' in this.voterData)
          locations = this.voterData.earlyVoteSites;
        else if ('pollingLocations' in this.voterData) locations = this.voterData.pollingLocations;
        else if ('dropOffLocations' in this.voterData) locations = this.voterData.dropOffLocations;

        return locations.filter((item) => {
          return !item.address.electionName || item.address.electionName === this.electionName;
        });
      } catch (error) {
        //console.error(error);
        return null;
      }
    },
    mapMarkers() {
      const list = [];
      try {
        let index = 0;
        const locations = this.locationList;

        while (index < locations.length) {
          const item = locations[index];
          let dir_address = '';

          if (!item.latitude || !item.longitude) {
            if (item.address.line1) dir_address += item.address.line1;
            if (item.address.line2) dir_address += ' ' + item.address.line2;
            if (item.address.line3) dir_address += ' ' + item.address.line3;
            if (item.address.city) dir_address += ' ' + item.address.city;
            if (item.address.state) dir_address += ' ' + item.address.state;
          }

          let id;
          if (item.latitude && item.longitude) id = `${item.latitude}/${item.longitude}`;
          else id = readableId(6);

          list.push({
            id: id,
            position: { lat: item.latitude, lng: item.longitude, address: dir_address },
            info: this.locationInfo(item),
            title: item.address.locationName || 'Polling Place',
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
      return this.elections.filter((item) => item.id !== '2000');
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
              const elections = this.voterData.fivefifthsdata.elections;
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

    /**
     * Create a Google link to directions
     */
    directionsLink(item) {
      let dir_address = '';
      if (item.address.line1) dir_address += item.address.line1;
      if (item.address.line2) dir_address += ' ' + item.address.line2;
      if (item.address.line3) dir_address += ' ' + item.address.line3;
      if (item.address.city) dir_address += ' ' + item.address.city;
      if (item.address.state) dir_address += ' ' + item.address.state;
      const escapedValue = encodeURIComponent(dir_address).replaceAll('%20', '+');
      return 'https://www.google.com/maps/search/?api=1&query=' + escapedValue;
    },

    /**
     * This is used by the map to construct an info window for each marker. Styling is mostly
     * controlled by the map api but simple things should work ok.
     */
    locationInfo(item) {
      let info = '<div><b>' + (item.address.locationName || 'Polling Place') + '</b></div>';
      if (item.pollingHours) info += '<div><b>' + item.pollingHours + '</b></div>';
      if (item.address.line1) info += '<div>' + item.address.line1 + '</div>';
      if (item.address.line2) info += '<div>' + item.address.line2 + '</div>';
      if (item.address.line3) info += '<div>' + item.address.line3 + '</div>';
      if (item.address.city) info += '<span>' + item.address.city + '</span>';
      if (item.address.state) info += '<span> ' + item.address.state + '</span>';

      const dir_link = this.directionsLink(item);

      info += '<div><a target="_blank" href="' + dir_link + '">Directions</a></div>';
      return info;
    },
  },
};
</script>

<style lang="scss">
@import './register';
@import './earlyvoting';
</style>
