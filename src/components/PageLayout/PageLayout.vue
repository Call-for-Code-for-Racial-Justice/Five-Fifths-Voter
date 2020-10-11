<template>
  <div>
    <Hero img="mother-daughter-hero.jpeg" />
    <AppHeader />
    <cv-content class="main-content" id="#main-content">
      <slot />
    </cv-content>
  </div>
</template>

<script>
import Hero from '../Hero';
import AppHeader from '../AppHeader';

export default {
  name: 'PageLayout',
  components: {
    Hero,
    AppHeader
  },
  props: ['childData']
  //pagelayout needs prop for backgroundImg
};
</script>

<style lang="scss">
@import './pagelayout';
</style>
