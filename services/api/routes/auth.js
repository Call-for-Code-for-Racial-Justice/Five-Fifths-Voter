const express = require("express")
const router = express.Router()
const passport = require("passport")
const WebAppStrategy = require("ibmcloud-appid").WebAppStrategy

const LANDING_PAGE = process.env.LANDING_PAGE || "http://localhost:4013/#/activities"
const HOME_PAGE = process.env.HOME_PAGE || "http://localhost:4013/#"

// Explicit login endpoint. Will always redirect browser to login widget due to {forceLogin: true}.
// If forceLogin is set to false the redirect to login widget will not occur if user is already authenticated
router.get(
  "/login",
  passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
    successRedirect: LANDING_PAGE,
    forceLogin: true,
  })
)

router.get("/callback", passport.authenticate(WebAppStrategy.STRATEGY_NAME))

// Logout endpoint. Clears authentication information from session
router.get("/logout", function (req, res) {
  WebAppStrategy.logout(req)
  res.redirect(HOME_PAGE)
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
  } else res.status(200).send({ authenticated: false })
})

module.exports = router
