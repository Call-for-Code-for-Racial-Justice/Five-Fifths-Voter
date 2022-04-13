const debug = require("debug")("teams:model")
const Ajv = require("ajv")
const ajv = new Ajv({ removeAdditional: true })
const lodash = require("lodash")
const { v4: uuid } = require("uuid")

const DOC_TYPE = "election"
const PARTITION = "teams"

const schema = {
  type: "object",
  properties: {
    _id: { type: "string" }, // cloudant
    _rev: { type: "string" }, // cloudant
    doc_type: { type: "string", const: DOC_TYPE },
    creator_sub: { type: "string" }, // unique id from APP ID
    date_created: { type: "string" }, // Date.toISOString()
    date_modified: { type: "string" }, // Date.toISOString()
    team: { type: "string", minLength: 1 }, // slug for the team
    google_id: { type: "string", minLength: 1 }, // A google id for this election if it exists https://developers.google.com/civic-information/docs/v2/elections
    name: { type: "string", minLength: 1 },
    election_day: { type: "string" }, // Date.toISOString()
    division: { type: "string" }, // https://developers.google.com/civic-information/docs/v2/divisions
  },
  required: ["doc_type", "team", "name", "election_day"],
  additionalProperties: false,
}

const validate = ajv.compile(schema)

module.exports = {
  validate,

  PARTITION,

  /**
   * Get a blank document with required fields
   * @returns { email: "", team: "", status: "invited" }
   */
  blank() {
    return lodash.cloneDeep({
      _id: `${PARTITION}:${uuid().replace(/-/g, "")}`,
    })
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
  update(sub, doc, teamId) {
    if (!doc._id) doc._id = `${PARTITION}:${uuid().replace(/-/g, "")}`
    if (!doc.creator_sub) doc.creator_sub = sub
    if (!doc.date_created) doc.date_created = new Date().toISOString()
    doc.team = teamId
    doc.date_modified = new Date().toISOString()
    doc.doc_type = DOC_TYPE
    debug("update", doc)
  },
}
