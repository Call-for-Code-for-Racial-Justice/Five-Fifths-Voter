const express = require("express")
const router = express.Router()
const params = require("../../../data/earlyVoting/GA/scrapeParams")
const earlyVotingGa = require("../../controllers/ga-locations")

router.get("/", (req, res) => {
  res.status(200).send({ list: Object.keys(params) })
})


router.get("/:locId" ,(req, res) => {
  console.log('location');
  try {
    let locId = req.params.locId.toUpperCase()
    let getParams = params[locId]

    // Every county should be in the list
    if (!getParams) return res.status(404).send()

    earlyVotingGa.locationData(locId, {})
      .then((data) => {
        res.status(200).send(data)
      })
      .catch((reason) => {
        console.error("error", reason)
        return res.status(404).send({ ok: false, reason })
      })
  } catch (error) {
    console.error("error", error)
    return res.status(404).send({ ok: false, error })
  }
})

module.exports = router

