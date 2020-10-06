const { JSDOM } = require('jsdom');
const axios = require('axios');
const params = require('../../data/earlyVoting/GA/scrapeParams');
const cache = require('../../data/cacheDb');

exports.regions = function (req, res) {
  res.status(200).send({ list: Object.keys(params) });
};

exports.locations = async (req, res) => {
  try {
    let stateid = req.query.stateid;
    let locid = req.query.locid.toUpperCase();
    let getParams = params[locid];

    // console.log(stateid, locid, getParams);

    // Only GA in the module. If its not GA then probably there is an error in
    // earlier logic.
    if (stateid !== 'GA') return res.status(404).send();

    // Every county should be in the list
    if (!getParams) return res.status(404).send();

    // find this info in the cache
    const db = cache.db();
    const collection = db.collection('ga_early');
    collection
      .findOne({ place: locid })
      .then((result) => {
        var retrieved = Date.now();
        var pollingLocs = result;
        var cacheHit = result ? true : false;
        var cacheIsStale =
          !pollingLocs || retrieved - pollingLocs.retrieved > cache.staleTime;
        if (pollingLocs) {
          console.log(
            `${locid} cache is ${
              (retrieved - pollingLocs.retrieved) / 1000
            } seconds old. Stale: ${cacheIsStale}`
          );
        }

        if (cacheIsStale) {
          const scrapeURL =
            'https://elections.sos.ga.gov/Elections/advancedVotingInfoResult.do';
          axios
            .get(scrapeURL, { params: getParams })
            .then((response) => {
              const dom = new JSDOM(response.data);
              const document = dom.window.document;
              var pollTable = document.querySelector('#Table1');
              var str = pollTable.outerHTML.replace(/[\n\r]+|[\s]{2,}/g, '');
              pollingLocs = {
                state: stateid,
                place: locid,
                scrapeURL: scrapeURL,
                dom: str,
                retrieved: retrieved,
              };

              if (cacheHit) {
                collection
                  .findOneAndReplace({ place: locid }, pollingLocs)
                  .then((result) => {
                    console.log(`${locid} cache update`);
                    res.status(200).send(pollingLocs);
                  });
              } else {
                collection.insertOne(pollingLocs).then((result) => {
                  console.log(`${locid} added to cache`);
                  res.status(200).send(pollingLocs);
                });
              }
            })
            .catch((reason) => {
              console.log('Error connecting to scrape URL');
            });
        } else {
          res.status(200).send(pollingLocs);
        }
      })
      .catch((reason) => {
        console.error('Cache DB error');
        return res.status(404).send();
      });
  } catch (error) {
    return res.status(404).send();
  }
};
