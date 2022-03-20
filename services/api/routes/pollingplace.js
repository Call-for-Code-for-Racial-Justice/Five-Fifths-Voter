const express = require("express")
const router = express.Router()
const civic = require("../controllers/civic")

router.post("/", civic.pollingPlace)

module.exports = router
