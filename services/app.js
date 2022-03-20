const express = require("express")
const app = express()
const morgan = require("morgan")

// Add logging
if (process.env.NODE_ENV === "production") app.use(morgan("combined"))
else app.use(morgan("dev"))

// parse incoming requests with JSON payloads or urlencoded payloads or binary "application/octet-stream" payloads
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.raw())

// routes
const aboutRoutes = require("./api/routes/about")
const ballotReturnRoutes = require("./api/routes/ballotreturn")
const voterIdRoutes = require("./api/routes/voterids")
const earlyVotingRoutes = require("./api/routes/earlyvoting")
const electionsRoutes = require("./api/routes/elections")
const pollingPlaceRoutes = require("./api/routes/pollingplace")
const twitterRoutes = require("./api/routes/twitter")

app.use("/about", aboutRoutes)
app.use("/ballotreturn", ballotReturnRoutes)
app.use("/voterids", voterIdRoutes)
app.use("/earlyvoting", earlyVotingRoutes)
app.use("/elections", electionsRoutes)
app.use("/pollingplace", pollingPlaceRoutes)
app.use("/twitter", twitterRoutes)

// errors
app.use((req, res, next) => {
  const error = new Error("not found")
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({ error: { message: error.message } })
})

module.exports = app
