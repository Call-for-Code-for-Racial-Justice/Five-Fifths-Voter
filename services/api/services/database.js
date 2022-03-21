const debug = require("debug")("database")
const { CloudantV1 } = require("@ibm-cloud/cloudant")
const { BasicAuthenticator } = require("ibm-cloud-sdk-core")
const { IamAuthenticator } = require("ibm-cloud-sdk-core")

var service

/**
 * The CLOUDANTNOSQLDB_APIKEY environment variable is defined in production. So use it to connect to cloudant DB
 */
if (process.env.CLOUDANTNOSQLDB_APIKEY) {
  debug("using cloud database")
  let authenticator = new IamAuthenticator({
    apikey: process.env.CLOUDANTNOSQLDB_APIKEY,
  })
  service = new CloudantV1({
    authenticator: authenticator,
  })

  service.setServiceUrl(process.env.CLOUDANTNOSQLDB_URL)
} else {
  /**
   * We are probably running locally in development mode. Connect to local couch db
   */
  debug("using local database")
  let username = process.env.DB_USER || "adminXYZ"
  let password = process.env.DB_PASSWORD || "NotReallyImportantData"
  const authenticator = new BasicAuthenticator({
    username: username,
    password: password,
  })
  service = new CloudantV1({
    authenticator: authenticator,
  })
  let url = process.env.CLOUDANTNOSQLDB_URL || "http://localhost:8867"
  service.setServiceUrl(url)
}

service
  .getAllDbs()
  .then((response) => {
    debug(response.result)
  })
  .catch((err) => {
    debug("Cloudant db is not available.")
    debug("If you are working locally read the database/README.md file")
    debug(
      "For Early Voting to work, run the following command from the database dir: 'yarn build; yarn serve'"
    )
  })

module.exports = {
  service: service,
}
