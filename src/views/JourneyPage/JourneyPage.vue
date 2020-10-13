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
      <cv-tab
        id="tab-2"
        label="Mail In Ballot"
        aria-label="request an absentee ballot"
      >
        <Absentee />
      </cv-tab>
      <cv-tab
        id="tab-3"
        label="Get Informed"
        aria-label="find information regarding your state's voting credentials"
      >
        <VoteNow />
      </cv-tab>
      <cv-tab
        id="tab-4"
        label="Vote"
        aria-label="find early voting and day-of voting locations"
      >
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
    <!-- <MainContent>
      <template v-slot:content>
        <aside class="aside">
          <div class="aside__container--text">
            <h2 class="aside__header">Resources are available to help you</h2>
            <div class="aside__container--links">
              <cv-link
                href="https://www.empowerline.org/services/transportation-options/"
                >Seniors, find a ride to the polls</cv-link
              ><br />
              <cv-link
                href="https://ymcaofcoastalga.org/news/2018/10/17/ymca-news/ymca-works-to-help-make-it-easier-for-parents-to-vote/"
                >Free election day childcare</cv-link
              >
              <br />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.orem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. orem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </aside>
      </template>
      <template v-slot:image>
        <aside class="aside__container--img">
          <img
            class="aside__image"
            src="../../assets/support-page-father-baby-image-1.jpg"
            alt="Man lounges on beanbag chair while browsing on his laptop"
          />
        </aside>
      </template>
    </MainContent> -->
  </PageLayout>
</template>

<script>
import Register from '../../components/Register';
import Absentee from '../../components/Absentee';
import EarlyVoting from '../../components/EarlyVoting';
import BallotReturn from '../../components/BallotReturn';
import VoteNow from '../../components/VoteNow';
import PageLayout from '../../components/PageLayout';
// import MainContent from '../../components/MainContent';

export default {
  name: 'journey',
  components: {
    Register,
    Absentee,
    EarlyVoting,
    BallotReturn,
    VoteNow,
    PageLayout
    // MainContent
  },
  data() {
    return {
      complete: [false, false, false, false, false],
      container: true
    };
  },
  created() {},
  methods: {
    showStep() {
      this.complete = [true, false, false, false, false];
    }
  }
};
</script>
