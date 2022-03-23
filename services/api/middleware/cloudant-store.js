const debug = require("debug")("CloudantStore")
const debugSession = debug.extend("session")
const expressSession = require("express-session")
const MemoryStore = require("memorystore")(expressSession)
const database = require("../services/database")

module.exports = function (session) {
  const noop = () => {}

  CloudantStore = function (options = {}) {
    debug("NEW", options)
    MemoryStore.call(this, options)
    this.partition = options.partition || "global"
    this.db = options.db || "sessions"
  }
  CloudantStore.prototype = Object.create(MemoryStore.prototype) //inherit the Animal object through the prototype chain

  CloudantStore.prototype.destroy = function (sid, cb = noop) {
    debug("DESTROY", sid)
    MemoryStore.prototype.destroy.call(this, sid, () => {
      let sids = sid
      if (!Array.isArray(sid)) sids = [sid]
      sids.forEach((id) => {
        try {
          // we do not need to wait for these calls to complete
          database.service
            .getDocument({
              docId: `${this.partition}:${id}`,
              db: this.db,
            })
            .then((response) => {
              let document = response.result
              database.service.deleteDocument({
                db: this.db,
                docId: document._id, // `docId` is required for DELETE
                rev: document._rev, // `rev` is required for DELETE
              })
            })
            .catch(() => {
              // ignore errors
            })
        } catch (error) {}
      })
    })
    cb(null)
  }

  CloudantStore.prototype.get = function (sid, cb = noop) {
    debug("GET", sid)
    MemoryStore.prototype.get.call(this, sid, async (err, result) => {
      try {
        if (!result) {
          let resp = await database.service
            .getDocument({
              docId: `${this.partition}:${sid}`,
              db: this.db,
            })
            .catch(() => {
              debug("not found")
            })

          if (resp && resp.result && resp.result.session) {
            debug(`GOT ${this.partition}:${sid} from db`)
            return cb(null, resp.result.session)
          }
        }
        return cb(err, result)
      } catch (error) {
        cb(error, null)
      }
    })
  }

  CloudantStore.prototype.set = function (sid, session, cb = noop) {
    debug("SET", sid)
    MemoryStore.prototype.set.call(this, sid, session, async (err, result) => {
      try {
        // no need to wait for the db update to finish
        cb(err, result)

        if (!err) {
          // get the revision
          let resp = await database.service
            .getDocument({
              docId: `${this.partition}:${sid}`,
              db: this.db,
            })
            .catch(() => {
              debug("not found")
            })
          let rev
          if (resp && resp.result && resp.result.session) rev = resp.result._rev

          database.service
            .putDocument({
              db: this.db,
              docId: `${this.partition}:${sid}`,
              document: {
                _id: `${this.partition}:${sid}`,
                _rev: rev,
                session: session,
              },
            })
            .then((response) => {
              debug(`stored session to db ${this.partition}:${sid}`)
            })
            .catch((err) => {
              debug(JSON.stringify(err))
              debug(`failed to store session to db ${this.partition}:${sid}`)
            })
        }
      } catch (error) {
        debug(error)
      }
    })
  }
  return CloudantStore
}
