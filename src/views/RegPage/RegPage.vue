<template>
  <div class="bx--grid bx--grid--full-width landing-page">
    <div class="bx--row landing-page__r2">
      <div class="bx--col-lg-16">
        <p v-if="regData.firstName === 'David'">
          Congratulations! You are <u>Registered</u> as an <b>ACTIVE</b> voter!
        </p>
        <div v-if="regData.firstName !== 'David'">
          <p v-if="regData.firstName === 'Steve'">
            The good news is that you are <u>Registered</u> to vote. But, you
            have been marked <b>INACTIVE</b>
          </p>
          <p v-if="regData.firstName !== 'Steve'">
            You are <b><u>not registered</u></b> to vote, but it may not be too
            late. Let's get you registered for the next election.
          </p>
        </div>
      </div>
    </div>
  </div>
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
