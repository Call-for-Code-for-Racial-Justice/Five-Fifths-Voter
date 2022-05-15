const express = require("express")
const router = express.Router()
const states = require("../../data/ballotreturn/states")
const regions = require("../../data/ballotreturn/GA/regions")
const locations = require("../../data/ballotreturn/GA/mocklocations")

router.get("/states/", (req, res) => {
  // console.log('Returning states');
  res.send(states)
})

router.get("/regions/:stateId", (req, res) => {
  // console.log('Returning regions', req.query);
  let stateId = req.params.stateId
  const foundRegions = stateId === "GA"
  if (foundRegions) {
    res.send(regions)
  } else {
    console.error(`State not found.`)
    res.status(404).send({ error: { message: "state not found" } })
  }
})

router.get("/locations/:stateId/:locId", (req, res) => {
  // console.log('Returning locations', req.query);
  let stateId = req.params.stateId
  let locId = req.params.locId.toUpperCase()
  const foundLocation = stateId === "GA" && locations.list.find((loc) => loc.place === locId)
  if (foundLocation) {
    res.send(foundLocation)
  } else {
    res.status(404).send({ error: { message: "location not found" } })
  }
})

module.exports = router
