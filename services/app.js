const express = require("express")
const app = express()
const morgan = require("morgan")
const passport = require("passport")
const expressSession = require("express-session")
const cookieParser = require("cookie-parser")
const MemoryStore = require("memorystore")(expressSession)
const CloudantStore = require("./api/middleware/cloudant-store")(expressSession)
const WebAppStrategy = require("ibmcloud-appid").WebAppStrategy

// Add logging
if (process.env.NODE_ENV === "production") app.use(morgan("combined"))
else app.use(morgan("dev"))

// parse incoming requests with JSON payloads or urlencoded payloads or binary "application/octet-stream" payloads
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.raw())
app.use(cookieParser())

// store the express session in memory
const memoryStore = new CloudantStore({
  checkPeriod: 3600000, // prune expired entries every hour
})

// use this for express-session
const session_secret = process.env.NODE_SESSION_SECRET || "SWDU3hYGJ6R0K1AZssSYWeKVfLzMZA"
app.use(
  expressSession({
    store: memoryStore,
    resave: true,
    saveUninitialized: true,
    secret: session_secret,
  })
)
app.use(passport.initialize())
app.use(passport.session())
function getRedirectUri() {
  // are we deployed on code engine?
  if (process.env.CE_DOMAIN) {
    return `https://${CE_APP}.${CE_SUBDOMAIN}.${CE_DOMAIN}/auth/callback`
  }
  return process.env.CALLBACK_URL || "http://localhost:3333/auth/callback"
}
passport.use(
  new WebAppStrategy({
    tenantId: process.env.APPID_TENANTID,
    clientId: process.env.APPID_CLIENTID,
    secret: process.env.APPID_SECRET,
    oauthServerUrl: process.env.APPID_OAUTHSERVERURL,
    redirectUri: getRedirectUri(),
  })
)
passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})

// UI code
app.use("/", express.static("dist"))

// routes
const authRoutes = require("./api/routes/auth")
const aboutRoutes = require("./api/routes/about")
const ballotReturnRoutes = require("./api/routes/ballotreturn")
const voterIdRoutes = require("./api/routes/voterids")
const earlyVotingRoutes = require("./api/routes/earlyvoting")
const electionsRoutes = require("./api/routes/elections")
const pollingPlaceRoutes = require("./api/routes/pollingplace")
const twitterRoutes = require("./api/routes/twitter")

app.use("/auth", authRoutes)
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
