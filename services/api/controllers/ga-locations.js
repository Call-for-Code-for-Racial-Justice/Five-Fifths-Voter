const cache = require("../services/database")
const axios = require("axios")
const { JSDOM } = require("jsdom")
const params = require("../../data/earlyVoting/GA/scrapeParams")
const STALE_TIME = process.env.STALE_TIME || 86400000 // 24 hours in milliseconds

function geocodeAddress(county, address) {
  try {
    const knownLocations = require("../../data/earlyVoting/GA/knownLocations/" + county + ".json")
    var place = address
      .trim()
      .toUpperCase()
      .replace(/[.,]*/gm, "")
      .replace(/[ ]{2,}/gm, " ")
    var loc = knownLocations[place]
    if (loc) return loc
    else {
      console.error("Unknown location in", county, "county GA:", address)
      return { lat: undefined, lng: undefined }
    }
  } catch (error) {
    console.error(error)
    return { lat: undefined, lng: undefined }
  }
}

/**
 * Return a promise that will deliver local early voting sites. The data will be amended to whatever is passed in the amend var.
 * @param {*} locId - must be a valid county in GA
 * @param {*} amend - attach the data to this object
 * see exports.locations below for how to call this directly from the API
 */
locationData = exports.locationData = (locId, amend) => {
  try {
    locId = locId.toUpperCase()
    let getParams = params[locId]

    // Every county should be in the list
    if (!getParams) throw { ok: false, message: "County not found: " + locId }

    var locationData = {}

    // find this info in the cache
    var database = cache.db.use("webscrapecache")

    return database
      .view("earlyVotingView", "early-voting-view", {
        key: "GA/" + locId,
        include_docs: true,
      })
      .then((response) => {
        if (response.rows.length != 1) {
          console.error("database error. Data not in expected format.", response.rows)
          return {}
        }
        return response.rows[0].doc
      })
      .then((result) => {
        /**
         * Step 1. Get data for this location from the DB
         */
        var retrieved = Date.now()
        var pollingLocs = result
        var cacheHit = result ? true : false
        var cacheIsStale = !pollingLocs || retrieved - pollingLocs.retrieved > STALE_TIME
        //var cacheIsStale = true;
        if (pollingLocs) {
          console.log(
            `${locId} cache is ${
              (retrieved - pollingLocs.retrieved) / 1000
            } seconds old. Stale: ${cacheIsStale}`
          )
        }

        locationData.cacheData = {
          type: "cache",
          cacheHit: cacheHit,
          cacheIsStale: cacheIsStale,
          pollingLocs: pollingLocs,
        }
        return locationData.cacheData
      })
      .then((cacheData) => {
        /**
         * Step 2. If the data from the db is not stale - use it. Otherwise, update it form the source
         */
        if (!cacheData.cacheIsStale) return cacheData

        const scrapeURL = "https://elections.sos.ga.gov/Elections/advancedVotingInfoResult.do"
        locationData.cacheData.pollingLocs.retrieved = Date.now()
        locationData.cacheData.pollingLocs.earlyVoteSites = []

        return axios.get(scrapeURL, { params: getParams })
      })
      .then((data) => {
        /**
         * Step 3. This is either cache data if the cache is not stale or its html data from the scrape url
         */
        if (data.type === "cache") return data // this is fresh (not stale) cache data so use it

        // Otherwise, process the HTML response from the source
        var response = data

        const dom = new JSDOM(response.data)
        const document = dom.window.document

        var addresses = []
        var electionSet = new Set()

        // try to parse out the addresses fom the table - danger
        try {
          var inner = document.querySelector("#Table1 >  tbody > tr > td > table")
          if (inner) {
            locationData
            var rows = inner.rows
            var addressStart = false
            var finishAddress = false
            var address = ""
            var locationName = ""
            var electionName = ""
            for (var r = 0; r < rows.length; r++) {
              cells = rows[r].cells
              finishAddress = r + 1 === rows.length
              if (cells && cells.length == 2) {
                var label = cells[0].textContent.trim()

                if (label === "Election:") {
                  finishAddress = true
                  electionName = cells[1].textContent.trim()
                  electionSet.add(electionName)
                } else if (label == "Poll Place Name:") {
                  finishAddress = true
                  locationName = cells[1].textContent.trim()
                  if (locationName.startsWith("AA- ")) {
                    locationName = locationName.slice(4)
                  }
                  if (locationName.startsWith("AA - ")) {
                    locationName = locationName.slice(5)
                  }
                } else if (label == "Address:") {
                  finishAddress = false
                  addressStart = true
                  address = cells[1].textContent.trim()
                } else if (addressStart && label === "") {
                  address = address + " " + cells[1].textContent.trim()
                } else if (addressStart && label !== "") {
                  finishAddress = true
                }
              }
              if (finishAddress && address) {
                addressStart = false
                finishAddress = false
                var latLng = geocodeAddress(locId, address)
                addresses.push({
                  address: {
                    locationName: locationName,
                    line1: address,
                    electionName: electionName,
                  },
                  latitude: latLng.lat,
                  longitude: latLng.lng,
                  sources: [
                    {
                      name: "Five Fifths Voter",
                      official: true,
                    },
                  ],
                })
                address = ""
                locationName = ""
                electionName = ""
              }
            }
            var elections = []
            electionSet.forEach((element) => {
              elections.push(element)
            })
            locationData.cacheData.pollingLocs.earlyVoteSites = addresses
            locationData.cacheData.pollingLocs.elections = elections
            return locationData.cacheData
          }
        } catch (error) {
          console.error("could not get addresses from table")
        }
      })
      .then((cacheData) => {
        /**
         * Step 4. We have data!
         */
        if (!cacheData.cacheIsStale) return cacheData // If the data is fresh (not stale) use it

        // Otherwise
        console.log("updating cache db", {
          state: locationData.cacheData.pollingLocs.state,
          place: locationData.cacheData.pollingLocs.place,
        })
        var dbKey = { place: locId }
        var dbDoc = locationData.cacheData.pollingLocs

        console.log(`${locId} cache update`)
        return database.insert(dbDoc)
      })
      .then((cacheDbUpdate) => {
        /**
         * Step 5. Fresh data is guaranteed to be in locationData.cacheData.pollingLocs
         */

        // The type of data in cacheDbUpdate is either a db result from findOneAndReplace/insertOne or it's the cache data
        // If you are curious you can print it here
        // console.log(cacheDbUpdate);
        let { earlyVoteSites, ...ff } = locationData.cacheData.pollingLocs
        var fixup = {
          fivefifthsdata: {
            ...ff,
            earlyVoteSitesProvided: true,
          },
          earlyVoteSites: earlyVoteSites,
        }
        return { ...amend, ...fixup }
      })
      .catch((reason) => {
        console.error("Cache DB error", reason)
        throw { ok: false, message: reason }
      })
  } catch (error) {
    throw { ok: false, message: error }
  }
}
