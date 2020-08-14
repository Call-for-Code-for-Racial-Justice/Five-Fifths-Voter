<template>
  <div id="app">
    <app-header />
    <!-- <cv-content id="#main-content">
      <div class="bx--grid bx--grid--full-width">
        <div class="bx--row landing-page__banner">
          <div class="bx--col-lg-16">
            <img alt="EmbRACE The Vote" src="./assets/logo.png" />
          </div>
        </div>
    </div>-->
    <router-view />
    <!-- </cv-content> -->
  </div>
</template>

<style lang="scss">
@import './styles/carbon';
</style>

<script>
import AppHeader from './components/AppHeader';

export default {
  name: 'App',
  components: {
    AppHeader
  }
};
</script>
