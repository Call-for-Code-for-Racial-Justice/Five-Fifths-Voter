const agent = require('superagent');
const PREFIX = location.href.startsWith('http://localhost:') ? '/services' : '';
const DEV_HEADER = PREFIX ? { 'x-authorization': process.env.DEV_HEADER || 'development' } : {};

export default {
  get() {
    return agent
      .get(`${PREFIX}/badges`)
      .set(DEV_HEADER)
      .then(response => {
        return response.body;
      })
      .catch(err => {
        err;
        return { ok: false };
      });
  },

  seen(id) {
    return agent
      .put(`${PREFIX}/badges/seen/${id}`)
      .set(DEV_HEADER)
      .then(response => {
        response;
        return true;
      })
      .catch(err => {
        err;
        return false;
      });
  },

  madeList() {
    return agent
      .post(`${PREFIX}/badges/grant/madeList`)
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
