<template>
  <div class="impactFeatureCard">
    <div class="bx--feature-card">
      <div class="bx--row">
        <div class="hero bx--no-gutter-md--left bx--col-lg-12">
          <div
            class="bx--aspect-ratio bx--feature-card__img bx--aspect-ratio--16x9"
          >
            <div class="bx--aspect-ratio--object bx--feature-background">
              <img
                class="hero__image"
                alt=""
                src="../../assets/ebrace-vote-gif.gif"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="hero__content">
        <h1 class="hero__heading">five fifths voter.</h1>
        <h2 class="hero__description">
          We will educate Black voters by providing them with guidance and
          directing them to the most up-to-date tools necessary to complete the
          voting process.
        </h2>
        <h3 class="hero__quote">
          "My dear friends: Your vote is precious, almost sacred. It is the most
          powerful nonviolent tool we have to create a more perfect union."
          <br />
          <span class="hero__author"> - John Lewis, 2012</span>
        </h3>
      </div>
      <div class="bx--row bx--feature-card__row">
        <div
          class="bx--no-gutter-md--left bx--offset-md-4 bx--offset-lg-8 bx--col-md-4 bx--col-lg-4 bx--feature-card__column"
        >
          <div
            target="_blank"
            rel="noopener noreferrer"
            class="bx--resource-card"
          >
            <div class="bx--aspect-ratio bx--aspect-ratio--2x1">
              <div class="bx--aspect-ratio--object">
                <router-link class="bx--feature-card__link" to="/whyvote">
                  <div class="hero__cta bx--tile">
                    <h4 class="bx--resource-card__title">
                      Why Vote
                    </h4>
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

  <!-- <div class="impactPanel bx--grid">
    <div class="impactFeatureCard">
      <div class="bx--feature-card">
        <div class="bx--row">
          <div class="bx--no-gutter-md--left bx--col-lg-12">
            <div
              class="bx--aspect-ratio bx--feature-card__img bx--aspect-ratio--16x9"
            >
              <div class="bx--aspect-ratio--object bx--feature-background">
                <img
                  class="hero"
                  alt="hero"
                  src="../../assets/ebrace-vote-gif.gif"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="bx--row bx--feature-card__row">
          <div
            class="bx--no-gutter-md--left bx--offset-md-4 bx--offset-lg-8 bx--col-md-4 bx--col-lg-4 bx--feature-card__column"
          >
            <div
              target="_blank"
              rel="noopener noreferrer"
              class="bx--resource-card"
            >
              <div class="bx--aspect-ratio bx--aspect-ratio--2x1">
                <div class="bx--aspect-ratio--object">
                  <a
                    class="bx--feature-card__link"
                    href="https://medium.com/design-ibm/accessible-design-thinking-in-the-enterprise-world-3af449856dba"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div class="bx--tile">
                      <h4 class="bx--resource-card__title">
                        Call to Action
                      </h4>
                      <div class="bx--resource-card__icon--img"></div>
                      <div class="bx--resource-card__icon--action">
                        <svg
                          focusable="false"
                          preserveAspectRatio="xMidYMid meet"
                          aria-label="Open resource"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 32 32"
                          role="img"
                        >
                          <path
                            d="M26,28H6a2,2,0,0,1-2-2V6A2,2,0,0,1,6,4h9V6H6V26H26V17h2v9A2,2,0,0,1,26,28Z"
                          ></path>
                          <polygon
                            points="21 2 21 4 26.59 4 18 12.59 19.41 14 28 5.41 28 11 30 11 30 2 21 2"
                          ></polygon>
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->

  <!-- <div class="hero">
    <img
      class="hero__image"
      v-bind:src="require(`@/assets/${img}`)"
      alt="woman is holding daughter"
    />
    <h1 class="hero__heading">five fifths voter.</h1>
    <h2 class="hero__description">
      We will educate Black voters by providing them with guidance and directing
      them to the most up-to-date tools necessary to complete the voting
      process.
    </h2>
    <h3 class="hero__quote">
      "My dear friends: Your vote is precious, almost sacred. It is the most
      powerful nonviolent tool we have to create a more perfect union."
      <br />
      <span class="hero__author"> - John Lewis, 2012</span>
    </h3>
    <cv-button class="button--cta">
      <span class="button--cta-text">Call to Action</span>
    </cv-button>
  </div> -->
</template>

<script>
export default {
  name: 'Hero',
  props: {
    img: String
  }
};
</script>
