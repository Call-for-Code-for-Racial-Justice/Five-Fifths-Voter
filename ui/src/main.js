import Vue from 'vue';
import App from './App.vue';
import router from './router';
import CarbonComponentsVue from '@carbon/vue';
Vue.use(CarbonComponentsVue);

import VueAmplitude from 'vue-amplitude';
var isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;
if (isDevelopment)
  Vue.use(VueAmplitude, {
    apiKey: 'none. no analytics for local dev unless you edit this file for testing'
  });
else Vue.use(VueAmplitude, { apiKey: 'ce77e3704c5ecc2461e846f3061022c2' });

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
