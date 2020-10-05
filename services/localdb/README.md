# Emulate deployed Mongo db for local development

The deployed version of this app use an ephemeral Mongo db to store cache data but normally you should not care about that. If however you are working on the scaping code that stores results in the Mongo db then, you do/should care.

To do development work locally then you need a Mongo db that is configured similarly to the deployed db. You might be tempted to work directly with the deployed db but that does not seem like a good idea. If you find a use case for that, document it here but for now lets use a docker image for our local Mongo db.

## Dependencies

- docker [Install Docker](https://docs.docker.com/engine/install/)
- OPTIONAL: [Mongo Shell](https://docs.mongodb.com/manual/mongo/#download-the-mongo-shell)

## Build the DB Docker image

This only needs to be done once.

```sh
cd services/localdb
docker build -t embrace-the-vote/db .
```

## Start the DB Docker image

```sh
# assuming that your localhost port 27017 is not taken. If it is then change the first number to something else. Maybe
# -p 3333:27017
docker run --detach --rm -p 27017:27017 --name embrace-db embrace-the-vote/db
```

## Test if your database is available

```sh
mongo --username=userXYZ --password=cacheDataIsNotPrivate localhost:27017/webscrapecache services/localdb/testConnection.js
```

```
MongoDB shell version v3.6.20
connecting to: mongodb://localhost:27017/webscrapecache?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("63075c78-e608-4a37-86f4-3cafc4da5c51") }
MongoDB server version: 3.6.3
```

If you do not have the mongo shell, you can kinda test with curl like this:

```sh
curl http://localhost:27017
```

This means it connected ok

```
curl: (52) Empty reply from server
```

BUT this means something is not working right

```
curl: (7) Failed to connect to localhost port 27017: Connection refused
```

## Stop the Mongo db/Docker image

```sh
docker stop embrace-db
docker rm embrace-db
```
