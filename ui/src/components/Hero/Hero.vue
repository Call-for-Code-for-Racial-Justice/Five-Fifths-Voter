<template>
  <div class="impactFeatureCard">
    <transition
      @enter="enterTransition"
      @leave="leaveTransition"
      @after-enter="afterTransition"
      @enter-cancelled="cancelTransition"
      @leave-cancelled="cancelTransition"
      v-bind:css="false"
    >
      <div class="bx--feature-card" v-if="bigHero">
        <div class="bx--row">
          <div class="hero bx--no-gutter-md--left bx--col-lg-12">
            <div
              class="bx--aspect-ratio bx--feature-card__img bx--aspect-ratio--16x9"
              role="contentinfo"
              :aria-label="$t('ariaHero')"
            >
              <div class="bx--aspect-ratio--object bx--feature-background">
                <img class="hero__image" alt="" src="../../assets/ebrace-vote-gif.gif" />
              </div>
            </div>
          </div>
        </div>
        <div class="hero__content" role="contentinfo" :aria-label="$t('ariaQuote')">
          <h1 class="hero__heading">Five Fifths Voter</h1>
          <p class="hero__description">
            {{ $t('tagline') }}<br />{{ $t('subtagline') }}
            <br />
          </p>
          <h2 class="hero__quote">
            {{ $t('quoteJohnLewis') }}
            <br />
            <span class="hero__author"> - John Lewis</span>
            <br />
            <br />
          </h2>
        </div>
        <div class="bx--row bx--feature-card__row">
          <div
            class="bx--no-gutter-md--left bx--offset-md-4 bx--offset-lg-8 bx--col-md-4 bx--col-lg-4 bx--feature-card__column"
          >
            <div target="_blank" rel="noopener noreferrer" class="bx--resource-card">
              <div class="bx--aspect-ratio bx--aspect-ratio--2x1">
                <div
                  class="bx--aspect-ratio--object"
                  role="navigation"
                  :aria-label="$t('ariaQuickWhy')"
                >
                  <router-link class="bx--feature-card__link" to="/whyvote">
                    <div class="bx--tile">
                      <h4 class="bx--resource-card__title">{{ $t('whyVoteBtn') }}</h4>
                      <div class="bx--resource-card__icon--img"></div>
                      <div class="bx--resource-card__icon--action">
                        <arrow-right focusable="false" aria-hidden="true" />
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ArrowRight16 } from '@carbon/icons-vue';
import Velocity from 'velocity-animate';
export default {
  name: 'Hero',
  props: {
    img: String,
  },
  data() {
    return { bigHero: true, bigHeight: 502 };
  },
  components: { ArrowRight: ArrowRight16 },
  mounted() {
    setTimeout(() => {
      this.bigHero = !['journey-page'].includes(this.$route.name);
    }, 0);
  },
  methods: {
    /**
     * Animate hero to full height
     * @param {el:HTMLElement}
     */
    enterTransition(el, done) {
      Velocity(el, { height: this.bigHeight }, { duration: 250, complete: done });
    },
    /**
     * Shrink hero to 0
     * @param {el:HTMLElement}
     */
    leaveTransition(el, done) {
      this.bigHeight = el.offsetHeight;
      Velocity(el, { height: 0 }, { duration: 250, complete: done });
    },
    afterTransition(el) {
      el.style.height = null;
    },
    cancelTransition(el) {
      el.style.height = null;
    },
  },
};
</script>

<style lang="scss">
@import './hero';
</style>
