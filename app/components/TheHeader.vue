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
      <cv-header-menu-item href="/#our-mission">
        Our mission
      </cv-header-menu-item>
      <cv-header-menu-item href="/journey" :active="activeJourney">
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
    <template #left-panels>
      <cv-side-nav id="side-nav" :rail="false" :fixed="true" :expanded="false">
        <cv-side-nav-items>
          <cv-side-nav-link href="/">
            <template #nav-icon><home-icon /></template>
            Home
          </cv-side-nav-link>
          <cv-side-nav-link href="/#our-mission">
            <template #nav-icon><our-mission-icon /></template>
            Our Mission
          </cv-side-nav-link>
          <cv-side-nav-link href="/journey">
            <template #nav-icon><voter-journey-icon /></template>
            Voter Journey
          </cv-side-nav-link>
          <cv-side-nav-link href="/#our-values">
            <template #nav-icon><our-values-icon /></template>
            Our Values
          </cv-side-nav-link>
          <cv-side-nav-link href="/voterSupport">
            <template #nav-icon><voter-support-icon /></template>
            Voter Support
          </cv-side-nav-link>
          <cv-side-nav-link href="/whyVote">
            <template #nav-icon><why-vote-icon /></template>
            Why Vote
          </cv-side-nav-link>
        </cv-side-nav-items>
      </cv-side-nav>
    </template>
  </cv-header>
</template>

<script setup>
import {
  Home16 as HomeIcon,
  Information16 as OurMissionIcon,
  Compass16 as VoterJourneyIcon,
  Group16 as OurValuesIcon,
  HelpDesk16 as VoterSupportIcon,
  Help16 as WhyVoteIcon,
} from "@carbon/icons-vue";
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
$shell-side-nav-text-01: white;

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
    span {
      height: 20px;
    }
  }
}

#side-nav {
  margin-top: 3rem;
  background-color: $gray-100;
  // Side nav link text & icon
  ul > li > a > span,
  ul > li > a > div > svg {
    color: white;
    fill: white;
  }
  ul > li > a:hover {
    background-color: $ff-purple-01;
  }
  ul > li > a > span:hover {
    color: white;
  }
}
</style>
