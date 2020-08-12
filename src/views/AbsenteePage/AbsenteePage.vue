<template>
  <cv-content id="#main-content">
    <div class="bx--grid bx--grid--full-width landing-page">
      <div class="bx--row landing-page__r2">
        <div class="bx--col-lg-16">
          <iframe
            v-resize="{ log: true }"
            src="https://absentee.vote.org/?partner=111111&campaign=free-tools"
            width="100%"
            marginheight="0"
            frameborder="0"
            id="frame2"
            scrollable="no"
          ></iframe>
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
      regData: {},
    };
  },
  created() {
    this.regData = this.$route.params.regData;
  },
  methods: {
    navigate() {
      router.go(-1);
    },
  },
};
</script>
