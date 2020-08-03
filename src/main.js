import Vue from 'vue';
import App from './App.vue';
import router from './router';
import CarbonComponentsVue from '@carbon/vue';
Vue.use(CarbonComponentsVue);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
