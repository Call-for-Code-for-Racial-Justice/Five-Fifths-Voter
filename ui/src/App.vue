<template>
  <div id="app">
    <!-- <div>
      <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
        <flag :iso="entry.flag" v-bind:squared="false" /> {{ entry.title }}
      </button>
    </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
@import './styles/carbon';
</style>

<script>
import i18n from '@/plugins/i18n';
export default {
  name: 'App',
  data() {
    return {
      languages: [
        { flag: '', language: 'en', title: 'English' },
        { flag: '', language: 'es', title: 'Español' },
        { flag: '', language: 'hi', title: 'हिंदी' },
        { flag: '', language: 'kr', title: 'Korean' },
        { flag: '', language: 'sc', title: 'Simplified' },
        { flag: '', language: 'zh', title: 'Traditional' },
        { flag: '', language: 'ru', title: 'Russian' },
        { flag: '', language: 'ar', title: 'Arabic' },
        { flag: '', language: 'fa', title: 'Farsi' },
        { flag: '', language: 'ja', title: 'Japanese' },
        { flag: '', language: 'tl', title: 'Tagalog' },
        { flag: '', language: 'vn', title: 'Vietnamese' }
      ]
    };
  },
  methods: {
    changeLocale(locale) {
      i18n.locale = locale;
    }
  }
};
</script>
