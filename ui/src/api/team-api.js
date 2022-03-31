const agent = require('superagent');
const PREFIX = location.href.startsWith('http://localhost:') ? '/services' : '';
const DEV_HEADER = PREFIX ? { 'x-authorization': process.env.DEV_HEADER || 'development' } : {};

export default {
  create(doc) {
    return agent
      .post(`${PREFIX}/team/`)
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
      .get(`${PREFIX}/team/${teamId}`)
      .set(DEV_HEADER)
      .then(response => {
        return response.body;
      })
      .catch(err => {
        err;
        return { ok: false };
      });
  },

  isAvailable(path) {
    return agent
      .head(`${PREFIX}/team/${path}`)
      .ok(res => res.status === 404)
      .set(DEV_HEADER)
      .then(response => {
        response;
        return true;
      })
      .catch(err => {
        err;
        return false;
      });
  }
};
