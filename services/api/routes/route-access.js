const express = require("express")
const router = express.Router()
const controller = require("../controllers/controller-access")
const teamAuth = require("../middleware/team-auth")

router.post("/:teamId", teamAuth("editor"), controller.create)
router.get("/", controller.list)
router.get("/:teamId", teamAuth("editor"), controller.listTeam)
router.get("/:teamId/:id", teamAuth("editor"), controller.read)
router.put("/:teamId/:id", teamAuth("editor"), controller.update)
router.delete("/:teamId/:id", teamAuth("admin"), controller.delete)

module.exports = router
