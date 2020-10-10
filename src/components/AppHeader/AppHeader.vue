<template>
  <cv-header aria-label="Carbon header">
    <cv-header-menu-button aria-label="Header menu" aria-controls="side-nav" />
    <cv-skip-to-content href="#main-content">
      Skip to content
    </cv-skip-to-content>
    <cv-header-name href="javascript:void(0)" prefix="">
      five/fifths voter.
    </cv-header-name>
    <cv-header-nav aria-label="Carbon nav">
      <cv-header-menu-item :to="{ name: 'why-page' }">
        Why Vote
      </cv-header-menu-item>
      <cv-header-menu-item :to="{ name: 'journey-page' }">
        Voter Journey
      </cv-header-menu-item>
      <cv-header-menu-item :to="{ name: 'connect-page' }">
        Get Connected
      </cv-header-menu-item>
      <cv-header-menu-item :to="{ name: 'support-page' }">
        Voter Support
      </cv-header-menu-item>
    </cv-header-nav>
    <template v-slot:left-panels v-if="areLeftPanels">
      <cv-side-nav id="side-nav" fixed>
        <cv-side-nav-items>
          <cv-header-side-nav-items>
            <cv-header-menu-item :to="{ name: 'why-page' }">
              Why Vote
            </cv-header-menu-item>
            <cv-header-menu-item :to="{ name: 'journey-page' }">
              Voter Journey
            </cv-header-menu-item>
            <cv-header-menu-item :to="{ name: 'connect-page' }">
              Get Connected
            </cv-header-menu-item>
            <cv-header-menu-item :to="{ name: 'support-page' }">
              Voter Support
            </cv-header-menu-item>
          </cv-header-side-nav-items>
        </cv-side-nav-items>
      </cv-side-nav>
    </template>
  </cv-header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      areLeftPanels() {
        return false;
      }
    };
  }
};
</script>

<style lang="scss">
@import '../../styles/carbon-utils';
@import './appheader.scss';
</style>
