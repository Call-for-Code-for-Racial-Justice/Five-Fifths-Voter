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

<template>
  <cv-header class="!h-8 !bg-ff-purple-01">
    <cv-header-menu-button
      id="ff-header-menu"
      aria-label="header - menu"
      aria-controls="side-nav"
    />
    <cv-skip-to-content href="#main-content" />
    <cv-header-name
      prefix=""
      @click="scrollTop()"
    >
      FiveFifths
    </cv-header-name>
    <cv-header-nav aria-label="Five Fifths Voter navigation">
      <cv-header-menu-item
        id="header-menu-our-mission"
        :data-pos="ourMissionPosition"
        class="data-[pos=here]:font-extrabold"
        @click="scrollToId('our-mission')"
      >
        {{ $t("landingPageMain") }}
        <ArrowDown
          :data-pos="ourMissionPosition"
          class="inline-block opacity-100 transition-all duration-500 data-[pos=up]:-rotate-180
            data-[pos=here]:opacity-0"
        />
      </cv-header-menu-item>

      <cv-header-menu-item
        id="header-menu-journey"
        to="/journey"
        :active="activeJourney"
      >
        {{ $t("appHeaderVoterJourney") }}
        <ArrowUpRight class="inline-block" />
      </cv-header-menu-item>
      <cv-header-menu-item
        id="header-menu-our-values"
        :data-pos="ourValuesPosition"
        class="data-[pos=here]:font-extrabold"
        @click="scrollToId('our-values')"
      >
        {{ $t("appHeaderOurValues") }}
        <ArrowDown
          :data-pos="ourValuesPosition"
          class="inline-block opacity-100 transition-all duration-500 data-[pos=up]:-rotate-180
            data-[pos=here]:opacity-0"
        />
      </cv-header-menu-item>
      <cv-header-menu-item
        id="header-menu-support"
        :active="activeVoterSupport"
        to="/voterSupport"
      >
        {{ $t("appHeaderVoterSupport") }}
        <ArrowUpRight class="inline-block" />
      </cv-header-menu-item>
      <cv-header-menu-item
        id="header-menu-why"
        :active="activeWhyVote"
        to="/whyVote"
      >
        {{ $t("appHeaderWhyVote") }} <ArrowUpRight class="inline-block" />
      </cv-header-menu-item>
    </cv-header-nav>
    <template #header-global>
      <cv-link
        class="p-1"
        href="https://www.instagram.com/fivefifthsvoter/?igshid=Zjc2ZTc4Nzk%3D"
        target="_blank"
        aria-label="Five Fifths Voter on instagram - link opens in a new window"
      >
        <Instagram class="text-carbon-gray-30" />
      </cv-link>
      <cv-link
        class="p-1"
        href="https://github.com/Call-for-Code-for-Racial-Justice/Five-Fifths-Voter"
        target="_blank"
        aria-label="Link to code for this site in GitHub"
      >
        <GitHub class="text-carbon-gray-30" />
      </cv-link>
      <cv-header-global-action
        id="header-language-button"
        :aria-label="$t('ariaLanguageSetting')"
        aria-controls="language-panel"
        :label="$t('ariaLanguageSetting')"
        class="!h-6 !min-h-0 !px-0 !py-3.5"
        tip-position="left"
      >
        <LanguageSwitcher class="text-carbon-gray-30" />
      </cv-header-global-action>
    </template>
    <template #right-panels>
      <LanguagePanel />
    </template>
    <template #left-panels>
      <cv-side-nav
        id="side-nav"
        :rail="false"
        :fixed="true"
        :expanded="false"
        aria-label="Side navigation for mobile devices"
      >
        <cv-side-nav-items>
          <cv-side-nav-link
            id="side-nav-home"
            @click="scrollTop()"
          >
            <template #nav-icon>
              <HomeIcon />
            </template>
            {{ $t("appHeaderHome") }}
          </cv-side-nav-link>
          <cv-side-nav-link
            id="side-nav-mission"
            @click="scrollToId('our-mission')"
          >
            <template #nav-icon>
              <ArrowDown
                :data-pos="ourMissionPosition"
                class="inline-block opacity-100 transition-all duration-500 data-[pos=here]:-rotate-90
                  data-[pos=up]:-rotate-180 md:data-[pos=here]:opacity-0"
              />
            </template>
            {{ $t("landingPageMain") }}
          </cv-side-nav-link>
          <cv-side-nav-link
            id="side-nav-journey"
            to="/journey"
          >
            <template #nav-icon>
              <VoterJourneyIcon />
            </template>
            {{ $t("appHeaderVoterJourney") }}
          </cv-side-nav-link>
          <cv-side-nav-link
            id="side-nav-values"
            @click="scrollToId('our-values')"
          >
            <template #nav-icon>
              <ArrowDown
                :data-pos="ourValuesPosition"
                class="inline-block opacity-100 transition-all duration-500 data-[pos=here]:-rotate-90
                  data-[pos=up]:-rotate-180 md:data-[pos=here]:opacity-0"
              />
            </template>
            {{ $t("appHeaderOurValues") }}
          </cv-side-nav-link>
          <cv-side-nav-link
            id="side-nav-support"
            to="/voterSupport"
          >
            <template #nav-icon>
              <VoterSupportIcon />
            </template>
            {{ $t("appHeaderVoterSupport") }}
          </cv-side-nav-link>
          <cv-side-nav-link
            id="side-nav-why"
            to="/whyVote"
          >
            <template #nav-icon>
              <WhyVoteIcon />
            </template>
            {{ $t("appHeaderWhyVote") }}
          </cv-side-nav-link>
        </cv-side-nav-items>
      </cv-side-nav>
    </template>
  </cv-header>
</template>

<style lang="css">
#side-nav {
  margin-top: -1rem;
  background-color: var(--gray-100);
  ul > li > a > span,
  ul > li > a > div > svg {
    color: white;
    fill: white;
  }
  ul > li > a:hover {
    background-color: var(--ff-purple-01);
  }
  ul > li > a > span:hover {
    color: white;
  }
}
</style>
