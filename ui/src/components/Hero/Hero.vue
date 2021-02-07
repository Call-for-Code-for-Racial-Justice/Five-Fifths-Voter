<template>
  <div class="impactFeatureCard">
    <div class="bx--feature-card">
      <div class="bx--row">
        <div class="hero bx--no-gutter-md--left bx--col-lg-12">
          <div class="bx--aspect-ratio bx--feature-card__img bx--aspect-ratio--16x9">
            <div class="bx--aspect-ratio--object bx--feature-background">
              <img class="hero__image" alt="" src="../../assets/ebrace-vote-gif.gif" />
            </div>
          </div>
        </div>
      </div>
      <div class="hero__content">
        <h1 class="hero__heading">Five Fifths Voter</h1>
        <p class="hero__description">
          5/5 equals a whole.<br />A whole person, a whole community, a whole nation.
          <br />
        </p>
        <h2 class="hero__quote">
          "My dear friends: Your vote is precious, almost sacred. It is the most powerful nonviolent
          tool we have to create a more perfect union."
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
              <div class="bx--aspect-ratio--object">
                <router-link class="bx--feature-card__link" to="/whyvote">
                  <div class="bx--tile">
                    <h4 class="bx--resource-card__title">Why Vote</h4>
                    <div class="bx--resource-card__icon--img"></div>
                    <div class="bx--resource-card__icon--action">
                      <svg
                        fill="#fff"
                        focusable="false"
                        preserveAspectRatio="xMidYMid meet"
                        aria-label="Open resource"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 32 32"
                        role="img"
                      >
                        <polygon
                          points="18,6 16.6,7.4 24.1,15 3,15 3,17 24.1,17 16.6,24.6 18,26 28,16 "
                        />
                      </svg>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  props: {
    img: String
  }
};
</script>

<style lang="scss">
@import './hero';
</style>
