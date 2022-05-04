const express = require("express")
const router = express.Router()
const controller = require("../controllers/controller-badges")

router.get("/", controller.list)
router.put("/seen/:id", controller.seen)
router.post("/grant/:kind", controller.selfGrant)

module.exports = router
