# How to Deploy

Consider these instructions temporary or as a template for creating a Travis or other CI script. Ultimately, when the repo is tagged for a release steps like these should execute the CI steps to deploy a new version of the app.

1. Create an api key in your _IN THE ACCOUNT THAT IS HOSTING THE APP, not your personal account UNLESS you are the owner_ and save it somewhere as json
   ```json
   {
     "name": "some-name",
     "description": "some description",
     "createdAt": "2020-07-10T22:54+0000",
     "apikey": "-LYxYYxxYYxxYxxx9xxY9x9xY9xxYYY9xxYY_xYxYxxL"
   }
   ```
2. Install ibmcloud cli https://cloud.ibm.com/docs/cli?topic=cli-getting-started
3. Install cloud foundry plugin `ibmcloud cf install`
4. Update plugins `ibmcloud plugin update`
5. Login to ibmcloud `ibmcloud login --apikey @~/projects/ibmcloud-apikey.json`
6. `ibmcloud target -g cfc-team-fivefifths -o cfc-team-external-apps -s cfc-fivefifths-space --cf-api https://api.us-south.cf.cloud.ibm.com`
7. `cd services`
8. `yarn deploy`
9. `cd ../ui`
10. `yarn deploy`
