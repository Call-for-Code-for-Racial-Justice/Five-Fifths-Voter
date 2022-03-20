const express = require("express")
const router = express.Router()
const twitterController = require("../controllers/twitter")

router.get("/chatter/", twitterController.get_tweets);

module.exports = router
