const expressSession = require("express-session")
const MemoryStore = require("memorystore")(expressSession)
const CloudantStore = require("./cloudant-store")(expressSession)
const memoryStore = new CloudantStore({
  checkPeriod: 3600000, // prune expired entries every hour
})

// console.log("CloudantStore", memoryStore)
var session = memoryStore.get("123")
console.log(session)
