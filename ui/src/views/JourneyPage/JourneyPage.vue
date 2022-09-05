<template>
  <PageLayout childData="mother-daughter-hero.jpeg" class="journey-page">
    <div class="page__details">
      <h2 class="page__title">{{ $t('journeyPageTitle') }}</h2>
    </div>
    <div class="journey-page__nav">
      <cv-link
        @click="which = 'register'"
        :aria-label="$t('journeyPageRegisteredAriaLabel')"
        :aria-selected="which === 'register'"
      >
        <Current v-if="which === 'register'" aria-hidden="true" />
        {{ $t('journeyPageRegisteredLabel') }}
      </cv-link>
      <cv-link
        @click="which = 'absentee'"
        :aria-label="$t('journeyPageBallotAriaLabel')"
        :aria-selected="which === 'absentee'"
      >
        <Current v-if="which === 'absentee'" /> {{ $t('journeyPageBallotLabel') }}
      </cv-link>
      <cv-link
        @click="which = 'get-informed'"
        :aria-label="$t('journeyPageGetInformedAriaLabel')"
        :aria-selected="which === 'get-informed'"
      >
        <Current v-if="which === 'get-informed'" /> {{ $t('journeyPageGetInformedLabel') }}
      </cv-link>
      <cv-link
        @click="which = 'early-voting'"
        :aria-label="$t('journeyPageVoteNowAriaLabel')"
        :aria-selected="which === 'early-voting'"
      >
        <Current v-if="which === 'early-voting'" /> {{ $t('journeyPageVoteNowLabel') }}
      </cv-link>
      <cv-link
        @click="which = 'ballot-return'"
        :aria-label="$t('journeyPageDeliverAriaLabel')"
        :aria-selected="which === 'ballot-return'"
      >
        <Current v-if="which === 'ballot-return'" /> {{ $t('journeyPageDeliverLabel') }}
      </cv-link>
    </div>

    <Register v-if="which === 'register'" />
    <Absentee v-else-if="which === 'absentee'" />
    <get-informed v-else-if="which === 'get-informed'" />
    <EarlyVoting v-else-if="which === 'early-voting'" />
    <BallotReturn v-else-if="which === 'ballot-return'" />
  </PageLayout>
</template>

<script>
import Register from '../../components/Register';
import Absentee from '../../components/Absentee';
import EarlyVoting from '../../components/EarlyVoting';
import BallotReturn from '../../components/BallotReturn';
import GetInformed from '../../components/GetInformed';
import PageLayout from '../../components/PageLayout';
import { CaretRight16 } from '@carbon/icons-vue';
import { mapState } from 'vuex';

export default {
  name: 'journey',
  components: {
    Register,
    Absentee,
    EarlyVoting,
    BallotReturn,
    GetInformed,
    PageLayout,
    Current: CaretRight16,
  },
  data() {
    return {
      which: 'register',
    };
  },
  computed: {
    ...mapState({
      registered: (state) => Boolean(state.user.info?.registered === 'midterm-2022'),
      absentee: (state) => Boolean(state.user.info?.requested_early === 'midterm-2022'),
    }),
  },
  watch: {
    registered() {
      if (this.registered && this.which === 'register') this.which = 'absentee';
    },
    absentee() {
      if (this.absentee && this.which === 'absentee') this.which = 'get-informed';
    },
  },
  created() {
    if (this.registered && this.which === 'register') this.which = 'absentee';
    else if (this.registered && this.which === 'absentee') this.which = 'get-informed';
  },
  methods: {},
  errorCaptured(err, vm, info) {
    try {
      console.warn('suppress error from carbon tabs', info);
      console.warn(err.stack);
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
