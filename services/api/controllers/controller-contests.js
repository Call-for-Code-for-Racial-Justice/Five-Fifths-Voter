const debug = require("debug")("contests:controller")
const database = require("../services/database")
const Model = require("../models/model-contests")

const DB = "teams"

exports.create = async (req, res, next) => {
  const teamId = req.params.teamId
  const doc = req.body
  // noinspection DuplicatedCode
  if (doc._rev) return next({ ok: false, errors: "new doc should not have an rev" })
  Model.creating(doc)
  Model.update(req.user.sub, doc, teamId)
  Model.validate(doc)
  let valid = Model.validate(doc)
  if (!valid) {
    return res.status(406).send({ ok: false, error: Model.validate.errors })
  }

  // create the new contest doc
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

exports.listTeam = async (req, res) => {
  const teamId = req.params.teamId

  const resp = await database.service
    .postPartitionView({
      db: DB,
      partitionKey: Model.PARTITION,
      ddoc: "teams",
      view: "contests-team",
      key: teamId,
      includeDocs: true
    })
    .catch(err => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  res.set("Cache-control", `public, max-age=300`) // let browser cache this for 5 minutes

  let contests = resp.result.rows.map(row => {
    return { ...row.doc, _id: row.doc._id.slice(Model.PARTITION.length + 1) }
  })
  return res.status(200).send(contests)
}

exports.read = async (req, res) => {
  const docId = req.params.id

  const resp = await database.service
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

exports.update = async (req, res) => {
  const teamId = req.params.teamId
  const docId = req.params.id
  const update = req.body

  // get current document
  let resp = await database.service
    .getDocument({ db: DB, docId: `${Model.PARTITION}:${docId}` })
    .catch(err => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  let doc = resp.result
  if (doc.team !== teamId) return res.status(404).send({ ok: false, message: "not found" })
  if (update.team && doc.team !== update.team)
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

exports.addContest = async (req, res) => {
  const teamId = req.params.teamId
  const docId = req.params.id
  const contest = req.body
  debug("[addContest]", contest)

  // get current document
  let resp = await database.service
    .getDocument({ db: DB, docId: `${Model.PARTITION}:${docId}` })
    .catch(err => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  let doc = resp.result
  if (doc.team !== teamId) return res.status(404).send({ ok: false, message: "not found" })

  // Add or update this contest in the document
  const index = doc.contests.findIndex((c, i) => {
    if (i === contest.contestIndex) return true
    else if (c.type != "Referendum") return c.office === contest.office
    else return c.referendumTitle === contest.referendumTitle
  })
  debug("[addContest] replacing", index)
  delete contest.contestIndex

  if (index > -1) doc.contests.splice(index, 1, contest)
  else doc.contests.push(contest)

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

  // return the updated contests list
  return res.status(200).send(doc.contests)
}
exports.delete = async (req, res) => {
  const teamId = req.params.teamId
  const docId = req.params.id

  // get current document
  let resp = await database.service
    .getDocument({ db: DB, docId: `${Model.PARTITION}:${docId}` })
    .catch(err => {
      debug("error", JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  let doc = resp.result
  if (doc.team !== teamId) return res.status(404).send({ ok: false, message: "not found" })

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
