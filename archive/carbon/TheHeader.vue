<script setup>
import {
  Home as HomeIcon,
  Info as OurMissionIcon,
  Map as VoterJourneyIcon,
  Users as OurValuesIcon,
  LifeBuoy as VoterSupportIcon,
  CircleHelp as WhyVoteIcon,
  Instagram as Instagram,
  Github as GitHub,
  Globe as LanguageSwitcher,
} from "lucide-vue-next";
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

watch(() => route.path, () => {
  document?.activeElement?.blur();
});
const { t } = useI18n();
</script>

<template>
  <cv-header
    id="ff-header"
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
        class="h-full"
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
        :class="{ 'bg-ff-purple-02!': activeJourney }"
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
        :class="{ 'bg-ff-purple-02!': activeVoterSupport }"
        to="/voterSupport"
      >
        {{ $t("appHeaderVoterSupport") }}
      </cv-header-menu-item>
      <cv-header-menu-item
        id="header-menu-why"
        :class="{ 'bg-ff-purple-02!': activeWhyVote }"
        to="/whyVote"
      >
        {{ $t("appHeaderWhyVote") }}
      </cv-header-menu-item>
    </cv-header-nav>
    <template #header-global>
      <a
        class="link link-hover p-2"
        href="https://www.instagram.com/fivefifthsvoter/?igshid=Zjc2ZTc4Nzk%3D"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Five Fifths Voter on instagram - link opens in a new window"
      >
        <Instagram class="text-carbon-gray-30" />
      </a>
      <a
        class="link link-hover p-2"
        href="https://github.com/Call-for-Code-for-Racial-Justice/Five-Fifths-Voter"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Link to code for this site in GitHub - link opens in a new window"
      >
        <GitHub class="text-carbon-gray-30" />
      </a>
      <cv-header-global-action
        id="header-language-button"
        :aria-label="$t('ariaLanguageSetting')"
        aria-controls="language-panel"
        :label="$t('ariaLanguageSetting')"
        tip-position="left"
      >
        <LanguageSwitcher class="text-carbon-gray-30" />
      </cv-header-global-action>
    </template>
    <template #right-panels>
      <LanguagePanel header-size="thick" />
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
          <cv-side-nav-link id="side-nav-home" to="/">
            <template #nav-icon>
              <HomeIcon />
            </template>
            {{ $t("appHeaderHome") }}
          </cv-side-nav-link>
          <cv-side-nav-link id="side-nav-mission" to="/#our-mission">
            <template #nav-icon>
              <OurMissionIcon />
            </template>
            {{ $t("landingPageMain") }}
          </cv-side-nav-link>
          <cv-side-nav-menu id="side-nav-journey-menu" :title="$t('appHeaderVoterJourney')">
            <template #nav-icon>
              <VoterJourneyIcon />
            </template>
            <cv-side-nav-menu-item id="side-nav-journey" to="/journey">▶</cv-side-nav-menu-item>
            <cv-side-nav-menu-item to="/journey/register">{{ t("journeyPageRegisteredLabel") }}</cv-side-nav-menu-item>
            <cv-side-nav-menu-item to="/journey/mailInBallot">{{ t("journeyPageBallotLabel") }}</cv-side-nav-menu-item>
            <cv-side-nav-menu-item to="/journey/getInformed">{{ t("journeyPageGetInformedLabel") }}</cv-side-nav-menu-item>
            <cv-side-nav-menu-item to="/journey/voteInPerson">{{ t("journeyPageVoteNowLabel") }}</cv-side-nav-menu-item>
            <cv-side-nav-menu-item to="/journey/ballotReturn">{{ t("journeyPageDeliverLabel") }}</cv-side-nav-menu-item>
          </cv-side-nav-menu>
          <cv-side-nav-link id="side-nav-values" to="/#our-values">
            <template #nav-icon>
              <OurValuesIcon />
            </template>
            {{ $t("appHeaderOurValues") }}
          </cv-side-nav-link>
          <cv-side-nav-link id="side-nav-support" to="/voterSupport">
            <template #nav-icon>
              <VoterSupportIcon />
            </template>
            {{ $t("appHeaderVoterSupport") }}
          </cv-side-nav-link>
          <cv-side-nav-link id="side-nav-why" to="/whyVote">
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

<style scoped lang="css">
::v-deep(.bx--side-nav__submenu),
::v-deep(.bx--side-nav__icon),
::v-deep(.bx--side-nav__link-text),
::v-deep(.bx--side-nav__icon) > svg {
  @apply !text-white;
  fill: currentColor;
}
::v-deep(a.bx--side-nav__link[aria-current="page"]) {
  background-color: #85276E;
}
.cv-header {
  a.bx--header__name {
    color: white !important;
  }

  .cv-header-name {
    img {
      margin-right: 8px;
    }
  }

  .cv-header-menu-item {
    .bx--header__menu-item {
      color: white;
    }
    .bx--header__menu-item--current {
      background-color: var(--ff-purple-01);
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
