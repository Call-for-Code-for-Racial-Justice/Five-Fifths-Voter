const agent = require('superagent');
const PREFIX = location.href.startsWith('http://localhost:') ? '/services' : '';
const DEV_HEADER = PREFIX ? { 'x-authorization': process.env.DEV_HEADER || 'development' } : {};
import accessApi from './access-api';

export default {
  create(doc) {
    return agent
      .post(`${PREFIX}/team/`)
      .set(DEV_HEADER)
      .send(doc)
      .then(async response => {
        // clear browser cache for access docs
        await accessApi.clearCache();
        return response;
      })
      .then(response => {
        return response.body;
      })
      .catch(err => {
        return { ok: false, err };
      });
  },

  /**
   * Load a team document
   * @param teamId
   * @returns {Promise}
   */
  get(teamId) {
    return agent
      .get(`${PREFIX}/team/${teamId}`)
      .set(DEV_HEADER)
      .then(response => {
        return response.body;
      })
      .catch(() => {
        return { ok: false };
      });
  },

  isAvailable(path) {
    return agent
      .head(`${PREFIX}/team/${path}`)
      .ok(res => res.status === 404)
      .set(DEV_HEADER)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
};
