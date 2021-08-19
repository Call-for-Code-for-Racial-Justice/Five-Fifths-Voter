<template>
  <div id="app">
    <div>
      <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
        <flag :iso="entry.flag" v-bind:squared="false" /> {{ entry.title }}
      </button>
    </div>
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
        { flag: 'us', language: 'en', title: 'English' },
        { flag: 'es', language: 'es', title: 'Español' },
        { flag: 'in', language: 'hi', title: 'हिंदी' }
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
