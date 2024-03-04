<template>
  <cv-header
    aria-label="Five Fifths Voter header"
    class="!h-[2rem] !bg-ff-purple-01"
  >
    <cv-header-menu-button
      aria-label="header - menu"
      aria-controls="side-nav"
    />
    <cv-skip-to-content href="#main-content"></cv-skip-to-content>
    <cv-header-name prefix="" @click="scrollTop()"> FiveFifths</cv-header-name>
    <cv-header-nav aria-label="Five Fifths Voter navigation">
      <cv-header-menu-item
        :data-pos="ourMissionPosition"
        class="data-[pos=here]:font-extrabold"
        @click="scrollToId('our-mission')"
      >
        Our mission
        <arrow-down
          :data-pos="ourMissionPosition"
          class="inline-block opacity-100 transition-all duration-500 data-[pos=up]:-rotate-180
            data-[pos=here]:opacity-0"
        />
      </cv-header-menu-item>
      <cv-header-menu-item href="/journey" :active="activeJourney">
        Voter journey <arrow-up-right class="inline-block" />
      </cv-header-menu-item>
      <cv-header-menu-item
        :data-pos="ourValuesPosition"
        class="data-[pos=here]:font-extrabold"
        @click="scrollToId('our-values')"
      >
        Our Values
        <arrow-down
          :data-pos="ourValuesPosition"
          class="inline-block opacity-100 transition-all duration-500 data-[pos=up]:-rotate-180
            data-[pos=here]:opacity-0"
        />
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
          <cv-side-nav-link @click="scrollTop()">
            <template #nav-icon><home-icon /></template>
            Home
          </cv-side-nav-link>
          <cv-side-nav-link @click="scrollToId('our-mission')">
            <template #nav-icon
              ><arrow-down
                :data-pos="ourMissionPosition"
                class="inline-block opacity-100 transition-all duration-500 data-[pos=here]:-rotate-90
                  data-[pos=up]:-rotate-180 md:data-[pos=here]:opacity-0"
            /></template>
            Our Mission
          </cv-side-nav-link>
          <cv-side-nav-link href="/journey">
            <template #nav-icon><voter-journey-icon /></template>
            Voter Journey
          </cv-side-nav-link>
          <cv-side-nav-link @click="scrollToId('our-values')">
            <template #nav-icon
              ><arrow-down
                :data-pos="ourValuesPosition"
                class="inline-block opacity-100 transition-all duration-500 data-[pos=here]:-rotate-90
                  data-[pos=up]:-rotate-180 md:data-[pos=here]:opacity-0"
            /></template>
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
  Compass16 as VoterJourneyIcon,
  HelpDesk16 as VoterSupportIcon,
  Help16 as WhyVoteIcon,
  ArrowDown16 as ArrowDown,
  ArrowUpRight16 as ArrowUpRight,
} from "@carbon/icons-vue";
import { debounce } from "lodash";

defineOptions({
  name: "HomeHeader",
});
const route = useRoute();
const activeVoterSupport = computed(() => route.name === "VoterSupport");
const activeWhyVote = computed(() => route.name === "WhyVote");
const activeJourney = computed(() => route.name === "Journey");

function scrollToId(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  document.activeElement.blur();
}
function scrollTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  document.activeElement.blur();
}
const ourValuesPosition = ref("down");
const ourMissionPosition = ref("down");
const onScroll = debounce(function () {
  const ourValueEl = document.getElementById("our-values");
  const valuesRect = ourValueEl.getBoundingClientRect();
  if (Math.abs(valuesRect.top) < 150) ourValuesPosition.value = "here";
  else if (valuesRect.top > 0) ourValuesPosition.value = "down";
  else ourValuesPosition.value = "up";

  const ourMissionEl = document.getElementById("our-mission");
  const missionRect = ourMissionEl.getBoundingClientRect();
  if (Math.abs(missionRect.top) < 150) ourMissionPosition.value = "here";
  else if (missionRect.top > 0) ourMissionPosition.value = "down";
  else ourMissionPosition.value = "up";
}, 250);
onMounted(() => addEventListener("scroll", onScroll));
onBeforeUnmount(() => removeEventListener("scroll", onScroll));
</script>

<style lang="scss">
@import "@/assets/scss/theme";
$shell-side-nav-text-01: white;

#side-nav {
  margin-top: -1rem;
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
