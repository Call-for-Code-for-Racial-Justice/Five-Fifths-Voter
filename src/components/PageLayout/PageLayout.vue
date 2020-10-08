<template>
  <div>
    <Hero img="mother-daughter-hero.jpeg" />
    <AppHeader />
    <cv-content id="#main-content">
      <slot />
    </cv-content>
    <GlobalFooter />
  </div>
</template>

<script>
import Hero from '../Hero';
import AppHeader from '../AppHeader';
import GlobalFooter from '../GlobalFooter';

export default {
  name: 'PageLayout',
  components: {
    Hero,
    AppHeader,
    GlobalFooter
  },
  props: ['childData']
  //pagelayout needs prop for backgroundImg
};
</script>
