<template>
  <PageLayout childData="mother-daughter-hero.jpeg">
    <div class="page__details">
      <h2 class="page__title">Your voting journey</h2>
    </div>
    <cv-tabs :container="container" aria-label="voter journey">
      <cv-tab
        id="tab-1"
        label="Are You Registered To Vote?"
        aria-label="check if you are registered to vote"
      >
        <Register />
      </cv-tab>
      <cv-tab id="tab-2" label="Mail In Ballot" aria-label="request an absentee ballot">
        <Absentee />
      </cv-tab>
      <cv-tab
        id="tab-3"
        label="Get Informed"
        aria-label="find information regarding your state's voting credentials"
      >
        <VoteNow />
      </cv-tab>
      <cv-tab id="tab-4" label="Vote" aria-label="find early voting and day-of voting locations">
        <EarlyVoting />
      </cv-tab>
      <cv-tab
        id="tab-5"
        label="Deliver Your Ballot"
        aria-label="find a drop box for your absentee ballot"
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
    PageLayout
  },
  data() {
    return {
      complete: [false, false, false, false, false],
      container: true
    };
  },
  created() {
    this.$amplitude.getInstance().logEvent('Page Visit', { page: 'Journey Page' });
  },
  methods: {
    showStep() {
      this.complete = [true, false, false, false, false];
    }
  }
};
</script>

<style lang="scss">
@import './journeypage.scss';
</style>
