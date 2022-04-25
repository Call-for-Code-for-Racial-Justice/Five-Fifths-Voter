const agent = require('superagent');
const PREFIX = location.href.startsWith('http://localhost:') ? '/services' : '';
const DEV_HEADER = PREFIX ? { 'x-authorization': process.env.DEV_HEADER || 'development' } : {};

export default {
  getElections() {
    return agent
      .get(`${PREFIX}/elections`)
      .set(DEV_HEADER)
      .then(response => {
        return response.body;
      })
      .catch(err => {
        err;
        return { elections: [] };
      });
  },

  getDetails(electionId, streetAddress) {
    return agent
      .post(`${PREFIX}/pollingplace`)
      .set(DEV_HEADER)
      .send({ electionId: electionId, address: streetAddress })
      .then(response => {
        return response.body;
      })
      .catch(err => {
        err;
        return { contests: [] };
      });
  }
};
