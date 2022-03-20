const express = require("express")
const router = express.Router()
const voterIds = require("../../data/voterid")

router.get("/", (req, res) => {
  res.status(200).send(voterIds)
})

module.exports = router
