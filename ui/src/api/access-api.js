const agent = require('superagent');
const PREFIX = location.href.startsWith('http://localhost:') ? '/services' : '';
const DEV_HEADER = PREFIX ? { 'x-authorization': process.env.DEV_HEADER || 'development' } : {};

export default {
  /**
   * Get access list
   * @returns {Promise}
   */
  get() {
    return agent
      .get(`${PREFIX}/teams/access`)
      .set(DEV_HEADER)
      .then(response => {
        return response.body;
      })
      .catch(() => {
        return [];
      });
  },

  /**
   * Clear the access document cache by issuing a POST request
   * @returns {Promise}
   */
  clearCache() {
    return agent
      .post(`${PREFIX}/teams/access`)
      .set(DEV_HEADER)
      .send({ cache: 'clear' })
      .then(response => {
        return response.body;
      })
      .catch(() => {
        return [];
      });
  },

  /**
   * Get access docs for given team
   * @param {String} teamSlug
   * @returns {Promise} array of team access docs
   */
  getTeam(teamSlug) {
    return agent
      .get(`${PREFIX}/teams/access/${teamSlug}`)
      .set(DEV_HEADER)
      .then(response => {
        return response.body;
      })
      .catch(() => {
        return [];
      });
  },

  /**
   * Update invite doc
   * @param doc
   * @returns {Promise}
   */
  updateInvite(doc) {
    if (doc.email === 'public')
      return agent
        .put(`${PREFIX}/teams/invite/public/${doc.team}`)
        .set(DEV_HEADER)
        .send({ status: doc.status })
        .then(response => {
          // clear browser cache for access docs
          this.clearCache();
          return response;
        })
        .then(response => {
          return response.body;
        })
        .catch(() => {
          return { ok: false };
        });
    else
      return agent
        .put(`${PREFIX}/teams/invite/update/${doc.team}`)
        .set(DEV_HEADER)
        .send({ status: doc.status })
        .then(response => {
          return response.body;
        })
        .catch(() => {
          return { ok: false };
        });
  },

  /**
   * Add invitation to team
   * @param doc
   * @returns {Promise}
   */
  addInvite(doc) {
    return agent
      .post(`${PREFIX}/teams/access/${doc.team}`)
      .set(DEV_HEADER)
      .send(doc)
      .then(response => {
        return response.body;
      })
      .catch(() => {
        return { ok: false };
      });
  },

  updateTeamInvite(doc) {
    return agent
      .put(`${PREFIX}/teams/access/${doc.team}/${doc._id}`)
      .set(DEV_HEADER)
      .send(doc)
      .then(response => {
        return response.body;
      })
      .catch(() => {
        return { ok: false };
      });
  }
};
