<template>
  <cv-header aria-label="Five Fifths Voter header">
    <cv-header-menu-button
      aria-label="header - menu"
      aria-controls="side-nav"
    />
    <cv-skip-to-content href="#main-content"></cv-skip-to-content>
    <cv-header-name href="/" prefix=""
      ><img alt="" src="@/assets/images/FiveFifthsVoterLogo.png" height="64" />
      FiveFifths</cv-header-name
    >
    <cv-header-nav aria-label="Five Fifths Voter navigation">
      <cv-header-menu-item href="/#out-mission">
        Our mission
      </cv-header-menu-item>
      <cv-header-menu-item href="journey" :active="activeJourney">
        Voter journey
      </cv-header-menu-item>
      <cv-header-menu-item href="/#our-values">
        Our Values
      </cv-header-menu-item>
      <cv-header-menu-item :active="activeVoterSupport" href="/voterSupport">
        Voter support
      </cv-header-menu-item>
      <cv-header-menu-item :active="activeWhyVote" href="/whyVote">
        Why Vote
      </cv-header-menu-item>
    </cv-header-nav>
  </cv-header>
</template>

<script setup>
defineOptions({
  name: "TheHeader",
});
const route = useRoute();
const activeVoterSupport = computed(() => route.name === "VoterSupport");
const activeWhyVote = computed(() => route.name === "WhyVote");
const activeJourney = computed(() => route.name === "Journey");
</script>

<style lang="scss">
@import "@/assets/scss/theme";
.cv-header {
  height: 96px !important;

  a.bx--header__name {
    color: white !important;
    font-size: carbon--type-scale(5);
  }

  .cv-header-name {
    img {
      margin-right: 8px;
    }
  }
  .cv-header-menu-item {
    .bx--header__menu-item {
      color: white;
      font-size: carbon--type-scale(5);
    }
    .bx--header__menu-item--current {
      background-color: $ff-purple-01;
    }
    .bx--header__menu-item--current:after {
      border-width: 0;
    }
  }
}
</style>
