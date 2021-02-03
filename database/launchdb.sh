#!/bin/bash
if [[ -f firstrun.sh ]]; then
    ./firstrun.sh &
fi
/opt/couchdb/bin/couchdb

