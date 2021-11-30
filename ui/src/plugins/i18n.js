import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en.json';
import es from './es.json';
import hi from './hi.json';
import kr from './kr.json';
import ru from './ru.json';
import sc from './zh_Hans_CN.json';
import zh from './zh_Hans_TW.json';
import ar from './ar';
import vn from './vn';
import fa from './fa';
import ja from './ja';
import tl from './tl';

Vue.use(VueI18n);

const messages = {
  en: en,
  es: es,
  hi: hi,
  kr: kr,
  ru: ru,
  sc: sc,
  zh: zh,
  ar: ar,
  vn: vn,
  fa: fa,
  ja: ja,
  tl: tl,
};

export default new VueI18n({
  locale: navigator.language || 'en',
  fallbackLocale: 'en',
  messages,
});
