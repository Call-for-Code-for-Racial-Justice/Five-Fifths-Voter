<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside" :aria-label="$t('ariaWhere')">
        <div class="aside__container--text">
          <select-state />

          <h2 class="aside__header">{{ $t('ballotTitle') }}</h2>

          <!-- Return deadline -->
          <div
            class="register-info-deadline"
            style="margin-top: 1rem"
            v-if="info.mail_in.return_deadline"
          >
            {{ $t('absenteeReturn') }}
            <span>{{ niceDate(info.mail_in.return_deadline) }}, </span>
            <span class="days-left">{{ daysLeft(info.mail_in.return_deadline) }}. </span>
          </div>

          <!-- drop-off -->
          <div class="register-faq" v-if="'dropoff' in info.mail_in">
            <span>{{ $t('absenteeDropFaq') }}</span
            ><span>{{ info.mail_in.dropoff ? $t('yes') : $t('no') }}</span>
            <div>
              <mark-down
                style="display: inline-block"
                v-if="info.mail_in.dropoff_explainer"
                :content="`\u21b3 ` + info.mail_in.dropoff_explainer"
              />
            </div>
          </div>

          <!-- State link -->
          <div v-if="info.mail_in.track_link" class="register-info">
            <mark-down :content="$t('absenteeTrack', { trackUrl: info.mail_in.track_link })" />
          </div>

          <!-- State link -->
          <div v-if="info.mail_in.more_link" class="register-info">
            <mark-down :content="$t('absenteeMoreInfo', { moreUlrl: info.mail_in.more_link })" />
          </div>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside class="aside__container--img" :aria-label="$t('ariaSupportingImage')">
        <img class="aside__image" src="../../assets/ballot-return-image-1.jpg" alt="Sideimage" />
      </aside>
    </template>
  </MainContent>
</template>

<script>
import axios from 'axios';
import MainContent from '../../components/MainContent';
import SelectState from '@/views/JourneyPage/SelectState';
import MarkDown from '@/components/MarkDown/MarkDown';
import electionInfo from '@/data/usa-2022-midterms-info.json';
import { mapState } from 'vuex';
import dateFormatter from '@/api/dateFormatter';

export default {
  name: 'BallotReturn',
  components: { MainContent, SelectState, MarkDown },
  data() {
    return {
      addressValue: '',
      placeholder: '123 Main St GA 30076',
      buttonDisabled: true,
      voterData: {},
    };
  },
  created() {},
  computed: {
    ...mapState({
      usaState: (state) => state.user.info?.location?.region,
      usaCode: (state) => state.user.info?.location?.region_code,
      requested: (state) => Boolean(state.user.info?.requested_early === 'midterm-2022'),
    }),
    info() {
      const code = this.usaCode?.toLowerCase() || 'unknown';
      return electionInfo[code] || { mail_in: { territory: true } };
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
    mapMarkers() {
      var list = [];
      try {
        var index = 0;
        while (index < this.voterData.dropOffLocations.length) {
          var item = this.voterData.dropOffLocations[index];
          list.push({
            id: item.address.locationName,
            position: { lat: item.latitude, lng: item.longitude },
            info: this.locationInfo(item),
            title: item.address.locationName,
          });
          index++;
        }
        return list;
      } catch (error) {
        return list;
      }
    },

    /**
     * To turn off the list of location just return null from this function. Or maybe show the first N
     * locations.
     */
    locationList() {
      try {
        var locations = this.voterData.dropOffLocations;
        return locations;
      } catch (error) {
        return null;
      }
    },
  },
  mounted() {},
  methods: {
    daysLeft: (dateStr) => dateFormatter.daysLeft(dateStr),
    niceDate: (dateStr) => dateFormatter.niceDate(dateStr),

    showPollingLocation() {
      if (this.$refs.dropoffMap) this.$refs.dropoffMap.clearMarkers();
      axios
        .post('/services/pollingplace', {
          data: {
            address: this.addressValue,
          },
        })
        .then((response) => {
          this.voterData = response.data;
        })
        .catch((error) => {
          error;
          this.voterData = { error: true };
        });
    },
    updatedAddress() {
      this.buttonDisabled = this.addressValue.length < 10;
    },

    /**
     * This is used by the map to contruct an info window for each marker. Styling is mostly
     * controlled by the map api but simple things should work ok.
     */
    locationInfo(item) {
      var info = '<div><b>' + item.address.locationName + '</b></div>';
      if (item.notes) info += '<div>' + item.notes + '</div>';
      if (item.address.line1) info += '<div>' + item.address.line1 + '</div>';
      if (item.address.line2) info += '<div>' + item.address.line2 + '</div>';
      if (item.address.line3) info += '<div>' + item.address.line3 + '</div>';
      if (item.address.city) info += '<span>' + item.address.city + '</span>';
      if (item.address.state) info += '<span> ' + item.address.state + '</span>';
      return info;
    },
  },
};
</script>
<style lang="scss">
@import './ballotreturn';
</style>
