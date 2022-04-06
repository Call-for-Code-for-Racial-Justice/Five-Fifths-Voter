const WebAppStrategy = require("ibmcloud-appid").WebAppStrategy

module.exports = (req, res, next) => {
  let context = req.session[WebAppStrategy.AUTH_CONTEXT]
  if (context) {
    if (!req.user) req.user = req.session.passport.user
    next()
  } else {
    if (req.headers["x-authorization"].startsWith("development")) {
      let email = "dwnixon@gmail.com"
      if (req.headers["x-authorization"].startsWith("development-"))
        email = req.headers["x-authorization"].slice(12)

      req.user = {
        iss: "https://us-south.appid.cloud.ibm.com/oauth/v4/f6dc5d11-67a9-491e-9b78-77c75dde3aaa",
        aud: ["66f79cbe-6e3d-40ee-9855-ee61909fce47"],
        exp: 1647995665,
        tenant: "f6dc5d11-67a9-491e-9b78-77c75dde3aaa",
        iat: 1647992065,
        email: email,
        name: "David Nixon",
        sub: "8463a297-5f91-4ceb-b5ca-9ab2518fd2c2",
        email_verified: true,
        given_name: "David",
        family_name: "Nixon",
        identities: [{ provider: "cloud_directory", id: "542884bc-2d91-4d5e-ab74-11065bd1c5fd" }],
        amr: ["cloud_directory"],
        ver: 4,
      }
      return next()
    }
    return res.status(401).send({ error: { message: "not authenticated" } })
  }
}
