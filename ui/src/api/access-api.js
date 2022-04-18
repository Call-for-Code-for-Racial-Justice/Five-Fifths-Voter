const agent = require('superagent');
const PREFIX = location.href.startsWith('http://localhost:') ? '/services' : '';
const DEV_HEADER = PREFIX ? { 'x-authorization': process.env.DEV_HEADER || 'development' } : {};

export default {
  get() {
    return agent
      .get(`${PREFIX}/teams/access`)
      .set(DEV_HEADER)
      .then(response => {
        return response.body;
      })
      .catch(err => {
        err;
        return [];
      });
  },

  /**
   * Get access docs for given team
   * @param {String} teamSlug
   * @returns {Array} array of team access docs
   */
  getTeam(teamSlug) {
    return agent
      .get(`${PREFIX}/teams/access/${teamSlug}`)
      .set(DEV_HEADER)
      .then(response => {
        return response.body;
      })
      .catch(err => {
        err;
        return [];
      });
  },

  updateInvite(doc) {
    if (doc.email === 'public')
      return agent
        .put(`${PREFIX}/teams/invite/public/${doc.team}`)
        .set(DEV_HEADER)
        .send({ status: doc.status })
        .then(response => {
          return response.body;
        })
        .catch(err => {
          err;
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
        .catch(err => {
          err;
          return { ok: false };
        });
  },

  addInvite(doc) {
    return agent
      .post(`${PREFIX}/teams/access/${doc.team}`)
      .set(DEV_HEADER)
      .send(doc)
      .then(response => {
        return response.body;
      })
      .catch(err => {
        err;
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
      .catch(err => {
        err;
        return { ok: false };
      });
  }
};
