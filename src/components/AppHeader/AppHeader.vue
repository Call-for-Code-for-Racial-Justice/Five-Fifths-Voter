<template>
  <cv-header aria-label="Carbon tutorial">
    <cv-skip-to-content href="#main-content">Skip to content</cv-skip-to-content>

    <cv-header-name to="/">EmbRACE The Vote</cv-header-name>
    <cv-header-menu-item :to="{ name: 'reg-page' }">Register</cv-header-menu-item>
    <cv-header-menu-item :to="{ name: 'absentee-page' }">Absentee Ballot</cv-header-menu-item>
    <cv-header-menu-item :to="{ name: 'pollinfo-page' }">Go Vote</cv-header-menu-item>
    <cv-header-menu-item :to="{ name: 'earlyinfo-page' }">Early Voting</cv-header-menu-item>
    <cv-header-menu-item :to="{ name: 'ballotreturn-page' }">Ballot Drop Box Locations</cv-header-menu-item>
    <cv-header-nav></cv-header-nav>
  </cv-header>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>
