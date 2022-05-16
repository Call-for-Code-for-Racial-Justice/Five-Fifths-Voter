import readableId from '../../api/base58id';
import shareApi from '../../api/share-api';
import lodash from 'lodash';

// initial state
const state = () => ({
  shared: {
    _id: '',
    _rev: '',
    doc_type: '',
    date_created: '',
    date_modified: '',
    local_data: {} // Local browser data to be shared
  }
});

// getters
const getters = {};

// actions
const actions = {
  async applyId({ commit }, sharedId) {
    let doc = await shareApi.get(sharedId);
    if (doc) commit('applyShared', doc);
  },
  async shareId({ state, commit }) {
    let doc = lodash.cloneDeep(state.shared);
    if (!doc._id) {
      doc._id = readableId(5);
      delete doc._rev;
    }
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === 'shared_doc' || key === 'preferredLanguage' || key.startsWith('amplitude'))
        continue;
      try {
        doc.local_data[key] = JSON.parse(localStorage.getItem(key));
      } catch (e) {
        // ignore non-JSON data
      }
    }

    let resp = await shareApi.create(doc);
    if (resp.ok) commit('setShared', resp.doc);
  }
};
// mutations
const mutations = {
  setShared(state, data) {
    state.shared = data;
    state.shared.local_data = {};
    localStorage.setItem('shared_doc', JSON.stringify(state.shared));
  },
  applyShared(state, data) {
    for (let key of Object.keys(data.local_data)) {
      try {
        localStorage.setItem(key, JSON.stringify(data.local_data[key]));
      } catch (error) {
        // ignore
      }
    }
  },
  loadShared(state) {
    const doc = localStorage.getItem('shared_doc');
    if (doc) state.shared = JSON.parse(doc);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
