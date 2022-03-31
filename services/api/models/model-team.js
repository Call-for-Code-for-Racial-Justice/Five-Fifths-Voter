const debug = require("debug")("teams:model")
const Ajv = require("ajv")
const ajv = new Ajv({ removeAdditional: true })
const lodash = require("lodash")

const DOC_TYPE = "team"
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
    display_name: { type: "string" },
    description: { type: "string" },
    slug: { type: "string" },
  },
  required: ["display_name", "description", "slug", "doc_type"],
  additionalProperties: false,
}

const validate = ajv.compile(schema)

module.exports = {
  validate,

  PARTITION,

  /**
   * Get a blank document with required fields
   * @returns { display_name: string, description: string, slug:"" }
   */
  blank() {
    return lodash.cloneDeep({ display_name: "", description: "", slug: "" })
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
    if (!doc._id) doc._id = `${PARTITION}:${doc.slug}` // one team document per slug
    if (!doc.creator_sub) doc.creator_sub = sub
    if (!doc.date_created) doc.date_created = new Date().toISOString()
    doc.date_modified = new Date().toISOString()
    doc.doc_type = DOC_TYPE
    debug("update", doc)
  },
}
