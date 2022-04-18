import teamApi from '../../api/team-api';
import accessApi from '../../api/access-api';

// initial state
const state = () => ({
  current: {
    display_name: '',
    description: '',
    slug: ''
  },
  teamAccess: [], // for current team
  access: []
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
  },

  /**
   * Load the access docs for the current team
   */
  async loadTeamAccess({ commit, state }) {
    let docs = await accessApi.getTeam(state.current.slug).catch(err => {
      err;
    });
    if (docs) commit('setTeamAccessDocs', docs);
  },

  /**
   * Load the access docs associated with the current user. The list will have
   * open invitations as well as teams where the user already has access
   * @param {Object} commit
   */
  async loadAccess({ commit }) {
    let docs = await accessApi.get().catch(err => {
      err;
    });
    if (docs) commit('setAccessDocs', docs);
  },

  /**
   * Update an invite for the current logged in user
   * @param {object} payload The the id of an existing access document and acl for the update
   * @returns {Boolean} true if the invitation is update successfully
   */
  async updateInvite({ commit, state }, payload) {
    let doc = state.access.find(access => access.team === payload.id);
    if (doc) {
      let update = { ...doc, status: payload.status };
      let result = await accessApi.updateInvite(update).catch(err => {
        err;
      });
      if (result.ok) commit('setAccessDoc', update);
      return result.ok;
    }
    return false;
  },

  /**
   * Create or update and invitation for the current team
   * @param {*} payload
   * @returns {Boolean} true if the invite is created/updated
   */
  async sendTeamInvite({ state, dispatch }, payload) {
    let doc = state.teamAccess.find(
      access => access.email === payload.email || access._id === payload._id
    );
    if (doc) return dispatch('updateTeamInvite', payload);
    else return dispatch('addTeamInvite', payload);
  },

  /**
   * Add an invitation to the current team. Only admins and editors can invite new users
   * @param {Object} payload - access document to send to the db. See services/api/models/model-access.js
   * @returns {Boolean} true if the invitation is created
   */
  async addTeamInvite({ commit, state }, payload) {
    let invite = {
      ...payload,
      email: payload.email.toLowerCase(),
      team: state.current.slug
    };
    let doc = state.teamAccess.find(
      access => access.email === invite.email || access._id === invite._id
    );
    if (!doc) {
      let result = await accessApi.addInvite(invite).catch(err => {
        err;
      });
      if (result.ok) commit('setTeamAccessDoc', result.doc);
      return result.ok;
    }
    return false;
  },

  /**
   * Update an invitation to the current team. Only admins and editors can invite new users
   * @param {Object} payload - access document to send to the db. See services/api/models/model-access.js
   * @returns {Boolean} true if the invitation is created
   */
  async updateTeamInvite({ commit, state }, payload) {
    let invite = {
      ...payload,
      email: payload.email.toLowerCase(),
      team: state.current.slug
    };
    let doc = state.teamAccess.find(
      access => access.email === invite.email || access._id === invite._id
    );
    if (doc) {
      let update = { ...doc, ...invite };
      let result = await accessApi.updateTeamInvite(update).catch(err => {
        err;
      });
      if (result.ok) commit('setTeamAccessDoc', update);
      return result.ok;
    }
    return false;
  }
};

// mutations
const mutations = {
  setCurrent(state, data) {
    state.current = data;
  },
  setTeamAccessDocs(state, data) {
    state.teamAccess = data;
  },
  setTeamAccessDoc(state, data) {
    let index = state.teamAccess.findIndex(ta => ta._id === data._id);
    if (index > -1) state.teamAccess.splice(index, 1, data);
    else state.teamAccess.push(data);
  },
  setAccessDocs(state, data) {
    state.access = data;
  },
  setAccessDoc(state, data) {
    let index = state.access.findIndex(access => access._id === data._id);
    if (index > -1) state.access.splice(index, 1, data);
    else state.access.push(data);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
