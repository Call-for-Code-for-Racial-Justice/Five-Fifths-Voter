<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside" :aria-label="$t('ariaInformed')">
        <div class="aside__container--text">
          <select-state />

          <h2 class="aside__header">{{ $t('getInformedTitle') }}</h2>

          <territory-info v-if="info.territory" />

          <div class="register-info" v-if="info.core_races.length">
            <span>{{ $t('getInformedTopContests') }}</span>
            <mark-down v-if="info.sample_ballot" :content="info.sample_ballot" />
          </div>
          <cv-accordion class="candidate__accordion">
            <cv-accordion-item v-for="c in info.core_races" :key="c.id" :open="open === c.id">
              <template v-slot:title>{{ c.office }} </template>
              <template v-slot:content v-if="c.districts">
                <find-cong v-if="c.find_cong_district" :district="c.find_cong_district" />
                <div
                  class="candidate"
                  v-for="district in c.districts"
                  :key="`${c.id}-${district.name}`"
                >
                  <cv-link :href="district.link" target="_blank">{{ district.name }}</cv-link>
                </div>
              </template>
              <template v-slot:content v-else-if="!c.candidates || c.candidates.length === 0">
                <cv-link :href="`https://www.vote411.org/${usaState}`" target="_blank">{{
                  $t('getInformedMoreInfo')
                }}</cv-link>
              </template>
              <template v-slot:content v-else>
                <div class="candidate" v-for="candidate in c.candidates" :key="candidate.id">
                  <cv-link :inline="true" :href="candidate.candidateUrl" target="_blank">{{
                    candidate.name
                  }}</cv-link>
                  <span
                    >{{ candidate.party }}
                    <republican
                      v-if="candidate.party === 'Republican'"
                      style="width: 20px; height: 20px"
                      aria-hidden="true"
                      focus="false"
                    />
                    <democrat
                      v-if="candidate.party === 'Democrat'"
                      style="width: 20px; height: 20px"
                      aria-hidden="true"
                      focus="false"
                    />
                    <libertarian
                      v-if="candidate.party === 'Libertarian'"
                      style="width: 20px; height: 20px"
                      aria-hidden="true"
                      focus="false"
                    />
                  </span>
                  <cv-link
                    v-for="channel in candidate.channels"
                    :key="`${candidate.id}-${channel.type}`"
                    :href="channel.id"
                    target="_blank"
                  >
                    <facebook v-if="channel.type === 'Facebook'" aria-hidden="true" focus="false" />
                    <twitter
                      v-else-if="channel.type === 'Twitter'"
                      aria-hidden="true"
                      focus="false"
                    />
                    <youtube
                      v-else-if="channel.type === 'YouTube'"
                      aria-hidden="true"
                      focus="false"
                    />
                    <instagram
                      v-else-if="channel.type === 'Instagram'"
                      aria-hidden="true"
                      focus="false"
                    />
                    <linkedin
                      v-else-if="channel.type === 'LinkedIn'"
                      aria-hidden="true"
                      focus="false"
                    />
                    <span v-else>{{ channel.type }}</span>
                  </cv-link>
                </div>
              </template>
            </cv-accordion-item>
          </cv-accordion>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside class="aside__container--img" :aria-label="$t('ariaSupportingImage')">
        <img
          class="aside__image"
          src="../../assets/vote-now-black-man-red-flower-1515201899114-98ba64d41df7.jpeg"
          alt="Man looking stoically away from the camera"
        />
      </aside>
    </template>
  </MainContent>
</template>

<script>
import SelectState from '@/views/JourneyPage/SelectState';
import { MarkDown } from '@/components/MarkDown';
import MainContent from '../../components/MainContent';
import { mapState } from 'vuex';

//TODO move these somewhere else
/**
 * @typedef {Object} candidateInfo
 * @property {!string} name
 * @property {!string} party
 * @property {!string} candidateUrl
 * @property {Array} channels
 */

/**
 * @typedef {Object} contestInfo
 * @property {!string} office
 * @property {!string} id
 * @property {?Object} find_cong_district
 * @property {Array<candidateInfo>} candidates
 */

/**
 * @typedef {Object} regionInfo
 * @property {?boolean} territory
 * @property {?string }region
 * @property {?string} sample_ballot
 * @property {Array} districts
 * @property {Array<contestInfo>} core_races
 */

/**
 * @typedef {Object<string,regionInfo>} electionInfo
 */
import electionInfo from '@/data/usa-2022-midterms-info.json';
import Republican from '@/assets/icons/Republican';
import Democrat from '@/assets/icons/Democrat';
import Libertarian from '@/assets/icons/Libertarian';
import TerritoryInfo from '@/views/JourneyPage/TerritoryInfo';

import {
  LogoFacebook32,
  LogoTwitter32,
  LogoYoutube32,
  LogoInstagram32,
  LogoLinkedin32,
} from '@carbon/icons-vue';
import FindCong from '@/components/GetInformed/FindCong';

export default {
  name: 'GetInformed',
  components: {
    FindCong,
    MainContent,
    SelectState,
    MarkDown,
    TerritoryInfo,
    Facebook: LogoFacebook32,
    Twitter: LogoTwitter32,
    Youtube: LogoYoutube32,
    Instagram: LogoInstagram32,
    Linkedin: LogoLinkedin32,
    Republican,
    Democrat,
    Libertarian,
  },
  data() {
    return {
      open: '',
    };
  },
  computed: {
    ...mapState({
      usaState: (state) => state.user.info?.location?.region,
      usaCode: (state) => state.user.info?.location?.region_code,
      registered: (state) => Boolean(state.user.info?.registered === 'midterm-2022'),
    }),
    /**
     * Info for a given region ("al", "ga", etc...)
     * @returns {regionInfo}
     */
    info() {
      const code = this.usaCode?.toLowerCase() || 'unknown';
      return (
        electionInfo[code] || {
          territory: true,
          core_races: [],
        }
      );
    },
  },
  mounted() {},
  created() {},
  methods: {},
  updated() {},
};
</script>

<style lang="scss">
@import 'get-informed';
</style>
