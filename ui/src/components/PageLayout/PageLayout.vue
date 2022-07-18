<template>
  <div>
    <Hero img="mother-daughter-hero.jpeg" role="complementary" :aria-label="$t('ariaHero')" />
    <cv-content class="main-content" id="#main-content">
      <slot />
    </cv-content>
  </div>
</template>

<script>
import Hero from '../Hero';

export default {
  name: 'PageLayout',
  components: {
    Hero,
  },
  props: ['childData'],
  //pagelayout needs prop for backgroundImg
};
</script>

<style lang="scss">
@import './pagelayout';
</style>
