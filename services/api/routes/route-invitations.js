const express = require("express")
const router = express.Router()
const controller = require("../controllers/controller-invitations")

router.put("/public/:teamId", controller.publicInvite)
router.put("/update/:teamId", controller.invite)

module.exports = router
