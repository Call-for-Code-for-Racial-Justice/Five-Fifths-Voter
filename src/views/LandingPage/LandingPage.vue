<template>
  <PageLayout childData="mother-daughter-hero.jpeg">
    <Countdown />
    <MainContent>
      <template v-slot:content>
        <article class="article">
          <div class="article__content">
            <h2 class="article__heading">Our Mission</h2>
            <div class="bx--offset-lg-1">
              <p>
                Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum lorem ipsum
                <br /><br />
                Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum lorem ipsum
              </p>
            </div>
          </div>
        </article>
      </template>
      <template v-slot:image>
        <div class="article__img-container">
          <img
            class="article__img"
            src="../../assets/landing-page-man-on-laptop-image-1.jpg"
            alt="Man lounges on beanbag chair while browsing on his laptop"
          />
          <cv-button class="button--cta">
            <span class="button--cta-text">Call to Action</span>
          </cv-button>
        </div>
      </template>
    </MainContent>
    <MainContent>
      <template v-slot:content>
        <article class="article">
          <div class="article__content">
            <h2 class="article__heading">educate</h2>
            <span class="article__quote"
              >&quot;Knowledge is power.&quot; - Thomas Jefferson</span
            ><br /><br />
            <div class="bx--offset-lg-1">
              <p>
                We will educate Black voters by providing them with guidance and
                directing them to the most up-to-date tools necessary to
                complete the voting process.
              </p>
            </div>
          </div>
        </article>
      </template>
      <template v-slot:image>
        <div class="article__img-container">
          <img
            class="article__img"
            src="../../assets/landing-page-man-silhouette-image-2.jpeg"
            alt="Black man against black background, looking off into distance"
          />
        </div>
      </template>
    </MainContent>
    <MainContent>
      <template v-slot:content>
        <article class="article">
          <div class="article__content">
            <h2 class="article__heading">empower.</h2>
            <span class="article__quote"
              >&quot;I am no bird; and no net ensnares me: I am a free human
              being with an independent will. &quot;
              <span class="quote--author">- Charlotte Brontë</span></span
            ><br /><br />
            <div class="bx--offset-lg-1">
              <p>
                We will empower by generating solidarity amongst Black voting
                communities to encourage one another to vote, leveraging social
                media platforms for easy access to candidate information, and
                providing awareness about how their vote can impact his/her
                quality of life
              </p>
            </div>
          </div>
        </article>
      </template>
      <template v-slot:image>
        <div class="article__img-container">
          <img
            class="article__img"
            src="../../assets/landing-page-black-woman-orange-image-3.jpeg"
            alt="Black woman wearing bright orange against brick wall smiles into distance"
          />
        </div>
      </template>
    </MainContent>
    <MainContent>
      <template v-slot:content>
        <article class="article">
          <div class="article__content">
            <h2 class="article__heading">enable.</h2>
            <span class="article__quote"
              >&quot;Enablement is the key to closing the gap between intention
              and action. &quot;
              <span class="quote--author">- Paul Repetto</span></span
            ><br /><br />
            <div class="bx--offset-lg-1">
              <p>
                We will enable users to get to polling stations in the safest,
                cheapest, most efficient way by striving to eliminate the
                roadblocks on each Black voter’s journey
              </p>
            </div>
          </div>
        </article>
      </template>
      <template v-slot:image>
        <div class="article__img-container">
          <img
            class="article__img"
            src="../../assets/landing-page-black-college-student-image-4.jpg"
            alt="Black college student looks straight into the camera"
          />
        </div>
      </template>
    </MainContent>
  </PageLayout>
</template>

<script>
// import Hero from '../../components/Hero';
import Countdown from '../../components/Countdown';
import PageLayout from '../../components/PageLayout';
import MainContent from '../../components/MainContent';

export default {
  name: 'LandingPage',
  props: {
    heroImage: String
  },
  components: { Countdown, PageLayout, MainContent },
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
@import '../../styles/carbon-overrides';
@import '../../styles/carbon-utils';
</style>
