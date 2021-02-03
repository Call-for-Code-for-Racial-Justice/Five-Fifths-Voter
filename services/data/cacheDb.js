const staleTime = 86400000; // 24 hours in milliseconds
//const staleTime = 225 * 1000; // debug

function CreateNamedDB(name, callback) {
  return cloudant.db.create(name);
}

function DeleteNamedDB(name, callback) {
  return cloudant.db.destroy(name);
}

function CreateViewInDB(dbName, viewName, viewDoc, callback) {
  var currentDB = cloudDB.db.use(dbName);
  currentDB.insert(viewDoc, "_design/" + viewName, callback);
}

var cloudDB;

/**
 * The VCAP_SERVICES environment variable is defined in production. So use it to connect to cloudant DB
 */
if (process.env.VCAP_SERVICES) {
  // Load the Cloudant library.
  var vcap_services = JSON.parse(process.env.VCAP_SERVICES);
  var Cloudant = require("@cloudant/cloudant");
  var cloudant = Cloudant({
    vcapInstanceName: "five-fifth-voters-cloudant-prod",
    vcapServices: vcap_services,
  });

  cloudant.db.list(function (err, body) {
    if (err) {
      console.error(err);
      throw "cloudant db is not available";
    } else {
      console.log("cloudant dbs", body);
    }
  });

  cloudDB = cloudant;
} else {
  /**
   * The VCAP_SERVICES environment variable is NOT defined so we expect we are running locally in development mode. Use the NODE_DB_URL to connect to couch db
   */

  const nano = require("nano")(process.env.NODE_DB_URL);

  nano.db.list(function (err, body) {
    if (err) {
      console.error("\x1b[31m%s\x1b[0m", `Not connected to Cache DB: ${err}`);
      console.log(
        "\x1b[31m%s\x1b[0m",
        "Early Voting in GA will not be available"
      );
      console.log(
        "\x1b[33m%s\x1b[0m",
        "If you are working locally read the database/README.md file"
      );
      console.log(
        "\x1b[33m%s\x1b[0m",
        "For Early Voting to work, run the following command from the database dir: 'yarn build; yarn serve'"
      );
      console.log("\x1b[32m%s\x1b[0m", "The server is still listening.");
    } else {
      console.log("dbs", body);
    }
  });

  cloudDB = nano;
}

module.exports = {
  db: cloudDB,
  CreateNamedDB: CreateNamedDB,
  DeleteNamedDB: DeleteNamedDB,
  staleTime: staleTime,
};
