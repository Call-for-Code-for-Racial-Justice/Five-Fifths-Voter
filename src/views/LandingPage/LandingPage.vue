<template>
  <div class="bx--grid bx--grid--full-width landing-page">
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
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
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
