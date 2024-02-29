<template>
  <cv-header
    aria-label="Five Fifths Voter header"
    class="!bg-ff-purple-01 !h-[2rem]"
  >
    <cv-header-menu-button
      aria-label="header - menu"
      aria-controls="side-nav"
    />
    <cv-skip-to-content href="#main-content"></cv-skip-to-content>
    <cv-header-name @click="scrollTop()" prefix=""> FiveFifths</cv-header-name>
    <cv-header-nav aria-label="Five Fifths Voter navigation">
      <cv-header-menu-item @click="scrollToId('our-mission')">
        Our mission <arrow-down class="inline-block" />
      </cv-header-menu-item>
      <cv-header-menu-item href="/journey" :active="activeJourney">
        Voter journey <arrow-up-right class="inline-block" />
      </cv-header-menu-item>
      <cv-header-menu-item @click="scrollToId('our-values')">
        Our Values <arrow-down class="inline-block" />
      </cv-header-menu-item>
      <cv-header-menu-item :active="activeVoterSupport" href="/voterSupport">
        Voter support <arrow-up-right class="inline-block" />
      </cv-header-menu-item>
      <cv-header-menu-item :active="activeWhyVote" href="/whyVote">
        Why Vote <arrow-up-right class="inline-block" />
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
  ArrowDown16 as ArrowDown,
  ArrowUpRight16 as ArrowUpRight,
} from "@carbon/icons-vue";
defineOptions({
  name: "HomeHeader",
});
const route = useRoute();
const activeVoterSupport = computed(() => route.name === "VoterSupport");
const activeWhyVote = computed(() => route.name === "WhyVote");
const activeJourney = computed(() => route.name === "Journey");

function scrollToId(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}
function scrollTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}
</script>

<style lang="scss">
@import "@/assets/scss/theme";
$shell-side-nav-text-01: white;

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
