const debug = require("debug")("auth:team")
const jwt = require("jsonwebtoken")
const database = require("../services/database")
const Model = require("../models/model-access")

const SECRET =
  process.env.JWT_SECRET || "vezlvfQbeoSnWLvBCzAJPdwQQFPwSds9pGbUiQ7QxsF88iTy6VjQAxpBxA/AdrQ"
const TOKEN_NAME = process.env.JWT_NAME || "token55"
const DB = "teams"

module.exports = (teamRole) => {
  return async (req, res, next) => {
    debug(`checking for role:${teamRole}`)
    const teamId = req.params.teamId
    const requiredRoleNumber = Model.ROLE_NUM[teamRole]
    if (requiredRoleNumber === undefined || typeof requiredRoleNumber !== "number")
      return res.status(500).send({ error: { message: `${teamRole} is unknown` } })

    var authorized = false

    var authorizedTeams = []

    // look for a token
    var token = req.cookies[TOKEN_NAME]
    if (!token) token = req.headers[TOKEN_NAME]
    if (token) {
      debug("found token")
      var decoded = jwt.verify(token, SECRET)
      if (decoded.sub === req.user.sub) {
        debug("token is valid", decoded)
        authorizedTeams = decoded.teams || []
      }
    }

    var team = authorizedTeams.find((access) => access.team === teamId)
    if (team) {
      const roleNumber = Model.ROLE_NUM[team.acl] || Number.MIN_SAFE_INTEGER
      authorized = roleNumber >= requiredRoleNumber
    } else {
      // lets see if this user has access to this team
      var resp = await database.service
        .postPartitionView({
          db: DB,
          partitionKey: Model.PARTITION,
          ddoc: "teams",
          view: "access-team-user",
          key: [req.user.email.toLowerCase(), teamId],
          includeDocs: true,
          limit: 1,
        })
        .catch((err) => {
          debug(JSON.stringify(err))
        })

      if (resp && resp.result.rows.length > 0) {
        let accessDoc = resp.result.rows[0].doc
        debug("found access doc for this team", accessDoc)

        authorizedTeams.push({ team: teamId, acl: accessDoc.acl })
        const roleNumber = Model.ROLE_NUM[accessDoc.acl] || Number.MIN_SAFE_INTEGER
        authorized = roleNumber >= requiredRoleNumber

        // TODO: keep this token under 1k by slicing the array from the end to create a LRU list

        // update token
        const token = jwt.sign({ sub: req.user.sub, teams: authorizedTeams }, SECRET, {
          expiresIn: "20m",
        })
        debug("set cookie", token, token.length)
        res.cookie(TOKEN_NAME, token, { maxAge: 20 * 60000 })
      }
    }

    if (authorized) {
      return next()
    } else {
      return res.status(403).send({ error: { message: "not authorized" } })
    }
  }
}
