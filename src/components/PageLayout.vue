<template>
  <div>
    <Hero img="mother-daughter-hero.jpeg" />
    <AppHeader />
    <cv-content id="#main-content">
      <div class="bx--grid bx--grid--full-width landing-page">
        <div class="bx--row">
          <div class="bx--col-lg-16">
            <slot />
          </div>
        </div>
      </div>
    </cv-content>
    <GlobalFooter />
  </div>
</template>

<script>
import Hero from './Hero';
import AppHeader from './AppHeader';
import GlobalFooter from './GlobalFooter';

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
