<template>
  <div>
    <Hero />
    <cv-content id="#main-content">
      <div class="bx--grid bx--grid--full-width landing-page">
        <div class="bx--row">
          <div class="bx--col-lg-16">
            <div class="main">
              <div class="article-feed">
                <section class="article">
                  <div class="article__content">
                    <h2 class="article__heading">embrace.</h2>
                    <p
                      class="article__paragraph"
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a class="button bx--btn bx--btn--primary" href="#">Link</a>
                    <a class="button bx--btn bx--btn--primary" href="#">Link</a>
                  </div>
                  <img
                    class="article__img"
                    src="https://www.nappy.co/wp-content/uploads/2020/01/20200104-IMG_1355-scaled.jpg"
                    alt="black woman laughing"
                  />
                </section>
                <section class="article">
                  <div>
                    <h2 class="article__heading">embrace.</h2>
                    <p
                      class="article__paragraph"
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a class="button bx--btn bx--btn--primary" href="#">Link</a>
                  </div>
                  <img
                    class="article__img"
                    src="https://www.nappy.co/wp-content/uploads/2020/01/20200104-IMG_1355-scaled.jpg"
                    alt="black woman laughing"
                  />
                </section>
                <section class="article">
                  <div>
                    <h2 class="article__heading">embrace.</h2>
                    <p
                      class="article__paragraph"
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a class="button bx--btn bx--btn--primary" href="#">Link</a>
                  </div>
                  <img
                    class="article__img"
                    src="https://www.nappy.co/wp-content/uploads/2020/01/20200104-IMG_1355-scaled.jpg"
                    alt="black woman laughing"
                  />
                </section>
              </div>
              <aside class="sidebar">
              </aside>
            </div>
          </div>
        </div>
      </div>
    </cv-content>
    <!-- <div class="bx--grid bx--grid--full-width landing-page">
      <div class="bx--row">
        <div class="bx--col-lg-16">
          <iframe
            v-resize="{ log: true }"
            src="https://verify.vote.org/?partner=111111&campaign=free-tools"
            width="100%"
            scrollable="no"
          ></iframe>
        </div>
      </div>
      <div class="bx--row landing-page__r3">
        <div class="bx--col-md-4 bx--col-lg-4">
          <router-link :to="{ name: 'reg-page' }">
            <cv-button>Need to register?</cv-button>
          </router-link>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import Hero from '../../components/Hero';

export default {
  name: 'LandingPage',
  components: { Hero },
  data() {
    return {
      yourName: '',
      firstName: '',
      lastName: '',
      dob: '',
      visible: false,
    };
  },
  methods: {
    onClick() {
      this.visible = true;
    },
    modalClosed() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss">
@import './carbon-overrides';
@import '../../styles/carbon-utils';
</style>
