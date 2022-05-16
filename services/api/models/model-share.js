const debug = require("debug")("share:model")
const Ajv = require("ajv")
const ajv = new Ajv({ removeAdditional: true })
const lodash = require("lodash")
const { v4: uuid } = require("uuid")

const DOC_TYPE = "share"
const PARTITION = "share"

const schema = {
  type: "object",
  properties: {
    // DO  NOT SAVE ANYTHING PERSONALLY IDENTIFIABLE HERE - SHARES ARE ANONYMOUS
    _id: { type: "string" }, // cloudant
    _rev: { type: "string" }, // cloudant
    doc_type: { type: "string", const: DOC_TYPE },
    date_created: { type: "string" }, // Date.toISOString()
    date_modified: { type: "string" }, // Date.toISOString()
    local_data: { type: "object" }, // Local browser data to be shared
  },
  required: ["doc_type", "local_data"],
  additionalProperties: false,
}

const validate = ajv.compile(schema)

module.exports = {
  validate,

  PARTITION,

  /**
   * Update the dates and creator
   * @param {string} sub
   * @param {object} doc
   */
  update(doc) {
    if (!doc._id) doc._id = `${PARTITION}:${uuid().replace(/-/g, "")}`
    if (!doc.date_created) doc.date_created = new Date().toISOString()
    doc.date_modified = new Date().toISOString()
    doc.doc_type = DOC_TYPE
    debug("update", doc)
  },
}
