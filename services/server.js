require("dotenv-flow").config({ default_node_env: "development" })
const debug = require("debug")("server")
const app = require("./app")

const port = process.env.PORT || 3333

debug(`Service listening on port ${port}`)
app.listen(port)
