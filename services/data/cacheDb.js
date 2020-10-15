const { MongoClient } = require('mongodb');

const staleTime = 86400000; // 24 hours in milliseconds
//const staleTime = 225 * 1000; // debug

const connect_options = {
  useUnifiedTopology: true,
};
const dbUri =
  'mongodb://' +
  process.env.NODE_CACHE_DB_USER +
  ':' +
  process.env.NODE_CACHE_DB_PASSWORD +
  '@' +
  process.env.NODE_CACHE_DB_URL +
  '/' +
  process.env.NODE_CACHE_DB;
const client = new MongoClient(dbUri, connect_options);
const connection = client.connect();

connection
  .then((info) => {
    console.log('Connected to Cache DB');
  })
  .catch((reason) => {
    console.error('\x1b[31m%s\x1b[0m', `Not connected to Cache DB: ${reason}`);
    console.log('\x1b[31m%s\x1b[0m', 'Early Voting in GA will not be available');
    console.log('\x1b[33m%s\x1b[0m', 'If you are working locally read the services/README.md file');
    console.log(
      '\x1b[33m%s\x1b[0m',
      "For Early Voting to work, run the following command: 'docker run --detach --rm -p 27012:27017 --name embrace-db embrace-the-vote/db'"
    );
    console.log('\x1b[32m%s\x1b[0m', 'The server is still listening.');
  });

exports.connect = function () {
  try {
    if (!client.isConnected()) connection = client.connect();
    return connection;
  } catch (error) {
    console.error('No Cache DB connection');
  }
};

exports.db = function () {
  return client.db();
};
exports.staleTime = staleTime;
