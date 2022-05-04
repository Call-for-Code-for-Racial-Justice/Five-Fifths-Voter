const https = require("https")
const axios = require("axios")
var apiKey
if (process.env.VCAP_SERVICES) {
  var vcap_services = JSON.parse(process.env.VCAP_SERVICES)
  const srvc = vcap_services["user-provided"].find(
    (element) => element["instance_name"] == "Five Fifths Google Civic API"
  )
  apiKey = srvc.credentials.apikey
} else {
  apiKey = process.env.NODE_GOOGLE_CIVIC_API_KEY
}

//const currentElectionId = 7000; // 2020 US Presidential Election
//const currentElectionId = 2000; // VIP Test Election
//const currentElectionId = 5029; // Louisiana General Congressional Election
const currentElectionId = process.env.NODE_CIVIC_ELECTION_ID || 2000
const earlyVotingGa = require("./ga-locations")

exports.pollingPlace = function (req, res) {
  // console.log("exports.pollingPlace", req.body.address);
  try {
    let voterAddress = null
    if (req.body.address) voterAddress = req.body.address
    else voterAddress = req.body.data.address

    let voterElectionId = null
    if (req.body.electionId) voterElectionId = req.body.electionId
    else voterElectionId = req.body.data.electionId
    if (!voterElectionId) voterElectionId = currentElectionId

    getParams = {
      key: apiKey,
      electionId: voterElectionId,
      address: voterAddress,
    }

    axios
      .get("https://www.googleapis.com/civicinfo/v2/voterinfo", {
        params: getParams,
        headers: {
          "Accept-Encoding": "gzip",
          "User-Agent": "node (gzip)",
        },
      })
      .then((response) => {
        // console.log("got civic response", response.data);
        try {
          if (response.data.normalizedInput.state === "GA") {
            // console.log("Georgia data");
            if (!response.data.state) {
              // console.log("no state", response.data);
              return response.data
            }
            if (!response.data.state[0]) {
              // console.log("no state[0]", response.data.state);
              return response.data
            }
            if (!response.data.state[0].local_jurisdiction) {
              // console.log(
              //   "no state[0].local_jurisdiction",
              //   response.data.state[0]
              // );
              return response.data
            }
            if (!response.data.state[0].local_jurisdiction.name) {
              // console.log(
              //   "no state[0].local_jurisdiction.name",
              //   response.data.state[0].local_jurisdiction
              // );
              return response.data
            }

            var county = response.data.state[0].local_jurisdiction.name
            county = county.toUpperCase().replace("COUNTY", "").trim()
            // console.log(county);
            // if (!response.data.earlyVoteSites) {
            //   // console.log("no early voting data from google");
            //   var more = earlyVotingGa.locationData(county, response.data)
            //   return more
            // }
          }
        } catch (error) {
          console.error("error parsing civic API response", error)
        }
        return response.data
      })
      .then((data) => {
        res.send(data)
      })
      .catch((reason) => {
        console.error("Civic error", reason)
        return res.status(503).send({
          election: {
            id: currentElectionId,
            name: reason.message,
          },
        })
      })
  } catch (error) {
    console.error(error)

    res.status(400).send(error)
  }
}

exports.elections = function (req, res) {
  try {
    getParams = {
      key: apiKey,
    }
    axios
      .get("https://www.googleapis.com/civicinfo/v2/elections", {
        params: getParams,
        headers: {
          "Accept-Encoding": "gzip",
          "User-Agent": "node (gzip)",
        },
      })
      .then((response) => {
        res.send(response.data)
      })
      .catch((reason) => {
        console.error("Civic error", reason)
        return res.status(503).send({ message: reason.message })
      })
  } catch (error) {
    //console.log(error);

    res.status(400).send(error)
  }
}
