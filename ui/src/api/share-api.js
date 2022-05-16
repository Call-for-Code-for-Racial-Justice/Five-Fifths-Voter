const agent = require('superagent');
const PREFIX = location.href.startsWith('http://localhost:') ? '/services' : '';
const DEV_HEADER = PREFIX ? { 'x-authorization': process.env.DEV_HEADER || 'development' } : {};

export default {
  create(doc) {
    return agent
      .post(`${PREFIX}/share/`)
      .set(DEV_HEADER)
      .send(doc)
      .then(response => {
        return response.body;
      })
      .catch(err => {
        return { ok: false, err };
      });
  },

  /**
   * Load a team document
   * @param sharedId
   * @returns {Promise}
   */
  get(sharedId) {
    return agent
      .get(`${PREFIX}/share/${sharedId}`)
      .set(DEV_HEADER)
      .then(response => {
        return response.body;
      })
      .catch(() => {
        return { ok: false };
      });
  },

  delete(sharedId) {
    return agent
      .delete(`${PREFIX}/share/${sharedId}`)
      .set(DEV_HEADER)
      .then(response => {
        return response.body;
      })
      .catch(() => {
        return { ok: false };
      });
  }
};
