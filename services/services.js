const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const port = 8080;
const app = express();
app.use(bodyParser.json());
const about = {
  version: '1.0.0',
  endpoints: [
    'earlyvoting/states/',
    'earlyvoting/regions/',
    'earlyvoting/locations/',
  ],
};

const states = require('./data/earlyvoting/states');

const regions = require('./data/earlyvoting/GA/regions');

const locations = require('./data/earlyvoting/GA/mocklocations');

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
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
    res.send(regions);
  } else {
    console.log(`State not found.`);
    res.status(404).send();
  }
});

app.get('/earlyvoting/locations/', (req, res) => {
  // console.log('Returning locations', req.query);
  let stateid = req.query.stateid;
  let locid = req.query.locid;
  const foundLocation = locations.list.find((loc) => loc.place === locid);
  if (foundLocation) {
    res.send(foundLocation);
  } else {
    console.log(`location not found.`);
    res.status(404).send();
  }
});

console.log(`Service listening on port ${port}`);
app.listen(port);
