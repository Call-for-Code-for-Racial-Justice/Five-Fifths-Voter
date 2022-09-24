<template>
  <MainContent>
    <template v-slot:content>
      <aside class="aside" :aria-label="$t('ariaRegister')">
        <div class="aside__container--text">
          <select-state />
          <cv-checkbox
            style="display: inline-block"
            :label="$t('registerAlready')"
            value="checked-registered"
            :checked="registered"
            @change="onRegistered"
          >
          </cv-checkbox>
          <!-- Check your registration -->
          <span class="register-info">
            <cv-link :inline="true" :href="checkRegLink" target="_blank">{{
              $t('checkHere')
            }}</cv-link>
          </span>

          <h2 class="aside__header" style="margin-top: 2rem">{{ $t('registerTitle') }}</h2>

          <p class="aside__paragraph">
            {{ $t('registerDesc') }}
          </p>

          <territory-info v-if="info.register.territory" />

          <!-- registration deadline -->
          <div class="register-info" v-if="info.register.deadline_in_person">
            <div class="register-info-deadline">
              {{ $t('registrationDeadline') }}
              <span>{{ niceDate(info.register.deadline_in_person) }}</span
              >,
              <span class="days-left">{{ daysLeft(info.register.deadline_in_person) }}!</span>
            </div>
            <mark-down
              :content="
                $t('registerLinks', {
                  onlineUrl: info.register.online_link,
                  mailLink: info.register.mail_link,
                })
              "
            />
          </div>

          <!-- Youth -->
          <CaliSpecial v-if="usaCode === 'ca'" />
          <div v-else-if="info.register.youth" class="register-info">
            <span>{{ info.register.youth }} </span>
            <cv-link
              style="margin-left: 0"
              :inline="true"
              :href="info.register.youth_link || info.register.online_link"
              target="_blank"
              >{{ $t('register') }}</cv-link
            >
          </div>
          <div v-else class="register-info">
            <div>{{ $t('registerYouthQ') }}</div>
            <i18n path="registerYouth_3">
              <template v-slot:state>
                <cv-link
                  style="margin-left: 0"
                  :inline="true"
                  href="https://www.ncsl.org/research/elections-and-campaigns/preregistration-for-young-voters.aspx"
                  target="_blank"
                  >{{ $t('registerYouth_3a') }}</cv-link
                >
              </template>
            </i18n>
          </div>

          <!-- Formerly incarcerated-->
          <div class="register-info">
            <span>{{ felonText }} </span>
            <cv-link style="margin-left: 0" :inline="true" :href="felonLink" target="_blank">{{
              $t('moreInformation')
            }}</cv-link>
          </div>

          <!-- Register day of voting -->
          <div class="register-faq-header">{{ $t('faq') }}</div>
          <div class="register-faq" v-if="'election_day' in info.register">
            <span>{{ $t('registerElectionDay') }}</span
            ><span>{{ info.register.election_day ? $t('yes') : $t('no') }}</span>
          </div>

          <!-- Register online -->
          <div class="register-faq" v-if="'online' in info.register">
            <span>{{ $t('registerOnlineQ') }}</span
            ><span>{{ info.register.online ? $t('yes') : $t('no') }}</span>
          </div>
        </div>
      </aside>
    </template>
    <template v-slot:image>
      <aside class="aside__container--img" :aria-label="$t('ariaSupportingImage')">
        <img
          class="aside__image"
          src="../../assets/register-page-woman-in-sun-image-1.jpeg"
          alt="Black woman with large afro smiles and looks off camera with the sun on her."
        />
      </aside>
    </template>
  </MainContent>
</template>

<script>
import MainContent from '../../components/MainContent';
import { mapState } from 'vuex';
import SelectState from './SelectState';
import CaliSpecial from './CaliSpecial';
import electionInfo from '@/data/usa-2022-midterms-info.json';
import dateFormatter from '@/api/dateFormatter';
import TerritoryInfo from '@/views/JourneyPage/TerritoryInfo';
import MarkDown from '@/components/MarkDown/MarkDown';

export default {
  name: 'reg',
  components: { MarkDown, TerritoryInfo, SelectState, MainContent, CaliSpecial },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      usaState: (state) => state.user.info?.location?.region,
      usaCode: (state) => state.user.info?.location?.region_code,
      registered: (state) => Boolean(state.user.info?.registered === 'midterm-2022'),
    }),
    info() {
      const code = this.usaCode?.toLowerCase() || 'unknown';
      return electionInfo[code] || { register: { territory: true } };
    },
    checkRegLink() {
      return this.info?.register?.check_link || 'https://www.vote.org/am-i-registered-to-vote/';
    },
    felonText() {
      return this.info?.register?.felon || 'Formerly incarcerated? You may be able to vote.';
    },
    felonLink() {
      return (
        this.info?.register?.felon_link ||
        'https://www.ncsl.org/research/elections-and-campaigns/felon-voting-rights.aspx'
      );
    },
  },
  created() {
    this.$store.dispatch('getApproxLocation');
  },
  methods: {
    daysLeft: (dateStr) => dateFormatter.daysLeft(dateStr),
    niceDate: (dateStr) => dateFormatter.niceDate(dateStr),
    onRegistered(val) {
      this.$store.commit('setRegistered', val);
    },
  },
};
</script>

<style lang="scss">
@import './register.scss';
@import 'carbon-components/scss/components/checkbox/checkbox';
</style>
