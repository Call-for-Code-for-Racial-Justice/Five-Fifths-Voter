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
        {{ $t("landingPageMain") }}
        <arrow-down
          :data-pos="ourMissionPosition"
          class="inline-block opacity-100 transition-all duration-500 data-[pos=up]:-rotate-180
            data-[pos=here]:opacity-0"
        />
      </cv-header-menu-item>
      <cv-header-menu-item to="/journey" :active="activeJourney">
        {{ $t("appHeaderVoterJourney") }} <arrow-up-right class="inline-block" />
      </cv-header-menu-item>
      <cv-header-menu-item
        :data-pos="ourValuesPosition"
        class="data-[pos=here]:font-extrabold"
        @click="scrollToId('our-values')"
      >
        {{ $t("appHeaderOurValues") }}
        <arrow-down
          :data-pos="ourValuesPosition"
          class="inline-block opacity-100 transition-all duration-500 data-[pos=up]:-rotate-180
            data-[pos=here]:opacity-0"
        />
      </cv-header-menu-item>
      <cv-header-menu-item :active="activeVoterSupport" to="/voterSupport">
        {{ $t("appHeaderVoterSupport") }} <arrow-up-right class="inline-block" />
      </cv-header-menu-item>
      <cv-header-menu-item :active="activeWhyVote" to="/whyVote">
        {{ $t("appHeaderWhyVote") }} <arrow-up-right class="inline-block" />
      </cv-header-menu-item>
    </cv-header-nav>
    <template #header-global>
      <cv-link
        class="p-1"
        href="https://www.instagram.com/fivefifthsvoter/?igshid=Zjc2ZTc4Nzk%3D"
        target="_blank"
      >
        <instagram class="text-carbon-gray-30" />
      </cv-link>
      <cv-link
        class="p-1"
        href="https://github.com/Call-for-Code-for-Racial-Justice/Five-Fifths-Voter"
        target="_blank"
      >
        <git-hub class="text-carbon-gray-30" />
      </cv-link>
      <cv-header-global-action
        :aria-label="$t('ariaLanguageSetting')"
        aria-controls="language-panel"
        :label="$t('ariaLanguageSetting')"
        class="!h-6 !min-h-0 !px-0 !py-3.5"
        tip-position="left"
      >
        <language-switcher class="text-carbon-gray-30" />
      </cv-header-global-action>
    </template>
    <template #right-panels>
      <language-panel />
    </template>
    <template #left-panels>
      <cv-side-nav id="side-nav" :rail="false" :fixed="true" :expanded="false">
        <cv-side-nav-items>
          <cv-side-nav-link @click="scrollTop()">
            <template #nav-icon><home-icon /></template>
            {{ $t("appHeaderHome") }}
          </cv-side-nav-link>
          <cv-side-nav-link @click="scrollToId('our-mission')">
            <template #nav-icon
              ><arrow-down
                :data-pos="ourMissionPosition"
                class="inline-block opacity-100 transition-all duration-500 data-[pos=here]:-rotate-90
                  data-[pos=up]:-rotate-180 md:data-[pos=here]:opacity-0"
            /></template>
            {{ $t("landingPageMain") }}
          </cv-side-nav-link>
          <cv-side-nav-link to="/journey">
            <template #nav-icon><voter-journey-icon /></template>
            {{ $t("appHeaderVoterJourney") }}
          </cv-side-nav-link>
          <cv-side-nav-link @click="scrollToId('our-values')">
            <template #nav-icon
              ><arrow-down
                :data-pos="ourValuesPosition"
                class="inline-block opacity-100 transition-all duration-500 data-[pos=here]:-rotate-90
                  data-[pos=up]:-rotate-180 md:data-[pos=here]:opacity-0"
            /></template>
            {{ $t("appHeaderOurValues") }}
          </cv-side-nav-link>
          <cv-side-nav-link to="/voterSupport">
            <template #nav-icon><voter-support-icon /></template>
            {{ $t("appHeaderVoterSupport") }}
          </cv-side-nav-link>
          <cv-side-nav-link to="/whyVote">
            <template #nav-icon><why-vote-icon /></template>
            {{ $t("appHeaderWhyVote") }}
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
  LogoInstagram24 as Instagram,
  LogoGithub24 as GitHub,
  Language24 as LanguageSwitcher,
} from "@carbon/icons-vue";
import lodash from "lodash";

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
const onScroll = lodash.debounce(function () {
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
