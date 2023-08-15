<template>
  <div class="register-info">
    <span>{{ $t('registerLiveInUsTerritory') }}</span>
    <cv-link :inline="true" href="https://www.usa.gov/who-can-vote" target="_blank">{{
      $t('registerTerritories')
    }}</cv-link>
    <cv-link
      :inline="true"
      href="https://en.wikipedia.org/wiki/Federal_voting_rights_in_Puerto_Rico"
      target="_blank"
      >{{ $t('registerTerritoryCitizensRights') }}</cv-link
    >
  </div>
</template>

<script>
export default {
  name: 'TerritoryInfo',
};
</script>

<style lang="scss">
@import '@/styles/_theme.scss';
@import './_register.scss';
</style>
