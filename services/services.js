const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const lodash = require('lodash');
require('dotenv').config();

var isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;

const port = 8080;
const app = express();
app.use(bodyParser.json());
const about = {
  version: '1.0.0',
  endpoints: [
    'earlyvoting/states/',
    'earlyvoting/regions/',
    'earlyvoting/locations/',
    'ballotreturn/states/',
    'ballotreturn/regions/',
    'ballotreturn/locations/',
    'twitter/chatter',
  ],
};

const states = require('./data/earlyVoting/states');

const states2 = require('./data/ballotreturn/states');

const regions2 = require('./data/ballotreturn/GA/regions');

const locations2 = require('./data/ballotreturn/GA/mocklocations');

const mock_twitter = require('./data/mock/mock_twitter');

const earlyVotingGa = require('./routes/earlyvoting/ga');
const civic = require('./routes/civic');

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.append('Content-Type', 'application/json');
  next();
});

app.get('/services', (req, res) => {
  // console.log('Returning version');
  res.send(about);
});

app.get('/earlyvoting/states/', (req, res) => {
  // console.log('Returning states');
  res.send(states);
});

app.get('/earlyvoting/regions/', (req, res) => {
  // console.log('Returning regions', req.query);
  let stateid = req.query.stateid;
  const foundRegions = stateid === 'GA';
  if (foundRegions) {
    return earlyVotingGa.regions(req, res);
  } else {
    console.log(`State not found.`);
    res.status(404).send();
  }
});

app.get('/earlyvoting/locations/', (req, res) => {
  // console.log('Returning locations', req.query);
  let stateid = req.query.stateid;
  let locid = req.query.locid.toUpperCase();
  if (stateid == 'GA') return earlyVotingGa.locations(req, res);
  else return res.status(404).send();
});

app.get('/ballotreturn/states/', (req, res) => {
  // console.log('Returning states');
  res.send(states2);
});

app.get('/ballotreturn/regions/', (req, res) => {
  // console.log('Returning regions', req.query);
  let stateid = req.query.stateid;
  const foundRegions = stateid === 'GA';
  if (foundRegions) {
    res.send(regions2);
  } else {
    console.log(`State not found.`);
    res.status(404).send();
  }
});

app.get('/ballotreturn/locations/', (req, res) => {
  // console.log('Returning locations', req.query);
  let stateid = req.query.stateid;
  let locid = req.query.locid.toUpperCase();
  const foundLocation = locations2.list.find((loc) => loc.place === locid);
  if (foundLocation) {
    res.send(foundLocation);
  }
});

app.post('/pollingplace/', civic.pollingPlace);

// non-public API
// app.get('/postcode/', (req, res) => {
//   // console.log('Returning locations', req.query);
//   let postcode = req.query.id;
//   const foundData = lodash.find(postcodes, { postal_code: postcode });
//   if (foundData) {
//     let counties = [foundData.admin_name2];
//     if (foundData.admin_name3 !== '') counties.push(foundData.admin_name3);
//     const resp_data = {
//       country_code: foundData.country_code,
//       place_name: foundData.place_name,
//       state: foundData.admin_code1,
//       county: counties,
//     };
//     res.send(resp_data);
//   } else {
//     console.log(`location not found.`);
//     res.status(404).send();
//   }
// });

// Warn about not getting Twitter results
const useTwitterMock =
  isDevelopment &&
  (!process.env.NODE_TWITTER_API_KEY ||
    !process.env.NODE_TWITTER_API_SECRET_KEY ||
    !process.env.NODE_TWITTER_ACCESS_TOKEN ||
    !process.env.NODE_TWITTER_ACCESS_TOKEN_SECRET ||
    !process.env.NODE_TA_API_KEY ||
    !process.env.NODE_TA_API_URL ||
    !process.env.NODE_NLU_API_KEY ||
    !process.env.NODE_NLU_API_URL);

if (useTwitterMock) {
  console.error('\x1b[31m%s\x1b[0m', 'Twitter Access not configured');
  console.log(
    '\x1b[31m%s\x1b[0m',
    'All Twitter requests from the social page will return mock data from BrackObama'
  );
  console.log(
    '\x1b[33m%s\x1b[0m',
    'If you are working locally read the services/README.md file'
  );
  console.log(
    '\x1b[33m%s\x1b[0m',
    'If you need live Twitter data, you need to create twitter and IBM cloud access keys but both are free'
  );
}

app.get('/twitter/chatter/', (req, res) => {
  if (useTwitterMock) {
    res.send(mock_twitter);
  } else {
    let screenname = req.query.screenname;
    //console.log('screenname', screenname);

    const { spawn } = require('child_process');
    const chatter = spawn('python3', [
      'twitter/Embrace_Challenge.py',
      screenname,
    ]);
    chatter.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      if (code !== 0) {
        res.status(404).send();
      }
    });

    const chunks = [];

    chatter.stdout.on('data', function (chunk) {
      chunks.push(chunk);
    });

    chatter.stdout.on('data', (data) => {
      const resp_data = Buffer.concat(chunks);
      res.send(resp_data);
    });
  }
});

console.log(`Service listening on port ${port}`);
app.listen(port);
