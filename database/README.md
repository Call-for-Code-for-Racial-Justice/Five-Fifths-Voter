# Emulate deployed Cloudant db for local development

The deployed version of this app use a Cloudant db to store cache data but this Docker image does not get deployed. Instead it emulates the deployed version of the db so that you can develop code locally. If you are working on the early voting locations or absentee drop off locations, you will want to follow these instructions.

To do development work locally then you need a Couch db that is configured similarly to the deployed db. You might be tempted to work directly with the deployed db but that does not seem like a good idea. If you find a use case for that, document it here but for now lets use a docker image for our local Couch db.

## Dependencies

- docker [Install Docker](https://docs.docker.com/engine/install/)
- RECOMMENDED: [jq](https://stedolan.github.io/jq/)

## Build and Run the Docker image
```sh
yarn build
yarn serve
```

## Advanced build with Docker

This only needs to be done once unless the database schema or the sample/mock data changes.

  ```sh
  docker build -t five-fifths-voter/db .
  ```

## Start the DB Docker image

```sh
docker run --detach --rm -p 8888:5984 --name localdev-db five-fifths-voter/db
```

## Test if your database is available

```sh
curl localhost:8888/_up
```

Or, if you installed the awesome jq command line tool, try it now.

```sh
curl localhost:8888/_up|jq
```

You should get a response like:

```json
{
  "couchdb": "Welcome",
  "version": "3.1.1",
  "git_sha": "ce596c65d",
  "uuid": "426257a3ee552538c11bfb4f037316bd",
  "features": [
    "access-ready",
    "partitioned",
    "pluggable-storage-engines",
    "reshard",
    "scheduler"
  ],
  "vendor": {
    "name": "The Apache Software Foundation"
  }
}
```

You are ready to work with the `../server` or the `../ui` code now.

## Start the DB Docker image - persistent mode

If you include the `--rm` command on the docker run command then when the image stops running it is automatically deleted and so if you start it again it will not have any data that you may have changed/created. If you want to the data to persist, do not use the `--rm` parameter. Please look at the Docker command line help for more information.

- start without the `--rm`

  ```sh
  docker run --detach -p 8888:5984 --name test-db client-cocreate/db
  ```

- stop the image

  ```sh
  docker stop test-db
  ```

- restart the image

  ```sh
  docker start -ia test-db
  ```

- remove the image

  Do this if you are done testing with your data

  ```sh
  docker rm test-db
  ```

  You can still start the server again with fresh data with the `docker run` command above.
