const https = require('https');
const axios = require('axios');
const apiKey = process.env.NODE_GOOGLE_CIVIC_API_KEY;
const currentElectionId = 7000;

exports.pollingPlace = function (req, res) {
  try {
    let voterAddress = req.body.data.address;
    getParams = {
      key: apiKey,
      electionId: currentElectionId,
      address: voterAddress,
    };
    axios
      .get('https://www.googleapis.com/civicinfo/v2/voterinfo', {
        params: getParams,
      })
      .then((response) => {
        console.log('success');
        res.send(response.data);
      })
      .catch((reason) => {
        console.error('Civic error', reason);
        return res.status(503).send();
      });
  } catch (error) {
    res.status(400).send();
  }
};
