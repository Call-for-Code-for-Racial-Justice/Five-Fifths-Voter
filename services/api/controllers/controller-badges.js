const debug = require("debug")("badges:controller")
const database = require("../services/database")
const Model = require("../models/model-badge")

const DB = "teams"

exports.list = async (req, res) => {
  debug("[list]", req.user.email.toLowerCase())
  const resp = await database.service
    .postPartitionView({
      db: DB,
      partitionKey: Model.PARTITION,
      ddoc: "badges",
      view: "user-badges",
      key: req.user.email.toLowerCase(),
      includeDocs: true
    })
    .catch(err => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  debug("[list]", resp)

  res.set("Cache-control", `private,max-age=30, must-revalidate, proxy-revalidate`) // let browser cache this for 5 minutes
  return res.status(200).send(
    resp.result.rows.map(row => {
      return { ...row.doc, _id: row.doc._id.slice(Model.PARTITION.length + 1) }
    })
  )
}

exports.seen = async (req, res) => {
  const userInfo = req.user
  const docId = req.params.id

  // get current document
  let resp = await database.service
    .getDocument({ db: DB, docId: `${Model.PARTITION}:${docId}` })
    .catch(err => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  let doc = resp.result
  doc = { ...doc, seen: true, _id: doc._id, _rev: doc._rev }
  Model.update(userInfo.sub, doc)
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

  res.set("Cache-control", `no-store`)
  return res.status(200).send(resp.result)
}

/**
 * Not used as a route - called from other routes to grant a badge to a user
 * @param {Object} req
 * @param {String} kind
 */
async function grantUser(req, kind) {
  // create new badge if needed
  let existingResp = await database.service
    .postPartitionView({
      db: DB,
      partitionKey: Model.PARTITION,
      ddoc: "badges",
      view: "user-badge-kind",
      key: [req.user.email.toLowerCase(), kind],
      limit: 1
    })
    .catch(err => {
      debug(JSON.stringify(err))
    })

  if (existingResp && existingResp.result.rows.length > 0) return

  const doc = Model.blankKind(kind)
  doc.email = req.user.email
  Model.update(req.user.sub, doc)

  const badgeResp = await database.service
    .postDocument({
      db: DB,
      document: doc
    })
    .catch(err => {
      debug(JSON.stringify(err))
    })

  if (!badgeResp) {
    debug(`badge ${kind} not created from ${req.user.email}`)
    return
  }

  return doc
}

exports.grant = grantUser

exports.selfGrant = async (req, res) => {
  const kind = req.params.kind

  // so far the only kind of badge you can self grant is the "made a list badge"
  if (!["madeList"].includes(kind))
    return res.status(403).send({ error: { message: "not authorized" } })

  let doc = await grantUser(req, kind)

  if (!doc) return res.status(200).send({ ok: false, message: "not created" })

  res.set("Cache-control", `no-store`)
  res.status(200).send({
    ok: true,
    message: "created",
    doc: { ...doc, _id: doc._id.slice(Model.PARTITION.length + 1) }
  })
}
