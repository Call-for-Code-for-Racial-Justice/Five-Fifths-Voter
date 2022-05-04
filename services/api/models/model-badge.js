const debug = require("debug")("badge:model")
const Ajv = require("ajv")
const ajv = new Ajv({ removeAdditional: true })
const lodash = require("lodash")
const { v4: uuid } = require("uuid")

const DOC_TYPE = "badge"
const PARTITION = "badges"

const schema = {
  type: "object",
  properties: {
    _id: { type: "string" }, // cloudant
    _rev: { type: "string" }, // cloudant
    doc_type: { type: "string", const: DOC_TYPE },
    creator_sub: { type: "string" }, // unique id from APP ID
    date_created: { type: "string" }, // Date.toISOString()
    date_modified: { type: "string" }, // Date.toISOString()
    email: { type: "string" },
    kind: { type: "string" },
    name: { type: "string" },
    image: { type: "string" },
    description: { type: "string" },
    seen: { type: "boolean" },
  },
  required: ["kind", "name", "image", "description", "seen"],
  additionalProperties: false,
}

const validate = ajv.compile(schema)

module.exports = {
  validate,

  PARTITION,

  /**
   * Get a blank document with required fields
   */
  blankJoined() {
    return lodash.cloneDeep({
      kind: "joinTeam",
      name: "Team up",
      image: "/images/badges/noun-collaboration-2909353.svg",
      description:
        "You earned a badge for joining a team! Make a plan to vote. Take someone from your team with you.",
      seen: false,
    })
  },
  blankStartTeam() {
    return lodash.cloneDeep({
      kind: "createTeam",
      name: "Started Team",
      image: "/images/badges/noun-leadership-2909348.svg",
      description:
        "You earned a badge for creating a team! Get your team together and set your voting goals.",
      seen: false,
    })
  },
  blankLogin() {
    return lodash.cloneDeep({
      kind: "createAccount",
      name: "Created account",
      image: "/images/badges/noun-politician-2909359.svg",
      description: "You earned a badge for logging in! Make a plan to vote.",
      seen: false,
    })
  },
  blankMadeList() {
    return lodash.cloneDeep({
      kind: "madeList",
      name: "Created candidate list",
      image: "/images/badges/noun-food-critic-2909382.svg",
      description:
        "You earned a badge for creating a list of candidates! Take your list to your polling location and vote!",
      seen: false,
    })
  },
  blankKind(kind) {
    switch (kind) {
      case "joinTeam":
        return this.blankJoined()
      case "createTeam":
        return this.blankStartTeam()
      case "createAccount":
        return this.blankLogin()
      case "madeList":
        return this.blankMadeList()

      default:
        return {}
    }
  },

  /**
   * Remove special properties from doc in anticipation of using it to create a new doc
   * @param {object} doc
   */
  creating(doc) {
    delete doc._id
    delete doc._rev
    delete doc.creator_sub
    delete doc.date_created
  },

  /**
   * Update the dates and creator
   * @param {string} sub
   * @param {object} doc
   */
  update(sub, doc) {
    if (!doc._id) doc._id = `${PARTITION}:${uuid().replace(/-/g, "")}`
    if (!doc.creator_sub) doc.creator_sub = sub
    if (!doc.date_created) doc.date_created = new Date().toISOString()
    if (doc.email) doc.email = doc.email.toLowerCase()
    doc.date_modified = new Date().toISOString()
    doc.doc_type = DOC_TYPE
    debug("update", doc)
  },
}
