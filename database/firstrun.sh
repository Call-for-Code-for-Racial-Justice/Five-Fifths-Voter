#!/bin/bash

# /opt/couchdb/bin/couchdb 2> /dev/null > /dev/null &
# wait for db to be ready
while [[ ! `curl localhost:5984/_up 2> /dev/null` ]]; do printf "."; sleep 1; done

curl --user @NODE_DB_USER@:@NODE_DB_PASSWORD@ -X PUT http://127.0.0.1:5984/_users
curl --user @NODE_DB_USER@:@NODE_DB_PASSWORD@ -X PUT http://127.0.0.1:5984/_replicator

# set the timeout for clients to be
curl --user @NODE_DB_USER@:@NODE_DB_PASSWORD@ --request PUT --header "Content-Type:application/json" --data '"28800"' http://127.0.0.1:5984/_node/nonode@nohost/_config/couch_httpd_auth/timeout

# load the mock data
for dbdir in `find mock/* -maxdepth 0 -type d `; do
  db=$(basename $dbdir)
  echo $db

  if [[ -f status ]]; then rm status; fi
  touch status
  while ! grep -qE '"ok"|"file_exists"' status; do
    echo "creating database $db"
    curl --request PUT --user @NODE_DB_USER@:@NODE_DB_PASSWORD@ http://localhost:5984/$db > status
    cat status
    sleep 1
  done
  if [[ -f status ]]; then rm status; fi

  for doc in `find mock/$db/ -type f`; do
    echo loading $doc
	  curl --request POST --user @NODE_DB_USER@:@NODE_DB_PASSWORD@ --header "Content-Type:application/json" --data @$doc http://localhost:5984/$db
  done

  # create any design docs (indexes etc)
  for doc in `find design/$db/ -type f`; do
    echo "creating design doc $doc"
    docname=$(basename $doc .json)
	  curl --request PUT --user @NODE_DB_USER@:@NODE_DB_PASSWORD@ --header "Content-Type:application/json" --data @$doc http://localhost:5984/$db/_design/$docname
  done

  # create the allDocs view
  curl --request PUT --user @NODE_DB_USER@:@NODE_DB_PASSWORD@ --header "Content-Type:application/json" --data @design/allDocs.json http://localhost:5984/$db/_design/allDocs
done

if [[ -f status ]]; then rm status; fi
shred -u "$0" # delete this file
