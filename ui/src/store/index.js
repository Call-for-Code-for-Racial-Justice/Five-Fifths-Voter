import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import { createLogger } from 'vuex';
Vue.use(Vuex);

const debug = process.env.VUE_APP_VUEX_DEBUG === 'true';

export default new Vuex.Store({
  modules: { user },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
