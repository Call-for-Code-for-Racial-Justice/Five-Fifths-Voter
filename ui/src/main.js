import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import CarbonComponentsVue from '@carbon/vue';
import i18n from '@/plugins/i18n';
import FlagIcon from 'vue-flag-icon';

Vue.use(FlagIcon);

Vue.use(CarbonComponentsVue);

import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
