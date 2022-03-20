const express = require("express")
const router = express.Router()
const about = {
  version: "1.0.0",
}

router.get("/", (req, res) => {
  res.status(200).send(about)
})

// debugging
// router.post("/echo", (req, res) => {
//   res.status(200).send({ message: req.body.length })
// })

module.exports = router
