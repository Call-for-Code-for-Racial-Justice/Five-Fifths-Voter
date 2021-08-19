import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en.json';
import es from './es.json';
import hi from './hi.json';

Vue.use(VueI18n);

const messages = {
  en: en,
  es: es,
  hi: hi
};

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
});
