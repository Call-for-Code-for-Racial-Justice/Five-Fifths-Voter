const debug = require("debug")("teams:controller")
const database = require("../services/database")
const Model = require("../models/model-team")

const DB = "teams"

exports.create = async (req, res, next) => {
  var doc = req.body
  if (doc._id) return next({ ok: false, errors: "new doc should not have an id" })
  if (doc._rev) return next({ ok: false, errors: "new doc should not have an rev" })

  Model.creating(doc)
  Model.update(req.user.sub, doc)
  Model.validate(doc)
  let valid = Model.validate(doc)
  if (!valid) {
    return res.status(406).send({ ok: false, error: Model.validate.errors })
  }

  resp = await database.service
    .postDocument({
      db: DB,
      document: doc,
    })
    .catch((err) => {
      debug(JSON.stringify(err))
    })

  if (resp) {
    res.set("Cache-control", `no-store`)
    res.status(200).send({
      ok: true,
      message: "created",
      doc: { ...doc, _id: doc._id.slice(Model.PARTITION.length + 1) },
    })
  } else res.status(409).send({ ok: false, message: "not created" })
}

exports.list = async (req, res, next) => {
  var resp = await database.service
    .postPartitionView({
      db: DB,
      partitionKey: Model.PARTITION,
      ddoc: "teams",
      view: "teams",
      includeDocs: true,
    })
    .catch((err) => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  res.set("Cache-control", `private,max-age=300, must-revalidate, proxy-revalidate`) // let browser cache this for 5 minutes
  return res.status(200).send(
    resp.result.rows.map((row) => {
      return { ...row.doc, _id: row.doc._id.slice(Model.PARTITION.length + 1) }
    })
  )
}

exports.read = async (req, res, next) => {
  const docId = req.params.id

  var resp = await database.service
    .getDocument({ db: DB, docId: `${Model.PARTITION}:${docId}` })
    .catch((err) => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  let doc = resp.result
  let valid = Model.validate(doc)
  if (!valid) return res.status(406).send({ ok: false, errors: Model.validate.errors })

  res.set("Cache-control", `private,max-age=300, must-revalidate, proxy-revalidate`) // let browser cache this for 5 minutes
  return res.status(200).send({ ...doc, _id: doc._id.slice(Model.PARTITION.length + 1) })
}

exports.update = async (req, res, next) => {
  const userInfo = req.user
  const docId = req.params.id
  var update = req.body

  // get current document
  var resp = await database.service
    .getDocument({ db: DB, docId: `${Model.PARTITION}:${docId}` })
    .catch((err) => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(errCode || 404).send({ ok: false, message: "not found" })

  let doc = resp.result
  doc = { ...doc, ...update, _id: doc._id, _rev: doc._rev }
  Model.update(userInfo.uniqueSecurityName, doc)
  let valid = Model.validate(doc)
  if (!valid) return res.status(406).send({ ok: false, errors: Model.validate.errors })
  if (docId != update.slug)
    return res.status(400).send({ ok: false, message: "cannot change slug" }) // cannot update slug

  resp = await database.service
    .postDocument({
      db: DB,
      document: doc,
    })
    .catch((err) => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(417).send({ ok: false, message: "not updated" })

  res.set("Cache-control", `no-store`)
  return res.status(200).send(resp.result)
}

exports.delete = async (req, res, next) => {
  const docId = req.params.id

  // get current document
  var resp = await database.service
    .getDocument({ db: DB, docId: `${Model.PARTITION}:${docId}` })
    .catch((err) => {
      debug("error", JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  let doc = resp.result
  let valid = Model.validate(doc)
  if (!valid) return res.status(406).send({ ok: false, error: Model.validate.errors })

  resp = await database.service
    .deleteDocument({ db: DB, docId: doc._id, rev: doc._rev })
    .catch((err) => {
      debug(`error deleting (${doc._id}, ${doc._rev})`, JSON.stringify(err))
    })
  if (!resp) return res.status(417).send({ ok: false, message: "not found" })

  res.set("Cache-control", `no-store`)
  return res.status(200).send({ ok: true, message: doc._id, status: "deleted" })
}
