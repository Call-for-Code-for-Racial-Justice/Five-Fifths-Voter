const express = require("express")
const app = express()
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const appid = require("./api/middleware/appid")
const checkAuth = require("./api/middleware/check-auths")

// Add logging
if (process.env.NODE_ENV === "production") app.use(morgan("combined"))
else app.use(morgan("dev"))

// parse incoming requests with JSON payloads or urlencoded payloads or binary "application/octet-stream" payloads
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.raw())
app.use(cookieParser())

// Some APIs like creating a team have a side effect of creating an access document for that team.
// For that reason, sometimes the cache becomes stale on the browser side because we have done a
// POST to something like "/teams" but the GET from something like "/access". A POST will clear the
// browser cache so this is a way for the UI to do that. This does not feel like the right solution.
// For now this is OK.
app.post("*", (req, res, next) => {
  console.log("POST", req.body)
  if (req.body.cache === "clear") return res.status(200).send({ ok: true })
  else next()
})
// setup logins
appid(app)

// routes
const staticRoutes = require("./api/routes/static")
const authRoutes = require("./api/routes/auth")
const aboutRoutes = require("./api/routes/about")
const ballotReturnRoutes = require("./api/routes/ballotreturn")
const voterIdRoutes = require("./api/routes/voterids")
const earlyVotingRoutes = require("./api/routes/earlyvoting")
const electionsRoutes = require("./api/routes/elections")
const pollingPlaceRoutes = require("./api/routes/pollingplace")
const twitterRoutes = require("./api/routes/twitter")
const teamRoutes = require("./api/routes/route-teams")
const teamAccessRoutes = require("./api/routes/route-access")
const teamInviteRoutes = require("./api/routes/route-invitations")
const teamElectionRoutes = require("./api/routes/route-election")
const teamContestRoutes = require("./api/routes/route-contests")
const badgeRoutes = require("./api/routes/route-badges")
const shareRoutes = require("./api/routes/route-shared")

app.use("/", staticRoutes)
app.use("/auth", authRoutes)
app.use("/about", aboutRoutes)
app.use("/ballotreturn", ballotReturnRoutes)
app.use("/voterids", voterIdRoutes)
app.use("/earlyvoting", earlyVotingRoutes)
app.use("/elections", electionsRoutes)
app.use("/pollingplace", pollingPlaceRoutes)
app.use("/twitter", twitterRoutes)
app.use("/badges", checkAuth, badgeRoutes)
app.use("/team", checkAuth, teamRoutes)
app.use("/teams/access", checkAuth, teamAccessRoutes)
app.use("/teams/invite", checkAuth, teamInviteRoutes)
app.use("/teams/election", checkAuth, teamElectionRoutes)
app.use("/teams/contests", checkAuth, teamContestRoutes)
app.use("/share", checkAuth, shareRoutes)

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
