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
  }
});

// getters
const getters = {
  canonicalEmail: state => {
    return state.email.toLowerCase();
  }
};

// actions
const actions = {};

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
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
