const express = require("express")
const router = express.Router()
const controller = require("../controllers/controller-shared")

router.post("/", controller.create)
router.get("/:id", controller.read)
router.delete("/:id", controller.delete)

module.exports = router
