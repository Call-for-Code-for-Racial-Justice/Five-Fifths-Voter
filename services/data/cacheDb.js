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
    console.error(`Not connected to Cache DB: ${reason}`);
    throw 'Not connected to Cache DB';
  });

exports.connect = function () {
  if (!client.isConnected()) connection = client.connect();
  return connection;
};

exports.db = function () {
  return client.db();
};
exports.staleTime = staleTime;
