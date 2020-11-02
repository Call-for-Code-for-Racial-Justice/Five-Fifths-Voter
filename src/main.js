import Vue from 'vue';
import App from './App.vue';
import router from './router';
import CarbonComponentsVue from '@carbon/vue';
Vue.use(CarbonComponentsVue);

import VueAmplitude from 'vue-amplitude';
Vue.use(VueAmplitude, { apiKey: 'ce77e3704c5ecc2461e846f3061022c2' });

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
