const debug = require("debug")("access:controller")
const database = require("../services/database")
const Model = require("../models/model-access")
const lodash = require("lodash")
const badgeController = require("./controller-badges")

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

  // lets see if this user already has access to this team
  let existingResp = await database.service
    .postPartitionView({
      db: DB,
      partitionKey: Model.PARTITION,
      ddoc: "teams",
      view: "access-team-user",
      key: [doc.email, teamId],
      includeDocs: true,
      limit: 1,
    })
    .catch((err) => {
      debug(JSON.stringify(err))
    })

  // if this user already has access to this team we cannot create a new access doc
  if (existingResp && existingResp.result.rows.length > 0) {
    let accessDoc = existingResp.result.rows[0].doc
    return res.status(409).send({
      ok: false,
      message: "not created",
      existing_access: accessDoc._id.slice(Model.PARTITION.length + 1),
    })
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
    res.set("Cache-control", `no-store`)
    res.status(200).send({
      ok: true,
      message: "created",
      doc: { ...doc, _id: doc._id.slice(Model.PARTITION.length + 1) },
    })
  } else res.status(409).send({ ok: false, message: "not created" })
}

exports.list = async (req, res, next) => {
  debug(`list:${req.user.email}`)

  // create new badge if needed
  await badgeController.grant(req, "createAccount")

  var resp = await database.service
    .postPartitionView({
      db: DB,
      partitionKey: Model.PARTITION,
      ddoc: "teams",
      view: "access",
      keys: [req.user.email.toLowerCase(), "public"],
      includeDocs: true,
    })
    .catch((err) => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  let accessDocs = resp.result.rows.map((row) => {
    return { ...row.doc, _id: row.doc._id.slice(Model.PARTITION.length + 1) }
  })
  accessDocs.sort(function (a, b) {
    return b.date_modified.localeCompare(a.date_modified)
  })
  accessDocs = lodash.sortedUniqBy(accessDocs, (doc) => `${doc.email}?${doc.team}`)

  publicInvites = accessDocs.filter((doc) => doc.email === "public")
  publicTeams = publicInvites.map((doc) => doc.team)
  debug(`public teams: ${publicTeams}`)

  specificInvites = accessDocs.filter((doc) => doc.email !== "public")
  specificTeams = specificInvites.map((doc) => doc.team)
  debug(`specific teams: ${publicTeams}`)

  removePublic = lodash.intersection(publicTeams, specificTeams)
  debug(`remove public teams: ${removePublic}`)

  // remove docs where we have a generic "public" invite but we also have a specific invite for this user.
  accessDocs = accessDocs.filter(
    (doc) => doc.email !== "public" || !removePublic.includes(doc.team)
  )

  res.set("Cache-control", `private,max-age=300, must-revalidate, proxy-revalidate`) // let browser cache this for 5 minutes
  return res.status(200).send(accessDocs)
}

exports.listTeam = async (req, res, next) => {
  const teamId = req.params.teamId

  var resp = await database.service
    .postPartitionView({
      db: DB,
      partitionKey: Model.PARTITION,
      ddoc: "teams",
      view: "access-team",
      key: teamId,
      includeDocs: true,
    })
    .catch((err) => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  let accessDocs = resp.result.rows.map((row) => {
    return { ...row.doc, _id: row.doc._id.slice(Model.PARTITION.length + 1) }
  })
  accessDocs.sort(function (a, b) {
    return b.date_modified.localeCompare(a.date_modified)
  })
  accessDocs = lodash.sortedUniqBy(accessDocs, (doc) => `${doc.email}?${doc.team}`)

  res.set("Cache-control", `private,max-age=300, must-revalidate, proxy-revalidate`) // let browser cache this for 5 minutes
  return res.status(200).send(accessDocs)
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
  else {
    res.set("Cache-control", `private,max-age=300, must-revalidate, proxy-revalidate`) // let browser cache this for 5 minutes
    res.status(200).send({ ...doc, _id: doc._id.slice(Model.PARTITION.length + 1) })
  }
}

exports.update = async (req, res, next) => {
  const teamId = req.params.teamId
  const docId = req.params.id
  var update = req.body

  // get current document
  var resp = await database.service
    .getDocument({ db: DB, docId: `${Model.PARTITION}:${docId}` })
    .catch((err) => {
      debug(JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  let doc = resp.result
  if (doc.team != teamId) return res.status(404).send({ ok: false, message: "not found" })
  if (update.team && doc.team != update.team)
    return res.status(400).send({ ok: false, message: "cannot change team in existing access doc" }) // cannot update slug
  doc = { ...doc, ...update, _id: doc._id, _rev: doc._rev }
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

  res.set("Cache-control", `no-store`)
  return res
    .status(200)
    .send({ ...resp.result, id: resp.result.id.slice(Model.PARTITION.length + 1) })
}

exports.delete = async (req, res, next) => {
  const teamId = req.params.teamId
  const docId = req.params.id

  // get current document
  var resp = await database.service
    .getDocument({ db: DB, docId: `${Model.PARTITION}:${docId}` })
    .catch((err) => {
      debug("error", JSON.stringify(err))
    })
  if (!resp) return res.status(404).send({ ok: false, message: "not found" })

  let doc = resp.result
  if (doc.team != teamId) return res.status(404).send({ ok: false, message: "not found" })

  let valid = Model.validate(doc)
  if (!valid) return res.status(406).send({ ok: false, error: Model.validate.errors })

  resp = await database.service
    .deleteDocument({ db: DB, docId: doc._id, rev: doc._rev })
    .catch((err) => {
      debug(`error deleting (${doc._id}, ${doc._rev})`, JSON.stringify(err))
    })
  if (!resp) return res.status(417).send({ ok: false, message: "not found" })

  res.set("Cache-control", `no-store`)
  return res.status(200).send({ ok: true, message: docId, status: "deleted" })
}
