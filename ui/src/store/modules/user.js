import badgesApi from '../../api/badges-api';

// initial state
const state = () => ({
  info: {
    email: '',
    name: '',
    sub: '',
    email_verified: false,
    given_name: '',
    family_name: '',
    picture: '',
    locale: 'en'
  },
  badges: []
});

// getters
const getters = {
  canonicalEmail: state => {
    return state.email.toLowerCase();
  }
};

// actions
const actions = {
  async loadBadges({ commit }) {
    commit('clearBadges');

    let docs = await badgesApi.get().catch(err => {
      err;
    });
    if (docs) commit('addBadges', docs);
  },
  async badgeSeen({ commit }, badge) {
    let resp = await badgesApi.seen(badge._id).catch(err => {
      err;
    });
    if (resp) commit('addBadges', { ...badge, seen: true });
  }
};

// mutations
const mutations = {
  setUser(state, data) {
    state.info = data;
  },
  clearUser(state) {
    state.info = {
      email: '',
      name: '',
      sub: '',
      email_verified: false,
      given_name: '',
      family_name: '',
      picture: '',
      locale: 'en'
    };
  },
  clearBadges(state) {
    state.badges.splice(0);
  },
  addBadges(state, data) {
    var update;
    if (Array.isArray(data)) update = data;
    else update = [data];

    update.forEach(doc => {
      let index = state.badges.findIndex(contest => contest._id === doc._id);
      if (index > -1) state.badges.splice(index, 1, doc);
      else state.badges.push(doc);
    });
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
