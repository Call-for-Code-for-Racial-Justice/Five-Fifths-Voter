<template>
  <PageLayout childData="mother-daughter-hero.jpeg" class="journey-page">
    <div class="page__details">
      <h2 class="page__title">{{ $t('journeyPageTitle') }}</h2>
    </div>
    <cv-tabs
      :container="container"
      :aria-label="$t('appHeaderVoterJourney')"
      class="journey-page__tabs"
    >
      <cv-tab
        id="tab-1"
        :label="$t('journeyPageRegisteredLabel')"
        :aria-label="$t('journeyPageRegisteredAriaLabel')"
      >
        <Register />
      </cv-tab>
      <cv-tab
        id="tab-2"
        :label="$t('journeyPageBallotLabel')"
        :aria-label="$t('journeyPageBallotAriaLabel')"
      >
        <Absentee />
      </cv-tab>
      <cv-tab
        id="tab-3"
        :label="$t('journeyPageGetInformedLabel')"
        :aria-label="$t('journeyPageGetInformedAriaLabel')"
      >
        <VoteNow />
      </cv-tab>
      <cv-tab
        id="tab-4"
        :label="$t('journeyPageVoteNowLabel')"
        :aria-label="$t('journeyPageVoteNowAriaLabel')"
      >
        <EarlyVoting />
      </cv-tab>
      <cv-tab
        id="tab-5"
        :label="$t('journeyPageDeliverLabel')"
        :aria-label="$t('journeyPageDeliverAriaLabel')"
      >
        <BallotReturn />
      </cv-tab>
    </cv-tabs>
  </PageLayout>
</template>

<script>
import Register from '../../components/Register';
import Absentee from '../../components/Absentee';
import EarlyVoting from '../../components/EarlyVoting';
import BallotReturn from '../../components/BallotReturn';
import VoteNow from '../../components/VoteNow';
import PageLayout from '../../components/PageLayout';

export default {
  name: 'journey',
  components: {
    Register,
    Absentee,
    EarlyVoting,
    BallotReturn,
    VoteNow,
    PageLayout,
  },
  data() {
    return {
      container: true,
    };
  },
  created() {},
  methods: {},
  errorCaptured(err, vm, info) {
    try {
      console.warn('suppress error from carbon tabs', info);
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
