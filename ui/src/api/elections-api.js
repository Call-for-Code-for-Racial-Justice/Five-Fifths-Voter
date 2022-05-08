const agent = require('superagent');
const PREFIX = location.href.startsWith('http://localhost:') ? '/services' : '';
const DEV_HEADER = PREFIX ? { 'x-authorization': process.env.DEV_HEADER || 'development' } : {};

export default {
  create(doc) {
    return agent
      .post(`${PREFIX}/teams/election/${doc.team}`)
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

  get(teamId) {
    return agent
      .get(`${PREFIX}/teams/election/${teamId}`)
      .set(DEV_HEADER)
      .then(response => {
        return response.body;
      })
      .catch(err => {
        err;
        return { ok: false };
      });
  },

  delete(teamId, electionId) {
    return agent
      .delete(`${PREFIX}/teams/election/${teamId}/${electionId}`)
      .set(DEV_HEADER)
      .then(response => {
        return response.body;
      })
      .catch(err => {
        err;
        return { ok: false };
      });
  },

  // Contests

  addContests(teamId, doc) {
    return agent
      .post(`${PREFIX}/teams/contests/${teamId}`)
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

  getContests(teamId) {
    return agent
      .get(`${PREFIX}/teams/contests/${teamId}`)
      .set(DEV_HEADER)
      .then(response => {
        return response.body;
      })
      .catch(err => {
        err;
        return { ok: false };
      });
  },

  deleteContest(teamId, doc_id) {
    return agent
      .delete(`${PREFIX}/teams/contests/${teamId}/${doc_id}`)
      .set(DEV_HEADER)
      .then(response => {
        return response.body;
      })
      .catch(err => {
        err;
        return { ok: false };
      });
  },

  /**
   * Update existing context document
   * @param {String} teamId
   * @param {Object} doc
   * @returns
   */
  updateContest(teamId, doc) {
    return agent
      .put(`${PREFIX}/teams/contests/${teamId}/${doc._id}`)
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

  /**
   * Add another contest to an existing context document
   * @param {String} teamId
   * @param {Object} doc a contest document
   * @param {object} info a new items for the contests list
   * @returns
   */
  addContestInfo(teamId, doc, info) {
    return agent
      .patch(`${PREFIX}/teams/contests/${teamId}/${doc._id}`)
      .set(DEV_HEADER)
      .send(info)
      .then(response => {
        return response.body;
      })
      .catch(err => {
        err;
        return { ok: false };
      });
  }
};
