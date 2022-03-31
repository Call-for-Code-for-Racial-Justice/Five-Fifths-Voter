const passport = require("passport")
const expressSession = require("express-session")
const CloudantStore = require("./cloudant-store")(expressSession)
const WebAppStrategy = require("ibmcloud-appid").WebAppStrategy

module.exports = function (app) {
  // store the express session in memory & cloudant
  const cloudantStore = new CloudantStore({
    checkPeriod: 3600000 * 8, // prune expired entries every 8 hours
  })

  // use this for express-session
  const session_secret = process.env.NODE_SESSION_SECRET || "SWDU3hYGJ6R0K1AZssSYWeKVfLzMZA"
  app.use(
    expressSession({
      store: cloudantStore,
      resave: true,
      saveUninitialized: true,
      secret: session_secret,
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  const REDIRECT_URI = () => {
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
      redirectUri: REDIRECT_URI(),
    })
  )
  passport.serializeUser(function (user, cb) {
    cb(null, user)
  })

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj)
  })
}
