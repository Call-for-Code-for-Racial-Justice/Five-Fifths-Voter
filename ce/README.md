## Deploying to Code Engine

```sh
ibmcloud login --apikey @~/projects/five-fifths-voter.json -r us-south -g cfc-team-fivefifths
ibmcloud ce project select --name fivefifthsvoter-next

cd ui
yarn build
cd ../services
docker build -t fivefifthsvoter .

# Push to IBM registry
ibmcloud cr login
docker tag fivefifthsvoter:latest us.icr.io/fivefifthsvoter/fivefifthsvoter-next:latest
docker push us.icr.io/fivefifthsvoter/fivefifthsvoter-next:latest
docker push us.icr.io/fivefifthsvoter/fivefifthsvoter-next:latest us.icr.io/fivefifthsvoter/fivefifthsvoter-next:$(date '+%FT%H%M%S')

# Roll out new version of the app
ibmcloud ce app update -n fivefifthsvoter
```

- Show the latest logs

  ```sh
  ibmcloud ce app logs -f -n fivefifthsvoter
  ```
