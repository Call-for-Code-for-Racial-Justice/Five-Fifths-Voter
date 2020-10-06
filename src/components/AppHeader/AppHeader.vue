<template>
  <nav class="global-nav" aria-label="Global navigation">
    <cv-list :ordered="ordered" class="global-nav__list">
      <cv-list-item class="global-nav__list-item">
        <cv-link class="global-nav__link">Why Vote</cv-link>
      </cv-list-item>
      <cv-list-item class="global-nav__list-item">
        <cv-link class="global-nav__link">Voter Journey</cv-link>
      </cv-list-item>
      <cv-list-item class="global-nav__list-item">
        <cv-link class="global-nav__link">Get Connected</cv-link>
      </cv-list-item>
      <cv-list-item class="global-nav__list-item">
        <cv-link class="global-nav__link">Voter Support</cv-link>
      </cv-list-item>
    </cv-list>
  </nav>
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
