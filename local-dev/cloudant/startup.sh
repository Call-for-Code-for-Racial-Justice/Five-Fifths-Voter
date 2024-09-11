#!/bin/bash
set -e
while [[ $(curl http://localhost:5984/_up 2>/dev/null) != *"ok"* ]]; do
  echo waiting for cloudant
  sleep 1s
done
echo create _users database
curl --user ${COUCHDB_USER}:${COUCHDB_PASSWORD} -X PUT http://localhost:5984/_users  2>/dev/null
curl --user ${COUCHDB_USER}:${COUCHDB_PASSWORD} -X PUT http://localhost:5984/_replicator  2>/dev/null
# set the timeout for clients to be 30 days
curl --user ${COUCHDB_USER}:${COUCHDB_PASSWORD} \
  --request PUT \
  --header "Content-Type:application/json" \
  --data '"2592000"' http://localhost:5984/_node/nonode@nohost/_config/couch_httpd_auth/timeout  2>/dev/null
curl --user ${COUCHDB_USER}:${COUCHDB_PASSWORD} \
  --request PUT \
  --header "Content-Type:application/json" \
  --data '"error"' http://localhost:5984/_node/nonode@nohost/_config/log/level  2>/dev/null
curl --user ${COUCHDB_USER}:${COUCHDB_PASSWORD} \
  --request PUT http://localhost:5984/${COUCH_DB}?partitioned=true  2>/dev/null
