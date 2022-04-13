const express = require("express")
const router = express.Router()
const controller = require("../controllers/controller-election")
const teamAuth = require("../middleware/team-auth")

router.post("/:teamId", teamAuth("editor"), controller.create)
router.get("/:teamId", teamAuth("user"), controller.listTeam)
router.get("/:teamId/:id", teamAuth("user"), controller.read)
router.put("/:teamId/:id", teamAuth("editor"), controller.update)
router.delete("/:teamId/:id", teamAuth("admin"), controller.delete)

module.exports = router
