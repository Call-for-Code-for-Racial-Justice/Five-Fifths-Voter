const debug = require("debug")("shared:controller")
const database = require("../services/database")
const Model = require("../models/model-share")
const badgeController = require("./controller-badges")

const DB = "teams"

exports.create = async (req, res, next) => {
  const doc = req.body
  if (!doc._id) return next({ ok: false, errors: "shared docs should always have an id" })
  doc._id = `${Model.PARTITION}:${doc._id}`

  Model.update(doc)
  Model.validate(doc)
  let valid = Model.validate(doc)
  if (!valid) {
    return res.status(406).send({ ok: false, error: Model.validate.errors })
  }

  // create the new access doc
  let resp = await database.service
    .postDocument({
      db: DB,
      document: doc,
    })
    .catch((err) => {
      debug(JSON.stringify(err))
    })

  if (resp) {
    // create new badge if needed
    await badgeController.grant(req, "shareList")
  }

  if (resp) {
    res.set("Cache-control", `no-store`)
    res.status(200).send({
      ok: true,
      message: "created",
      doc: { ...doc, _id: doc._id.slice(Model.PARTITION.length + 1), _rev: resp.result.rev },
    })
  } else res.status(409).send({ ok: false, message: "not created" })
}

exports.read = async (req, res) => {
  const docId = req.params.id

  const resp = await database.service
    .getDocument({ db: DB, docId: `${Model.PARTITION}:${docId}` })
    .catch((err) => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  let doc = resp.result
  let valid = Model.validate(doc)
  if (!valid) return res.status(406).send({ ok: false, errors: Model.validate.errors })
  else {
    res.set("Cache-control", `private,max-age=300, must-revalidate, proxy-revalidate`) // let browser cache this for 5 minutes
    res.status(200).send({ ...doc, _id: doc._id.slice(Model.PARTITION.length + 1) })
  }
}

exports.delete = async (req, res) => {
  const docId = req.params.id

  // get current document
  let resp = await database.service
    .getDocument({ db: DB, docId: `${Model.PARTITION}:${docId}` })
    .catch((err) => {
      debug("error", JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  let doc = resp.result

  resp = await database.service
    .deleteDocument({ db: DB, docId: doc._id, rev: doc._rev })
    .catch((err) => {
      debug(`error deleting (${doc._id}, ${doc._rev})`, JSON.stringify(err))
    })
  if (!resp) return res.status(417).send({ ok: false, message: "not found" })

  res.set("Cache-control", `no-store`)
  return res.status(200).send({ ok: true, message: docId, status: "deleted" })
}
