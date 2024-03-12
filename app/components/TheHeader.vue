<template>
  <cv-header aria-label="Five Fifths Voter header" class="!h-[6rem]">
    <cv-header-menu-button
      aria-label="header - menu"
      aria-controls="side-nav"
    />
    <cv-skip-to-content href="#main-content"></cv-skip-to-content>
    <cv-header-name to="/" prefix=""
      ><img alt="" src="@/assets/images/FiveFifthsVoterLogo.png" height="64" />
      FiveFifths</cv-header-name
    >
    <cv-header-nav aria-label="Five Fifths Voter navigation">
      <cv-header-menu-item to="/#our-mission">
        Our mission
      </cv-header-menu-item>
      <cv-header-menu-item
        to="/journey"
        :class="{ '!bg-ff-purple-02': activeJourney }"
      >
        Voter journey
      </cv-header-menu-item>
      <cv-header-menu-item to="/#our-values"> Our Values </cv-header-menu-item>
      <cv-header-menu-item
        :class="{ '!bg-ff-purple-02': activeVoterSupport }"
        to="/voterSupport"
      >
        Voter support
      </cv-header-menu-item>
      <cv-header-menu-item
        :class="{ '!bg-ff-purple-02': activeWhyVote }"
        to="/whyVote"
      >
        Why Vote
      </cv-header-menu-item>
    </cv-header-nav>
    <template #left-panels>
      <cv-side-nav id="side-nav" :rail="false" :fixed="true" :expanded="false">
        <cv-side-nav-items>
          <cv-side-nav-link to="/">
            <template #nav-icon><home-icon /></template>
            Home
          </cv-side-nav-link>
          <cv-side-nav-link to="/#our-mission">
            <template #nav-icon><our-mission-icon /></template>
            Our Mission
          </cv-side-nav-link>
          <cv-side-nav-link to="/journey">
            <template #nav-icon><voter-journey-icon /></template>
            Voter Journey
          </cv-side-nav-link>
          <cv-side-nav-link to="/#our-values">
            <template #nav-icon><our-values-icon /></template>
            Our Values
          </cv-side-nav-link>
          <cv-side-nav-link to="/voterSupport">
            <template #nav-icon><voter-support-icon /></template>
            Voter Support
          </cv-side-nav-link>
          <cv-side-nav-link to="/whyVote">
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
const activeVoterSupport = computed(
  () => route.path.toLowerCase() === "/votersupport",
);
const activeWhyVote = computed(() => route.path.toLowerCase() === "/whyvote");
const activeJourney = computed(() => route.path === "/journey");
</script>

<style scoped lang="scss">
@import "@/assets/scss/theme";
$shell-side-nav-text-01: white;

.cv-header {
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
