const express = require("express")
const router = express.Router()
const states = require("../../data/earlyVoting/states")

router.get("/", (req, res) => {
  res.send(states)
})

// State sub-routes
const gaRoutes = require("./earlyvoting/ga")
router.use("/GA", gaRoutes)

module.exports = router
