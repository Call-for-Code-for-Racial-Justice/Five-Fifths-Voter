// initial state
const state = () => ({
  info: {
    location: null,
    registered: '',
  },
  redirected: false,
});

// getters
const getters = {};

// actions
const actions = {
  async getApproxLocation({ commit, state }) {
    if (state.info.location) return state.info.location;
    commit('loadInfo');
    if (state.info.location) return state.info.location;

    const resp = await fetch('https://ipapi.co/json/');
    const data = await resp.json();
    commit('setLocation', data);
  },
};

// mutations
const mutations = {
  setLocation(state, data) {
    if (data.region !== state.info.location.region) {
      state.info.location = data;
      localStorage.setItem('user', JSON.stringify(state.info));
    }
  },
  setRegistered(state, registered) {
    state.info.registered = registered ? 'midterm-2022' : '';
    localStorage.setItem('user', JSON.stringify(state.info));
  },
  setRedirected(state, redirected) {
    state.redirected = redirected;
  },
  loadInfo(state) {
    try {
      const localString = localStorage.getItem('user');
      if (localString) {
        const localData = JSON.parse(localString);
        state.info = localData;
      }
    } catch (e) {
      console.warn('loadInfo', e);
    }
  },
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations,
};
