<template>
  <cv-header :aria-label="$t('ariaHeader')">
    <cv-header-menu-button :aria-label="$t('ariaHeaderMenu')" aria-controls="side-nav" />
    <cv-skip-to-content href="#main-content"> Skip to content </cv-skip-to-content>
    <cv-header-name :to="{ name: 'landing-page' }" prefix=""> Five Fifths Voter </cv-header-name>
    <cv-header-nav :aria-label="$t('ariaMainMenu')" role="menu">
      <cv-header-menu-item :to="{ name: 'why-page' }">
        {{ $t('appHeaderWhyVote') }}
      </cv-header-menu-item>
      <cv-header-menu-item :to="{ name: 'journey-page' }">
        {{ $t('appHeaderVoterJourney') }}
      </cv-header-menu-item>
      <cv-header-menu-item :to="{ name: 'support-page' }">
        {{ $t('appHeaderVoterSupport') }}
      </cv-header-menu-item>
    </cv-header-nav>
    <template v-slot:header-global>
      <cv-link
        style="width: 48px; padding: 8px"
        href="https://www.instagram.com/fivefifthsvoter/?igshid=Zjc2ZTc4Nzk%3D"
        target="_blank"
      >
        <instagram style="fill: white" />
      </cv-link>
      <cv-header-global-action v-if="loginEnabled" :aria-label="$t('ariaUser')">
        <UserAvatar20 />
      </cv-header-global-action>
      <cv-header-global-action
        :aria-label="$t('ariaLanguageSetting')"
        aria-controls="language-panel"
        :label="$t('ariaLanguageSetting')"
        class="lang-select"
      >
        <Language32 />
      </cv-header-global-action>
      <div style="width: 48px; padding: 8px">
        <capitol style="fill: white" />
      </div>
    </template>
    <template v-slot:left-panels>
      <cv-side-nav id="side-nav" fixed :aria-label="$t('mobilenav')">
        <cv-side-nav-items>
          <cv-header-side-nav-items>
            <cv-header-menu-item :to="{ name: 'why-page' }">
              {{ $t('appHeaderWhyVote') }}
            </cv-header-menu-item>
            <cv-header-menu-item :to="{ name: 'journey-page' }">
              {{ $t('appHeaderVoterJourney') }}
            </cv-header-menu-item>
            <!-- <cv-header-menu-item :to="{ name: 'connect-page' }">
              Get Connected
            </cv-header-menu-item> -->
            <cv-header-menu-item :to="{ name: 'support-page' }">
              {{ $t('appHeaderVoterSupport') }}
            </cv-header-menu-item>
          </cv-header-side-nav-items>
        </cv-side-nav-items>
      </cv-side-nav>
    </template>
    <template v-slot:right-panels>
      <cv-header-panel id="language-panel">
        <cv-switcher>
          <cv-switcher-item v-for="entry in languages" :key="entry.title">
            <cv-switcher-item-link
              @click="changeLocale(entry.language)"
              :selected="entry.language === currentLocale"
            >
              {{ entry.title }}
            </cv-switcher-item-link>
          </cv-switcher-item>
        </cv-switcher>
      </cv-header-panel>
    </template>
  </cv-header>
</template>

<script>
import UserAvatar20 from '@carbon/icons-vue/lib/user--avatar/20';
import Language32 from '@carbon/icons-vue/lib/language/32';
import i18n from '@/plugins/i18n';
import Capitol from '@/assets/icons/capitol.svg';
import { LogoInstagram32 } from '@carbon/icons-vue';

export default {
  name: 'AppHeader',
  components: { UserAvatar20, Language32, Capitol, Instagram: LogoInstagram32 },
  mounted() {
    this.$watch(
      '$i18n.locale',
      (newLocale, oldLocale) => {
        if (newLocale === oldLocale) {
          return;
        }

        setDocumentLang(newLocale);

        setDocumentDirectionPerLocale(newLocale);
      },
      { immediate: true }
    );
  },
  data() {
    return {
      loginEnabled: false,
      languages: [
        { flag: '', language: 'en', title: 'English' },
        { flag: '', language: 'es', title: 'Español' },
        { flag: '', language: 'hi', title: 'हिंदी' },
        { flag: '', language: 'kr', title: '한국어' },
        { flag: '', language: 'sc', title: '汉语' },
        { flag: '', language: 'zh', title: '漢語' },
        { flag: '', language: 'ru', title: 'русский' },
        { flag: '', language: 'ar', title: 'اللغة العربية' },
        { flag: '', language: 'fa', title: ' زبان فارسی' },
        { flag: '', language: 'ja', title: '日本語' },
        { flag: '', language: 'tl', title: 'Tagalog' },
        { flag: '', language: 'vn', title: 'ngôn ngữ tiếng Việt' },
      ],
    };
  },
  computed: {
    currentLocale() {
      return i18n.locale;
    },
    routeName() {
      return this.$route.name;
    },
  },
  methods: {
    changeLocale(locale) {
      localStorage.setItem('locale', locale);
      i18n.locale = locale;
      document.activeElement.blur();
    },
  },
  watch: {
    routeName() {
      document.activeElement.blur();
    },
  },
};

export function setDocumentDirectionPerLocale(locale) {
  document.dir = ['ar', 'fa'].includes(locale) ? 'rtl' : 'ltr';
}

export function setDocumentLang(lang) {
  document.documentElement.lang = lang;
}
</script>

<style lang="scss">
@import './appheader.scss';
.app-header {
  .bx--header__global {
    button:last-child {
      margin-right: 48px;
    }
  }
}
</style>
