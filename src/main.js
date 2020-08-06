import Vue from 'vue';
import App from './App.vue';
import router from './router';
import CarbonComponentsVue from '@carbon/vue';
import iframeResize from 'iframe-resizer/js/iframeResizer';
Vue.use(CarbonComponentsVue);

Vue.config.productionTip = false;

Vue.directive('resize', {
  bind: function(el, { value = {} }) {
    el.addEventListener('load', () => iframeResize(value, el));
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
