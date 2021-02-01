<template>
  <div class="container--countdown">
    <h3>Georgia senate runoff.</h3>
    <countdown deadline="January 5, 2021" />
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
