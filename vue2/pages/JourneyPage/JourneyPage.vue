<template>
  <PageLayout childData="mother-daughter-hero.jpeg" class="journey-page">
    <div class="page__details">
      <h2 class="page__title">{{ $t('journeyPageTitle') }}</h2>
    </div>
    <div class="journey-page__nav">
      <cv-progress :initial-step="0" :vertical="isMobile">
        <cv-progress-step
          :label="$t('journeyPageRegisteredLabel')"
          @step-clicked="actionClick('register')"
          :complete="which !== 'register'"
        />
        <cv-progress-step
          :label="$t('journeyPageBallotLabel')"
          @step-clicked="actionClick('absentee')"
          :complete="which !== 'absentee'"
        />
        <cv-progress-step
          :label="$t('journeyPageGetInformedLabel')"
          @step-clicked="actionClick('get-informed')"
          :complete="which !== 'get-informed'"
        />
        <cv-progress-step
          :label="$t('journeyPageVoteNowLabel')"
          @step-clicked="actionClick('early-voting')"
          :complete="which !== 'early-voting'"
        />
        <cv-progress-step
          :label="$t('journeyPageDeliverLabel')"
          @step-clicked="actionClick('ballot-return')"
        />
      </cv-progress>
    </div>

    <Register v-if="which === 'register'" />
    <Absentee v-else-if="which === 'absentee'" />
    <get-informed v-else-if="which === 'get-informed'" />
    <EarlyVoting v-else-if="which === 'early-voting'" />
    <BallotReturn v-else-if="which === 'ballot-return'" />
  </PageLayout>
</template>

<script>
import Register from './Register';
import Absentee from './Absentee';
import EarlyVoting from './EarlyVoting';
import BallotReturn from './BallotReturn';
import GetInformed from './GetInformed';
import PageLayout from '@/components/PageLayout';
import { mapState } from 'vuex';
import electionInfo from '@/data/usa-2024.json';
import dateFormatter from '@/api/dateFormatter';

export default {
  name: 'journey',
  components: {
    Register,
    Absentee,
    EarlyVoting,
    BallotReturn,
    GetInformed,
    PageLayout,
  },
  data() {
    return {
      which: 'register',
      isMobile: false,
    };
  },
  computed: {
    ...mapState({
      registered: (state) => Boolean(state.user.info?.registered === 'presidential-2024'),
      absentee: (state) => Boolean(state.user.info?.requested_early === 'presidential-2024'),
      usaState: (state) => state.user.info?.location?.region,
      usaCode: (state) => state.user.info?.location?.region_code,
    }),
    info() {
      const code = this.usaCode?.toLowerCase() || 'unknown';
      return electionInfo[code] || { register: { territory: true } };
    },
  },
  watch: {
    registered() {
      if (this.registered && this.which === 'register') this.which = 'absentee';
    },
    absentee() {
      if (this.absentee && this.which === 'absentee') this.which = 'get-informed';
    },
  },
  async created() {
    await this.$store.dispatch('getApproxLocation');
    const regTooLate = dateFormatter.tooLate(this.info?.register?.deadline_in_person);
    const earlyVotingStarted = dateFormatter.tooLate(this.info?.early_voting?.start_date);
    const skipRegistration = this.registered || regTooLate;
    const absenteeTooLate = dateFormatter.tooLate(this.info?.mail_in?.request_deadline);
    const skipAbsentee = this.absentee || absenteeTooLate;

    if (skipRegistration && this.which === 'register') this.which = 'absentee';
    if (skipAbsentee && this.which === 'absentee') this.which = 'get-informed';
    if (earlyVotingStarted && this.which === 'get-informed') this.which = 'early-voting';
    window.addEventListener('resize', this.actionResize);
    this.actionResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.actionResize);
  },
  methods: {
    actionResize() {
      this.isMobile = window.innerWidth <= 950;
    },
    actionClick(which) {
      this.which = which;
      try {
        window.goatcounter?.count({
          path: this.$route.path,
          title: which,
          event: true,
        });
      } catch (e) {
        // could not count
      }
    },
  },
  errorCaptured(err, vm, info) {
    try {
      console.warn(err.stack, info);
      return false;
    } catch (e) {
      console.warn('errorCaptured', e);
    }
    return true;
  },
};
</script>

<style lang="scss">
@import './journeypage.scss';
</style>
