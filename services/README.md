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
  - Develoeprs should request and maintain their own personal Google Civics API key to work with those services.
    -  https://console.cloud.google.com/ 
    -  https://developers.google.com/civic-information/docs/using_api
  - If you skip these steps Twitter information will not be available locally.
  - The `NODE_CACHE_DB*` parameters do not need to be changed.
  - The DEPLOYED version of all of the above are secrets maintained in Open Shift. You should **NEVER** add your .env file (or any other file with secrets) to git.
  - To test twitter directly you need to export the values from the .env file above like this:
    ```sh
    export $(cat .env | xargs)
    ```
    And then you can run twitter directly like `python3 twitter/Chatter.py flotus`

- [Follow instructions for creating Docker image](localdb/README.md)

- Start the services - will reload automatically when changes are mode

  ```sh
  docker run --detach --rm -p 27017:27017 --name five-fifths-voter-db five-fifths-voter/db
  cd services
  yarn
  yarn test
  ```

### Usage - Early Voting

- Get list of states (currently returns just GA)

#### HTTP request

```
GET http://localhost:8080/earlyvoting/states
```

#### Parameters

None

#### Response

```json
{ "version": "1.0.0", "list": ["GA"] }
```

- Get list of regions

#### HTTP request

```
GET http://localhost:8080/earlyvoting/regions
```

#### Parameters

| Parameter name            | Value  | Description                                    |
| ------------------------- | ------ | ---------------------------------------------- |
| Required query parameters |
| stateid                   | string | A valid state from the /earlyvoting/states API |
| Optional query parameters |
| NONE                      |

#### Response

```json
{ "version": "1.0.0", "list": ["ATKINSON", "FULTON"] }
```

- Get list of early voting locations

#### HTTP request

```
GET http://localhost:8080/earlyvoting/locations
```

#### Parameters

| Parameter name            | Value  | Description                                      |
| ------------------------- | ------ | ------------------------------------------------ |
| Required query parameters |
| stateid                   | string | A valid state from the /earlyvoting/states API   |
| locid                     | string | A valid region from the /earlyvoting/regions API |
| Optional query parameters |
| NONE                      |

#### Response

```json
{
  "state": "GA",
  "place": "ATKINSON",
  "scrapeURL": "",
  "dom": "\n        <table align=\"center\" border=\"0\" width=\"800\" cellpadding=\"4\" cellspacing=\"2\" id=\"Table1\">\n        <tbody>\n        <tr>\n        <td>\n        <p align=\"center\">&nbsp;</p>\n        <h3>Advanced Voting Location Information</h3>\n        <hr>\n        <strong>ATKINSON County</strong><br/>\n        <table align=\"left\" cellspacing=\"1\" cellpadding=\"1\">\n        <tr>\n        <td>\n        No Advance Polling Place Available.\n        </td>\n        </tr>\n        </table>\n        </td>\n        </tr>\n        </tbody>\n        </table>\n      "
}
```
