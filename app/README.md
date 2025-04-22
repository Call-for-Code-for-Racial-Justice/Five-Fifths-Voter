# Five Fifths Voter site runs as a nuxt application on IBM Cloud

See the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
cd app # the directory with this README
npm install
```

## Development Server

Start the development server on `http://localhost:4007`:

```bash
npm run dev
```

If you are working on the "Journey" page, you will want to start
the local servers to access the mock Google civis APIs and other APIs.

1. docker compose up

   ```shell
   cd local-dev
   docker compose up
   ```

2. Test connections

   ```shell
   curl --request GET \
     --url 'http://localhost:4514/civicinfo/v2/elections?key=local-dev'
   ```

## Get the latest data locally

The local data available via the local cloudant database is usually sufficient for local development but if
there is a need to update the local data, here is how to do that:

1. Get an IAM API key for the database. These are like username/passwords, so they should never be added to the
   Git repo. Get one from anyone who has access to the cloudant database.
2. Install [@cloudant/couchbackup](https://www.npmjs.com/package/@cloudant/couchbackup). This tool is awesome so if you
   have not already [added a star to the repo](https://github.com/IBM/couchbackup) now is a good time.
3. Make a local backup of the `voter55` db.

   ```shell
   couchbackup \
     --mode shallow \
     --url https://<your-instance-url>/ \
     --db votter55 \
     --iam-api-key YOUR-IAM-API-KEY-HERE \
     --output backup.txt
   ```

   Sample output

   ```
    ================================================================================
    Performing backup on https://.../voter55 using configuration:
    {
    "bufferSize": 500,
    "log": "/var/folders/x7/_hxvmlq51p36m3h6x4zm6r6r0000gn/T/couchbackup-jjx3Rj/1718830442762",
    "mode": "full",
    "parallelism": 5,
    "requestTimeout": 120000,
    "resume": false,
    "iamApiKey": "****"
    }
    ================================================================================
    couchbackup:backup Fetching all database changes... +0ms
    couchbackup:backup:batch Total batches received: 1 +0ms
    couchbackup:backup:batch Total batches received: 2 +1ms
    ...
   ```

4. Follow the [README](../README.md#start-the-local-database) instructions to "Start the local database"
5. Delete your current `local_55voter` db. Go to http://localhost:6143/\_utils/#/\_all_dbs click on the trash can icon and
   delete the db.
6. Create a new `local_55voter` db. Go to http://localhost:6143/\_utils/#/\_all_dbs click on "Create Database". Set the name to **local_55voter** and select "**Partitioned**".
7. Load this new database from the backup you made in step 3.

   ```shell
   couchrestore \
     --url http://admin:ThisIsGibberish@0.0.0.0:6143 \
     --db local_55voter < backup.txt
   ```

   Sample output

   ```
   ================================================================================
   Performing restore on http://****:****@0.0.0.0:6143/local_55voter using configuration:
   {
   "bufferSize": 500,
   "parallelism": 5,
   "requestTimeout": 120000
   }
   ================================================================================
   couchbackup:restore:batch Restored batch ID: 0 Total document revisions restored: 500 Time: 1.99 +0ms
   couchbackup:restore:batch Restored batch ID: 1 Total document revisions restored: 1000 Time: 2.013 +23ms
   ...
   ```

8. Go get some lunch or maybe a nice cup of coffee. The local couch db is busy rebuilding indexes and databasing and
   just generally soaking up some CPU sunshine. You should too. Maybe walk around the park? Or scroll your socials. Maybe
   now is a good time to call your brother and tell him that it was your fault that he got in trouble with mom that time.
9. **OPTIONAL** Depending on what you are working on, probably now is a good time to check in your db updates.
   ```shell
   git add local-dev/cloudant/data
   ```

## Production

See the [deployment](../doc/DEPLOYMENT.md) documentation.
This is only interesting if you are interested in deploying somewhere else.
You do not need this for doing local development.
