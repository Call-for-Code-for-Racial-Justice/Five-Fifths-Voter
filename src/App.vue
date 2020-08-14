<template>
  <div id="app">
    <app-header />
    <router-view />
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
