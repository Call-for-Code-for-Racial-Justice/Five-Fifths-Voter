<template>
  <div class="container--countdown">
    <h3>{{ $t('countdownHeader') }}</h3>
    <countdown deadline="November 5, 2024" />
  </div>
</template>

<script>
import countdown from 'vuejs-countdown';

export default {
  name: 'Countdown',
  components: { countdown },
};
</script>

<style lang="scss">
@import './countdown.scss';
</style>
