<template>
  <cv-header :aria-label="$t('ariaHeader')">
    <cv-header-menu-button :aria-label="$t('ariaHeaderMenu')" aria-controls="side-nav" />
    <cv-skip-to-content href="#main-content">
      Skip to content
    </cv-skip-to-content>
    <cv-header-name :to="{ name: 'landing-page' }" prefix="">
      Five Fifths Voter
    </cv-header-name>
    <cv-header-nav :aria-label="$t('ariaMainMenu')">
      <cv-header-menu-item :to="{ name: 'why-page' }">
        {{ $t('appHeaderWhyVote') }}
      </cv-header-menu-item>
      <cv-header-menu-item :to="{ name: 'journey-page' }">
        {{ $t('appHeaderVoterJourney') }}
      </cv-header-menu-item>
      <!-- <cv-header-menu-item :to="{ name: 'connect-page' }">
        {{ $t('appHeaderGetConnected') }}
      </cv-header-menu-item> -->
      <cv-header-menu-item :to="{ name: 'support-page' }">
        {{ $t('appHeaderVoterSupport') }}
      </cv-header-menu-item>
    </cv-header-nav>
    <template v-slot:header-global>
      <cv-header-global-action :aria-label="$t('ariaUser')">
        <UserAvatar20 />
      </cv-header-global-action>
      <cv-overflow-menu :flip-menu="ltr" :label="$t('ariaLanguageSetting')">
        <template slot="trigger">
          <Language32 />
        </template>
        <cv-overflow-menu-item
          v-for="entry in languages"
          :key="entry.title"
          @click="changeLocale(entry.language)"
        >
          {{ entry.title }}
        </cv-overflow-menu-item>
      </cv-overflow-menu>
    </template>
    <template v-slot:left-panels>
      <cv-side-nav id="side-nav" fixed>
        <cv-side-nav-items>
          <cv-header-side-nav-items>
            <cv-header-menu-item :to="{ name: 'why-page' }">
              Why Vote
            </cv-header-menu-item>
            <cv-header-menu-item :to="{ name: 'journey-page' }">
              Voter Journey
            </cv-header-menu-item>
            <!-- <cv-header-menu-item :to="{ name: 'connect-page' }">
              Get Connected
            </cv-header-menu-item> -->
            <cv-header-menu-item :to="{ name: 'support-page' }">
              Voter Support
            </cv-header-menu-item>
          </cv-header-side-nav-items>
        </cv-side-nav-items>
      </cv-side-nav>
    </template>
  </cv-header>
</template>

<script>
import UserAvatar20 from '@carbon/icons-vue/lib/user--avatar/20';
import Language32 from '@carbon/icons-vue/lib/language/32';
import i18n from '@/plugins/i18n';

export default {
  name: 'AppHeader',
  components: { UserAvatar20, Language32 },
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
      ltr: true,
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
        { flag: '', language: 'vn', title: 'ngôn ngữ tiếng Việt' }
      ]
    };
  },
  methods: {
    changeLocale(locale) {
      i18n.locale = locale;
      this.ltr = !['ar', 'fa'].includes(locale);
    }
  }
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
</style>
