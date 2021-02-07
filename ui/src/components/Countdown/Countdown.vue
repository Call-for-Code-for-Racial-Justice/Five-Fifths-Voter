<template>
  <div class="container--countdown">
    <h3>Midterm Congressional Elections</h3>
    <countdown deadline="November 8, 2022" />
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
