const debug = require("debug")("earlyvoting")
const cache = require("../services/database")
const lodash = require("lodash")
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
locationData = exports.locationData = async (locId, amend) => {
  try {
    locId = locId.toUpperCase()
    let getParams = params[locId]

    // Every county should be in the list
    if (!getParams) throw { ok: false, message: "County not found: " + locId }

    /**
     * Step 1. Get data for this location from the DB
     */
    let cacheResponse = await cache.service
      .getDocument({
        db: "earlyvoting",
        docId: `GA:${locId}`,
      })
      .catch((err) => {
        debug(`no cached data GA:${locId}`)
      })

    /**
     * Step 2. If the data from the db is not stale - use it. Otherwise, update it form the source
     */
    if (cacheResponse) {
      let cacheData = cacheResponse.result
      let retrieved = Date.now()
      let cacheIsStale = retrieved - cacheData.retrieved > STALE_TIME
      debug(
        `cached data GA:${locId} stale:${cacheIsStale} (${(
          (retrieved - cacheData.retrieved) /
          1000 /
          60 /
          60
        ).toFixed(1)}h)`
      )
      if (!cacheIsStale) {
        var fixup = {
          fivefifthsdata: {
            ...lodash.omit(cacheData, ["earlyVoteSites", "_id", "_rev"]),
            earlyVoteSitesProvided: true,
          },
          earlyVoteSites: cacheData.earlyVoteSites,
        }

        return { ...amend, ...fixup }
      }
    }

    /**
     * Step 3. The cache data did not exist or was stale. Get from web site.
     */
    let cacheData = {
      _id: `GA:${locId}`,
      collection: "early",
      state: "GA",
      place: locId,
      retrieved: Date.now(),
      earlyVoteSites: [],
      elections: [],
    }
    const scrapeURL = "https://elections.sos.ga.gov/Elections/advancedVotingInfoResult.do"
    debug(`getting data from ${scrapeURL}`, getParams)

    let scrapeResponse = await axios.get(scrapeURL, { params: getParams })
    const dom = new JSDOM(scrapeResponse.data)
    const document = dom.window.document

    var addresses = []
    var electionSet = new Set()

    // try to parse out the addresses fom the table - danger
    try {
      var inner = document.querySelector("#Table1 >  tbody > tr > td > table")
      if (inner) {
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
            debug(`row ${r} label ${label}`)

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
          } else if (cells && cells.length === 1) {
            var label = cells[0].textContent.trim()
            debug(`row ${r} label ${label}`)
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
        cacheData.earlyVoteSites = addresses
        cacheData.elections = elections
      }
    } catch (error) {
      console.error("could not get addresses from table")
    }

    // Step 4. - Cache the data - but we don't need to wait for this to finish
    debug("updating cache db", cacheData._id)
    cache.service.postDocument({
      db: "earlyvoting",
      document: cacheData,
    })

    var fixup = {
      fivefifthsdata: {
        ...lodash.omit(cacheData, ["earlyVoteSites", "_id", "_rev"]),
        earlyVoteSitesProvided: true,
      },
      earlyVoteSites: cacheData.earlyVoteSites,
    }

    return { ...amend, ...fixup }
  } catch (error) {
    debug("error getting early voting data for GA")
    throw { ok: false, message: error }
  }
}
