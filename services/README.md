## Services for this repo

### local dev

- Create a `services/.env` file with your own local credentials like this:

  ```sh
  NODE_TWITTER_API_KEY=YOUR_TWITTER_CREDENTIALS
  NODE_TWITTER_API_SECRET_KEY=YOUR_TWITTER_CREDENTIALS
  NODE_TWITTER_ACCESS_TOKEN=YOUR_TWITTER_CREDENTIALS
  NODE_TWITTER_ACCESS_TOKEN_SECRET=YOUR_TWITTER_CREDENTIALS
  NODE_TA_API_KEY=YOUR_WATSON_TONE_ANALYZER_API_KEY
  NODE_TA_API_URL=YOUR_WATSON_TONE_ANALYZER_URL
  NODE_NLU_API_KEY=YOUR_WATSON_NLU_API_KEY
  NODE_NLU_API_URL=YOUR_WATSON_NLU_URL
  NODE_CACHE_DB=webscrapecache
  NODE_CACHE_DB_USER=userXYZ
  NODE_CACHE_DB_PASSWORD=cacheDataIsNotPrivate
  NODE_CACHE_DB_URL=localhost:27017
  NODE_GOOGLE_CIVIC_API_KEY=YOUR_GOOGLE_CIVIC_API_KEY
  ```

  - To get the twitter results locally you will need to create your own twitter account and follow the Twitter developer instructions for creating and API key etc. https://developer.twitter.com/en/apps
  - For the tone analyzer and NLU use your own IBM Cloud account to create these services and get the API keys and URLs
  - Developers should request and maintain their own personal Google Civics API key to work with those services.
    - https://console.cloud.google.com/
    - https://developers.google.com/civic-information/docs/using_api
  - If you skip these steps Twitter information will not be available locally.
  - The `NODE_CACHE_DB*` parameters do not need to be changed.
  - The DEPLOYED version of all of the above are secrets maintained as environment variables. You should **NEVER** add your .env file (or any other file with secrets) to git.
  - To test twitter directly you need to export the values from the .env file above like this:
    ```sh
    export $(cat .env | xargs)
    ```
    And then you can run twitter directly like `python3 twitter/Chatter.py flotus`

- [Follow instructions for creating Docker image](localdb/README.md)

- Start the services - will reload automatically when changes are mode

  ```sh
  cd database
  yarn serve # start the local database
  cd ../services
  yarn
  yarn serve
  ```

### Usage - Early Voting

- Get list of states (currently returns just GA)

#### HTTP request

```
GET http://localhost:3333/earlyvoting/
```

#### Response

```json
{ "version": "1.0.0", "list": ["GA"] }
```

- Get list of regions

#### HTTP request

```
GET http://localhost:3333/earlyvoting/:state:
```

#### Response

```json
{ "version": "1.0.0", "list": ["ATKINSON", "FULTON"] }
```

- Get list of early voting locations

#### HTTP request

```
GET http://localhost:3333/earlyvoting/:state:/:region:
```

#### Response

```json
{
  "earlyVoteSites": [
    {
      "address": {
        "electionName": "NOVEMBER 3, 2020 GENERAL/SPECIAL ELECTION",
        "line1": "10 PARK PLAZA ALPHARETTA, GA 30009",
        "locationName": "ALPHARETTA BRANCH LIBRARY"
      },
      "latitude": 34.0742279,
      "longitude": -84.2919567,
      "sources": [
        {
          "name": "Five Fifths Voter",
          "official": true
        }
      ]
    }
  ],
  "fivefifthsdata": {
    "collection": "early",
    "earlyVoteSitesProvided": true,
    "elections": ["NOVEMBER 3, 2020 GENERAL/SPECIAL ELECTION"],
    "place": "FULTON",
    "retrieved": 1647833567126,
    "state": "GA"
  }
}
```

## Code Engine Deployment

**Note** This section is for debugging the IBM Cloud CE deployment. It is not needed for local development.

- [Install the code engine command line](https://cloud.ibm.com/docs/codeengine?topic=codeengine-cli)

- Login and target the CE project

  ```sh
  ibmcloud login --apikey @~/projects/five-fifths-voter.json -g cfc-team-fivefifths -r us-south
  ibmcloud ce project select --name fivefifthsvoter-next
  ```

- Deploy new version of the services app

  ```sh
  # Build
  cd ui
  yarn build
  cd ../services
  docker build -t fivefifthsvoter-next .
  # Push to IBM registry
  ibmcloud cr login
  docker tag fivefifthsvoter-next:latest us.icr.io/fivefifthsvoter/fivefifthsvoter-next:latest
  docker push us.icr.io/fivefifthsvoter/fivefifthsvoter-next:latest
  docker push us.icr.io/fivefifthsvoter/fivefifthsvoter-next:latest us.icr.io/fivefifthsvoter/fivefifthsvoter-next:$(date '+%FT%H%M%S')
  # Roll out new version of the app
  ibmcloud ce app update -n fivefifthsvoter
  ```

- Show the latest logs

  ```sh
  ibmcloud ce app logs -f -n fivefifthsvoter
  ```
