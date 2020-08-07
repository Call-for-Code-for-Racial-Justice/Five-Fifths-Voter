## Services for this repo
### local dev
```sh
cd services
yarn
yarn serve
```
It not not currently hot updatable. Meaning if you make a change you have to stop/start to have it picked up.

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
{"version":"1.0.0","list":["GA"]}
```

- Get list of regions
#### HTTP request
```
GET http://localhost:8080/earlyvoting/regions
```
#### Parameters
| Parameter name | Value | Description |
| -------------- | ----- | ----------- |
| Required query parameters |
| stateid | string | A valid state from the /earlyvoting/states API |
| Optional query parameters |
| NONE|

#### Response
```json
{"version":"1.0.0","list":["ATKINSON","FULTON"]}
```

- Get list of early voting locations
#### HTTP request
```
GET http://localhost:8080/earlyvoting/locations
```
#### Parameters
| Parameter name | Value | Description |
| -------------- | ----- | ----------- |
| Required query parameters |
| stateid | string | A valid state from the /earlyvoting/states API |
| locid | string | A valid region from the /earlyvoting/regions API |
| Optional query parameters |
| NONE|

#### Response
```json
{"state":"GA","place":"ATKINSON","scrapeURL":"","dom":"\n        <table align=\"center\" border=\"0\" width=\"800\" cellpadding=\"4\" cellspacing=\"2\" id=\"Table1\">\n        <tbody>\n        <tr>\n        <td>\n        <p align=\"center\">&nbsp;</p>\n        <h3>Advanced Voting Location Information</h3>\n        <hr>\n        <strong>ATKINSON County</strong><br/>\n        <table align=\"left\" cellspacing=\"1\" cellpadding=\"1\">\n        <tr>\n        <td>\n        No Advance Polling Place Available.\n        </td>\n        </tr>\n        </table>\n        </td>\n        </tr>\n        </tbody>\n        </table>\n      "}
```

