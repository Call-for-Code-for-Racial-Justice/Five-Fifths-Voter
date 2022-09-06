import Vue from 'vue';
// initial state
/**
 * @typedef locationInfo
 * @property {!string} region
 * @property {!string} region_code
 */

/**
 * @typedef userDetails
 * @property {?locationInfo} location
 * @property {!string} registered
 * @property {!string} requested_early
 */

/**
 * @typedef userInfo
 * @property {userDetails} info
 * @property {boolean} redirected
 */
const state = () => ({
  info: {
    location: null,
    registered: '',
    requested_early: '', // Absentee ballot requested and plan to vote early are the same logic
  },
  redirected: false,
});

// getters
const getters = {};

// actions
const actions = {
  async getApproxLocation({ commit, state }) {
    // sample data
    // {
    //     "ip": "10.x.x.x",
    //     "network": "10.x.x.0/23",
    //     "version": "IPv4",
    //     "city": "Liberty",
    //     "region": "South Carolina",
    //     "region_code": "SC",
    //     "country": "US",
    //     "country_name": "United States",
    //     "country_code": "US",
    //     "country_code_iso3": "USA",
    //     "country_capital": "Washington",
    //     "country_tld": ".us",
    //     "continent_code": "NA",
    //     "in_eu": false,
    //     "postal": "29657",
    //     "latitude": 34.7846,
    //     "longitude": -82.6942,
    //     "timezone": "America/New_York",
    //     "utc_offset": "-0400",
    //     "country_calling_code": "+1",
    //     "currency": "USD",
    //     "currency_name": "Dollar",
    //     "languages": "en-US,es-US,haw,fr",
    //     "country_area": 9629091.0,
    //     "country_population": 327167434,
    //     "asn": "AS20115",
    //     "org": "CHARTER-20115"
    // }
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
    if (data.region !== state.info?.location?.region) {
      state.info.location = data;
      localStorage.setItem('user', JSON.stringify(state.info));
    }
  },
  setRegistered(state, registered) {
    Vue.set(state.info, 'registered', registered ? 'midterm-2022' : '');
    localStorage.setItem('user', JSON.stringify(state.info));
  },
  setRequested(state, requested) {
    Vue.set(state.info, 'requested_early', requested ? 'midterm-2022' : '');
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
