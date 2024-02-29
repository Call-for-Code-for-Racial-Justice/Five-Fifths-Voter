# How to Deploy

Consider these instructions temporary or as a template for creating a Travis or other CI script. Ultimately, when the repo is tagged for a release steps like these should execute the CI steps to deploy a new version of the app.

Specifically, for the https://www.fivefifthsvoter.com/ site
the steps below are automatically executed in Travis when new 
code is delivered to the `main` branch.

1. Create an api key _IN THE ACCOUNT THAT IS HOSTING THE APP, not your personal account UNLESS you are the owner_ and save it somewhere as json
   ```json
   {
     "name": "some-name",
     "description": "some description",
     "createdAt": "2020-07-10T22:54+0000",
     "apikey": "-LYxYYxxYYxxYxxx9xxY9x9xY9xxYYY9xxYY_xYxYxxL"
   }
   ```
2. Install ibmcloud cli https://cloud.ibm.com/docs/cli?topic=cli-getting-started
3. Install code engine `ibmcloud plugin install -f code-engine`
4. Install container registry `ibmcloud plugin install -f container-registry`
5. Login to ibmcloud `ibmcloud login --apikey @~/projects/ibmcloud-apikey.json`
6. Target the right region and group `ibmcloud target -r us-south -g cfc-team-fivefifths`
7. Build docker image `docker build -t us.icr.io/ffv .`
8. Push to a registry `docker push us.icr.io/ffv`
9. Push to code engine
   ```shell
   ibmcloud ce project select --name ffv
   ibmcloud ce app update --image us.icr.io/ffv:latest
   ```

See [deploy.sh](../scripts/deploy.sh) for an example of a deployment script.