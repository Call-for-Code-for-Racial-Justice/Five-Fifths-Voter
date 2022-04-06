const express = require("express")
const router = express.Router()
const passport = require("passport")
const WebAppStrategy = require("ibmcloud-appid").WebAppStrategy

const LANDING_PAGE = () => {
  if (process.env.CE_DOMAIN) {
    return `https://${process.env.CE_APP}.${process.env.CE_SUBDOMAIN}.${process.env.CE_DOMAIN}/#/activities`
  }
  return process.env.LANDING_PAGE || "http://localhost:4013/#/activities"
}

const HOME_PAGE = () => {
  if (process.env.CE_DOMAIN) {
    return `https://${process.env.CE_APP}.${process.env.CE_SUBDOMAIN}.${process.env.CE_DOMAIN}/#`
  }
  return process.env.HOME_PAGE || "http://localhost:4013/#"
}

// Explicit login endpoint. Will always redirect browser to login widget due to {forceLogin: true}.
// If forceLogin is set to false the redirect to login widget will not occur if user is already authenticated
router.get(
  "/login",
  passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
    successRedirect: LANDING_PAGE(),
    forceLogin: true,
  })
)

router.get("/callback", passport.authenticate(WebAppStrategy.STRATEGY_NAME))

// Logout endpoint. Clears authentication information from session
router.get("/logout", function (req, res) {
  WebAppStrategy.logout(req)
  res.redirect(HOME_PAGE())
})

router.get("/failure", (req, res, next) => {
  res.status(200).send({ login: false })
})

router.get(
  "/whoami",
  passport.authenticate(WebAppStrategy.STRATEGY_NAME, { forceLogin: false }),
  (req, res) => {
    res.status(200).send(req.user)
  }
)

router.get("/user", async (req, res) => {
  let context = req.session[WebAppStrategy.AUTH_CONTEXT]

  if (context) {
    res.status(200).send(req.session.passport.user)
  } else {
    if (!process.env.DEPLOYED && req.headers["vue"] === "dev") {
      let user = {
        iss: "https://us-south.appid.cloud.ibm.com/oauth/v4/f6dc5d11-67a9-491e-9b78-77c75dde3aaa",
        aud: ["66f79cbe-6e3d-40ee-9855-ee61909fce47"],
        exp: 1647995665,
        tenant: "f6dc5d11-67a9-491e-9b78-77c75dde3aaa",
        iat: 1647992065,
        email: "dwnixon@gmail.com",
        name: "David Nixon",
        sub: "8463a297-5f91-4ceb-b5ca-9ab2518fd2c2",
        email_verified: true,
        given_name: "David",
        family_name: "Nixon",
        identities: [{ provider: "cloud_directory", id: "542884bc-2d91-4d5e-ab74-11065bd1c5fd" }],
        amr: ["cloud_directory"],
        ver: 4,
      }
      return res.status(200).send(user)
    }
    res.status(200).send({ authenticated: false })
  }
})

module.exports = router
