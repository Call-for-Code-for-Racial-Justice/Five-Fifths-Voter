const debug = require("debug")("invitations:controller")
const database = require("../services/database")
const Model = require("../models/model-access")
const badgeController = require("./controller-badges")

const DB = "teams"

// Update invitation status for logged in user to a public invitation
exports.publicInvite = async (req, res, next) => {
  const teamId = req.params.teamId
  var update = req.body

  // get current document
  var resp = await database.service
    .postPartitionView({
      db: DB,
      partitionKey: Model.PARTITION,
      ddoc: "teams",
      view: "access-team-invited-user",
      key: ["public", teamId],
      includeDocs: true,
      limit: 1,
    })
    .catch((err) => {
      debug(JSON.stringify(err))
    })

  if (!resp || resp.result.rows.length === 0)
    return res.status(404).send({ ok: false, message: "not found" })
  let doc = resp.result.rows[0].doc
  debug("found invitation doc for this team", doc)

  doc = { ...doc, email: req.user.email, status: update.status } // only status
  Model.creating(doc)
  Model.update(req.user.sub, doc, teamId)
  let valid = Model.validate(doc)
  if (!valid) return res.status(406).send({ ok: false, errors: Model.validate.errors })

  resp = await database.service
    .postDocument({
      db: DB,
      document: doc,
    })
    .catch((err) => {
      debug(JSON.stringify(err))
    })

  if (!resp) return res.status(409).send({ ok: false, message: "not created" })

  // create new badge if needed
  if (update.status == "accepted") await badgeController.grant(req, "joinTeam")

  res.set("Cache-control", `no-store`)
  res.status(200).send({
    ok: true,
    message: "created",
    doc: { ...doc, _id: doc._id.slice(Model.PARTITION.length + 1) },
  })
}

// Update invitation status only for logged in user
exports.invite = async (req, res, next) => {
  const teamId = req.params.teamId
  const docId = req.params.id
  var update = req.body

  // get current document
  var resp = await database.service
    .postPartitionView({
      db: DB,
      partitionKey: Model.PARTITION,
      ddoc: "teams",
      view: "access-team-invited-user",
      key: [req.user.email.toLowerCase(), teamId],
      includeDocs: true,
      limit: 1,
    })
    .catch((err) => {
      debug(JSON.stringify(err))
    })

  if (!resp || resp.result.rows.length === 0)
    return res.status(404).send({ ok: false, message: "not found" })
  let doc = resp.result.rows[0].doc
  debug("found invitation doc for this team", doc)

  doc = { ...doc, status: update.status } // only status
  Model.update(req.user.sub, doc, teamId)
  let valid = Model.validate(doc)
  if (!valid) return res.status(406).send({ ok: false, errors: Model.validate.errors })

  resp = await database.service
    .postDocument({
      db: DB,
      document: doc,
    })
    .catch((err) => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(417).send({ ok: false, message: "not updated" })

  // create new badge if needed
  if (update.status == "accepted") await badgeController.grant(req, "joinTeam")

  res.set("Cache-control", `no-store`)
  return res.status(200).send(resp.result)
}
