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
        var cacheIsStale = !pollingLocs || retrieved - pollingLocs.retrieved > cache.staleTime;
        if (pollingLocs) {
          console.log(
            `${locid} cache is ${
              (retrieved - pollingLocs.retrieved) / 1000
            } seconds old. Stale: ${cacheIsStale}`
          );
        }

        if (cacheIsStale) {
          const scrapeURL = 'https://elections.sos.ga.gov/Elections/advancedVotingInfoResult.do';
          axios
            .get(scrapeURL, { params: getParams })
            .then((response) => {
              const dom = new JSDOM(response.data);
              const document = dom.window.document;
              var pollTable = document.querySelector('#Table1');

              var addresses = [];

              // try to parse out the addresses fom the table - danger
              try {
                var inner = document.querySelector('#Table1 >  tbody > tr > td > table');
                if (inner) {
                  var rows = inner.rows;
                  var addressStart = false;
                  var address = '';
                  for (var r = 0; r < rows.length; r++) {
                    cells = rows[r].cells;
                    if (cells && cells.length == 2) {
                      var label = cells[0].textContent.trim();
                      if (addressStart && label === '') {
                        address = address + ' ' + cells[1].textContent.trim();
                        console.log('address:', address);
                      } else if (addressStart && label !== '') {
                        addressStart = false;
                        addresses.push({ address: address });
                      } else if (label == 'Address:') {
                        addressStart = true;
                        address = cells[1].textContent.trim();
                        console.log('address:', address);
                      }
                    }
                  }
                }
              } catch (error) {
                console.error('could not get addresses from table');
              }

              var str = pollTable.outerHTML.replace(/[\n\r]+|[\s]{2,}/g, '');
              pollingLocs = {
                state: stateid,
                place: locid,
                scrapeURL: scrapeURL,
                dom: str,
                addresses: addresses,
                retrieved: retrieved,
              };

              if (cacheHit) {
                collection.findOneAndReplace({ place: locid }, pollingLocs).then((result) => {
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
              res.status(503).send();
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
