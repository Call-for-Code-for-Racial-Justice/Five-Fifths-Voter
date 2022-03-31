const express = require("express")
const router = express.Router()
const controller = require("../controllers/controller-teams")

router.post("/", controller.create)
router.get("/", controller.list)
router.get("/:id", controller.read)
router.put("/:id", controller.update)
router.delete("/:id", controller.delete)

module.exports = router
