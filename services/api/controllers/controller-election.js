const debug = require("debug")("elections:controller")
const database = require("../services/database")
const Model = require("../models/model-election")
const lodash = require("lodash")

const DB = "teams"

exports.create = async (req, res, next) => {
  const teamId = req.params.teamId
  var doc = req.body
  if (doc._rev) return next({ ok: false, errors: "new doc should not have an rev" })

  Model.creating(doc)
  Model.update(req.user.sub, doc, teamId)
  Model.validate(doc)
  let valid = Model.validate(doc)
  if (!valid) {
    return res.status(406).send({ ok: false, error: Model.validate.errors })
  }

  // lets see if this election already exists
  let existingResp = await database.service
    .postPartitionView({
      db: DB,
      partitionKey: Model.PARTITION,
      ddoc: "teams",
      view: "election-team-id",
      key: [doc.google_id, teamId],
      includeDocs: true,
      limit: 1
    })
    .catch(err => {
      debug(JSON.stringify(err))
    })

  // if this election already exists cannot create a new election doc
  if (existingResp && existingResp.result.rows.length > 0) {
    let electionDoc = existingResp.result.rows[0].doc
    return res.status(409).send({
      ok: false,
      message: "not created",
      existing_election: electionDoc._id.slice(Model.PARTITION.length + 1)
    })
  }

  // create the new election doc
  let resp = await database.service
    .postDocument({
      db: DB,
      document: doc
    })
    .catch(err => {
      debug(JSON.stringify(err))
    })

  if (resp)
    res.status(200).send({
      ok: true,
      message: "created",
      doc: { ...doc, _id: doc._id.slice(Model.PARTITION.length + 1) }
    })
  else res.status(409).send({ ok: false, message: "not created" })
}

exports.listTeam = async (req, res, next) => {
  const teamId = req.params.teamId

  var resp = await database.service
    .postPartitionView({
      db: DB,
      partitionKey: Model.PARTITION,
      ddoc: "teams",
      view: "election-team",
      key: teamId,
      includeDocs: true
    })
    .catch(err => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  res.set("Cache-control", `public, max-age=300`) // let browser cache this for 5 minutes

  let elections = resp.result.rows.map(row => {
    return { ...row.doc, _id: row.doc._id.slice(Model.PARTITION.length + 1) }
  })
  return res.status(200).send(elections)
}

exports.read = async (req, res, next) => {
  const docId = req.params.id

  var resp = await database.service
    .getDocument({ db: DB, docId: `${Model.PARTITION}:${docId}` })
    .catch(err => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  let doc = resp.result
  let valid = Model.validate(doc)
  if (!valid) return res.status(406).send({ ok: false, errors: Model.validate.errors })
  else res.status(200).send({ ...doc, _id: doc._id.slice(Model.PARTITION.length + 1) })
}

exports.update = async (req, res, next) => {
  const teamId = req.params.teamId
  const docId = req.params.id
  var update = req.body

  // get current document
  var resp = await database.service
    .getDocument({ db: DB, docId: `${Model.PARTITION}:${docId}` })
    .catch(err => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(errCode || 404).send({ ok: false, message: "not found" })

  let doc = resp.result
  if (doc.team != teamId) return res.status(404).send({ ok: false, message: "not found" })
  if (update.team && doc.team != update.team)
    return res
      .status(400)
      .send({ ok: false, message: "cannot change team in existing election doc" }) // cannot update slug
  doc = { ...doc, ...update, _id: doc._id, _rev: doc._rev }
  Model.update(req.user.sub, doc, teamId)
  let valid = Model.validate(doc)
  if (!valid) return res.status(406).send({ ok: false, errors: Model.validate.errors })

  resp = await database.service
    .postDocument({
      db: DB,
      document: doc
    })
    .catch(err => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(417).send({ ok: false, message: "not updated" })

  return res.status(200).send(resp.result)
}

exports.delete = async (req, res, next) => {
  const teamId = req.params.teamId
  const docId = req.params.id

  // get current document
  var resp = await database.service
    .getDocument({ db: DB, docId: `${Model.PARTITION}:${docId}` })
    .catch(err => {
      debug("error", JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  let doc = resp.result
  if (doc.team != teamId) return res.status(404).send({ ok: false, message: "not found" })

  let valid = Model.validate(doc)
  if (!valid) return res.status(406).send({ ok: false, error: Model.validate.errors })

  resp = await database.service
    .deleteDocument({ db: DB, docId: doc._id, rev: doc._rev })
    .catch(err => {
      debug(`error deleting (${doc._id}, ${doc._rev})`, JSON.stringify(err))
    })
  if (!resp) return res.status(417).send({ ok: false, message: "not found" })

  return res.status(200).send({ ok: true, message: docId, status: "deleted" })
}
