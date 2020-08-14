<template>
  <cv-content id="#main-content">
    <div class="bx--grid bx--grid--full-width landing-page">
      <div class="bx--row landing-page__r2">
        <div class="bx--col-lg-16">
          <section class="main main--register">
            <aside class="content--register">
              <h1 class="heading--lg">get voter support</h1>
              <h4 class="heading--sm">resources are available to help you</h4>
              <p>
                <cv-link
                  href="https://www.empowerline.org/services/transportation-options/"
                  >Seniors, find a ride to the polls</cv-link
                ><br />
                <cv-link
                  href="https://ymcaofcoastalga.org/news/2018/10/17/ymca-news/ymca-works-to-help-make-it-easier-for-parents-to-vote/"
                  >Free election day childcare</cv-link
                ><br />

                <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.orem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. orem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </aside>
          </section>
        </div>
      </div>
    </div>
  </cv-content>
</template>

<script>
import router from '../../router';

export default {
  name: 'reg',
  data() {
    return {
      regData: {}
    };
  },
  created() {
    this.regData = this.$route.params.regData;
  },
  methods: {
    navigate() {
      router.go(-1);
    }
  }
};
</script>
