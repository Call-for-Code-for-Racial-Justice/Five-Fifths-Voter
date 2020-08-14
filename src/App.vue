<template>
  <div id="app">
    <app-header />
    <router-view />
    <GlobalFooter />
  </div>
</template>

<style lang="scss">
@import './styles/carbon';
</style>

<script>
import AppHeader from './components/AppHeader';
import GlobalFooter from './components/GlobalFooter';

export default {
  name: 'App',
  components: {
    AppHeader,
    GlobalFooter
  }
};
</script>
