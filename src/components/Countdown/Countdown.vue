<template>
  <div class="container--countdown">
    <h3>presidential election.</h3>
    <countdown deadline="November 3, 2020" />
  </div>
</template>

<script>
import countdown from 'vuejs-countdown';

export default {
  name: 'Countdown',
  components: { countdown }
};
</script>

<style lang="scss">
@import './countdown.scss';
</style>
