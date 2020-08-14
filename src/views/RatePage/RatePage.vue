<template>
  <cv-content id="#main-content">
    <div class="bx--grid bx--grid--full-width landing-page">
      <div class="bx--row landing-page__r2">
        <div class="bx--col-lg-16">
          <section class="main main--register">
            <aside class="content--register">
              <h1 class="heading--lg">rate your polling place</h1>
              <h4 class="heading--sm">how was your experience</h4>
              <img src="../../assets/Rate.png" />
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
