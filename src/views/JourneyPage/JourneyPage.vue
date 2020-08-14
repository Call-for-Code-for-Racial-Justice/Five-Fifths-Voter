<template>
  <cv-content id="#main-content">
    <div class="bx--grid bx--grid--full-width landing-page">
      <div class="bx--row landing-page__r2">
        <div class="bx--col-lg-16">
          <section class="main main--register">
            <aside class="content--register">
              <h1 class="heading--lg">your voting journey</h1>
              <h4 class="heading--sm">make your voice heard</h4>
            </aside>
          </section>
        </div>
      </div>
      <div class="bx--row ">
        <div class="bx--col-lg-16">
          <cv-tabs container="true" aria-label="voter journey">
            <cv-tab
              id="tab-1"
              label="Check Your Status"
              aria-label="check if you are registered to vote"
            >
              <iframe
                v-resize="{ log: true }"
                src="https://verify.vote.org/?partner=111111&campaign=free-tools"
                width="100%"
                scrollable="no"
              ></iframe>
            </cv-tab>
            <cv-tab
              id="tab-2"
              label="Register"
              aria-label="if you are not registerd, registered to vote"
            >
              <Register />
            </cv-tab>
            <cv-tab
              id="tab-3"
              label="Mail in Ballot"
              aria-label="request an absentee ballot"
            >
              <Absentee />
            </cv-tab>
            <cv-tab
              id="tab-4"
              label="Vote Now"
              aria-label="find your polling place"
            >
              <VoteNow />
            </cv-tab>
            <cv-tab
              id="tab-5"
              label="Vote Early"
              aria-label="find early voting locations"
            >
              <EarlyVoting />
            </cv-tab>
            <cv-tab
              id="tab-6"
              label="Deliver Your Ballot"
              aria-label="find a drop box for your absentee ballot"
            >
              <BallotReturn />
            </cv-tab>
          </cv-tabs>
        </div>
      </div>
    </div>
  </cv-content>
</template>

<script>
import Register from '../../components/Register';
import Absentee from '../../components/Absentee';
import EarlyVoting from '../../components/EarlyVoting';
import BallotReturn from '../../components/BallotReturn';
import VoteNow from '../../components/VoteNow';

export default {
  name: 'journey',
  components: { Register, Absentee, EarlyVoting, BallotReturn, VoteNow },
  data() {
    return {
      complete: [false, false, false, false, false]
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
