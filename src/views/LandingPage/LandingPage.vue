<template>
  <PageLayout childData="mother-daughter-hero.jpeg">
    <div class="main--landing-page">
      <div class="article-feed">
        <h3>presidential election.</h3>
        <Countdown deadline="November 3, 2020"></Countdown>
        <section class="article">
          <div class="article__content">
            <h2 class="article__heading">educate.</h2>
            <span class="article__quote"
              >&quot;Knowledge is power.&quot; - Thomas Jefferson</span
            ><br /><br />
            <p class="article__paragraph">
              We will educate Black voters by providing them with guidance and
              directing them to the most up-to-date tools necessary to complete
              the voting process.
            </p>
          </div>
          <img
            class="article__img"
            src="https://www.nappy.co/wp-content/uploads/2020/01/20200104-IMG_1355-scaled.jpg"
            alt="Black woman laughing"
          />
        </section>
        <section class="article">
          <div>
            <h2 class="article__heading">empower.</h2>
            <span class="article__quote"
              >&quot;I am no bird; and no net ensnares me: I am a free human
              being with an independent will.&quot; - Charlotte
              Bront&#xEB;</span
            >
            <br /><br />
            <p class="article__paragraph">
              We will empower by generating solidarity amongst Black voting
              communities to encourage one another to vote, leveraging social
              media platforms for easy access to candidate information, and
              providing awareness about how their vote can impact his/her
              quality of life.
            </p>
          </div>
          <img
            class="article__img"
            src="../../assets/man-glasses.jpg"
            alt="Black woman laughing"
          />
        </section>
        <section class="article">
          <div>
            <h2 class="article__heading">enable.</h2>
            <span class="article__quote"
              >&quot;Enablement is the key to closing the gap between intention
              and action.&quot; - Paul Repetto</span
            >
            <br /><br />
            <p class="article__paragraph">
              We will enable users to get to polling stations in the safest,
              cheapest, most efficient way by striving to eliminate the
              roadblocks on each Black voter’s journey.
            </p>
          </div>
          <img
            class="article__img"
            src="../../assets/woman-looking-up.jpg"
            alt="Black woman laughing"
          />
        </section>
      </div>
    </div>
  </PageLayout>
</template>

<script>
// import Hero from '../../components/Hero';
import Countdown from 'vuejs-countdown';
import PageLayout from '../../components/PageLayout';

export default {
  name: 'LandingPage',
  props: {
    heroImage: String
  },
  components: { Countdown, PageLayout },
  data() {
    return {
      yourName: '',
      firstName: '',
      lastName: '',
      dob: '',
      visible: false
    };
  },
  methods: {
    onClick() {
      this.visible = true;
    },
    modalClosed() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss">
@import './carbon-overrides';
@import '../../styles/carbon-utils';
</style>
