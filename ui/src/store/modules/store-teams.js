import teamApi from '../../api/team-api';

// initial state
const state = () => ({
  current: {
    display_name: '',
    description: '',
    slug: ''
  }
});

// getters
const getters = {};

// actions
const actions = {
  async loadCurrent({ commit }, teamId) {
    let doc = await teamApi.get(teamId).catch(err => {
      err;
    });
    if (doc) commit('setCurrent', doc);
  }
};

// mutations
const mutations = {
  setCurrent(state, data) {
    state.current = data;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
