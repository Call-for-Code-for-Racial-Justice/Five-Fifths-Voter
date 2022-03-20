const express = require("express")
const router = express.Router()
const civic = require("../controllers/civic")

router.get("/", civic.elections)

module.exports = router
