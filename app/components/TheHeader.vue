<template>
  <cv-header
    id="ff-header"
    class="!h-24"
  >
    <cv-header-menu-button
      id="ff-header-menu"
      aria-label="header - menu"
      aria-controls="side-nav"
    />
    <cv-skip-to-content href="#main-content" />
    <cv-header-name
      to="/"
      prefix=""
    >
      <img
        alt=""
        src="@/assets/images/FiveFifthsVoterLogo.png"
        class="h-full max-h-[32px] sm:max-h-[64px]"
      >
      FiveFifths
    </cv-header-name>
    <cv-header-nav aria-label="Five Fifths Voter navigation">
      <cv-header-menu-item
        id="header-menu-our-mission"
        to="/#our-mission"
      >
        {{ $t("landingPageMain") }}
      </cv-header-menu-item>
      <cv-header-menu-item
        id="header-menu-journey"
        to="/journey"
        :class="{ '!bg-ff-purple-02': activeJourney }"
      >
        {{ $t("appHeaderVoterJourney") }}
      </cv-header-menu-item>
      <cv-header-menu-item
        id="header-menu-our-values"
        to="/#our-values"
      >
        {{ $t("appHeaderOurValues") }}
      </cv-header-menu-item>
      <cv-header-menu-item
        id="header-menu-support"
        :class="{ '!bg-ff-purple-02': activeVoterSupport }"
        to="/voterSupport"
      >
        {{ $t("appHeaderVoterSupport") }}
      </cv-header-menu-item>
      <cv-header-menu-item
        id="header-menu-why"
        :class="{ '!bg-ff-purple-02': activeWhyVote }"
        to="/whyVote"
      >
        {{ $t("appHeaderWhyVote") }}
      </cv-header-menu-item>
    </cv-header-nav>
    <template #header-global>
      <cv-link
        class="px-2 py-8"
        href="https://www.instagram.com/fivefifthsvoter/?igshid=Zjc2ZTc4Nzk%3D"
        target="_blank"
        aria-label="Five Fifths Voter on instagram - link opens in a new window"
      >
        <instagram class="text-carbon-gray-30" />
      </cv-link>
      <cv-link
        class="px-2 py-8"
        href="https://github.com/Call-for-Code-for-Racial-Justice/Five-Fifths-Voter"
        target="_blank"
        aria-label="Link to code for this site in GitHub - link opens in a new window"
      >
        <git-hub class="text-carbon-gray-30" />
      </cv-link>
      <cv-header-global-action
        id="header-language-button"
        :aria-label="$t('ariaLanguageSetting')"
        aria-controls="language-panel"
        :label="$t('ariaLanguageSetting')"
        class="!mx-2 !h-6 !min-h-0 !px-0 !py-12"
        tip-position="left"
      >
        <language-switcher class="text-carbon-gray-30" />
      </cv-header-global-action>
    </template>
    <template #right-panels>
      <language-panel header-size="thick" />
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
          <cv-side-nav-link to="/">
            <template #nav-icon>
              <home-icon />
            </template>
            {{ $t("appHeaderHome") }}
          </cv-side-nav-link>
          <cv-side-nav-link to="/#our-mission">
            <template #nav-icon>
              <our-mission-icon />
            </template>
            {{ $t("landingPageMain") }}
          </cv-side-nav-link>
          <cv-side-nav-link to="/journey">
            <template #nav-icon>
              <voter-journey-icon />
            </template>
            {{ $t("appHeaderVoterJourney") }}
          </cv-side-nav-link>
          <cv-side-nav-link to="/#our-values">
            <template #nav-icon>
              <our-values-icon />
            </template>
            {{ $t("appHeaderOurValues") }}
          </cv-side-nav-link>
          <cv-side-nav-link to="/voterSupport">
            <template #nav-icon>
              <voter-support-icon />
            </template>
            {{ $t("appHeaderVoterSupport") }}
          </cv-side-nav-link>
          <cv-side-nav-link to="/whyVote">
            <template #nav-icon>
              <why-vote-icon />
            </template>
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
  Information16 as OurMissionIcon,
  Compass16 as VoterJourneyIcon,
  Group16 as OurValuesIcon,
  HelpDesk16 as VoterSupportIcon,
  Help16 as WhyVoteIcon,
  LogoInstagram32 as Instagram,
  LogoGithub32 as GitHub,
  Language32 as LanguageSwitcher,
} from "@carbon/icons-vue";
import LanguagePanel from "~/components/LanguagePanel.vue";
defineOptions({
  name: "TheHeader",
});
const route = useRoute();
const activeVoterSupport = computed(
  () => route.path.toLowerCase() === "/votersupport",
);
const activeWhyVote = computed(() => route.path.toLowerCase() === "/whyvote");
const activeJourney = computed(() => route.path.startsWith("/journey"));
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
