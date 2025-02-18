<template>
  <div class="register-info">
    <span>{{ $t("registerLiveInUsTerritory") }}</span>
    <br>
    <cv-link
      :inline="true"
      href="https://www.usa.gov/who-can-vote"
      target="_blank"
    >
      {{ $t("registerTerritories") }}
    </cv-link>
    <br>
    <cv-link
      :inline="true"
      href="https://en.wikipedia.org/wiki/Federal_voting_rights_in_Puerto_Rico"
      target="_blank"
    >
      {{ $t("registerTerritoryCitizensRights") }}
    </cv-link>
  </div>
</template>
