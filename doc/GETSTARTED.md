# Get Started

## Dependencies

- [install yarn](https://yarnpkg.com/lang/en/docs/cli/install/)
- [install python3](https://realpython.com/installing-python/)
- install python dependencies - `pip3 install --user tweepy WordCloud ibm_watson`
- **OPTIONAL** [install docker](https://docs.docker.com/get-docker/) (You only need Docker if you are debugging/testing the deploy process.)

## Project setup

```
yarn install
cd services
yarn install
cd ..
```

### Compiles and hot-reloads for development

Start services (see [services README](services/README.md) for details)

```
cd services
yarn serve
```

Start web app (open another terminal in root project directory `embrace-the-vote`)

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

Build for production not working with Openshift (or docker image) so currently we use `--mode=dev` param.
Pushing a change to the `stable` branch will automatically kickoff a build for the app in the OpenShift cluster.

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Clean up code before pushing

```
yarn ci-format
```

### Deployment

This repo is setup for automatic deployment to Open Shift cluster. Pushing changes to the `stable` branch will kick off an automatic build and deploy. So do not push to `stable` unless you really mean it. See the webhooks for this repo and the Open Shift build config for details.

### Docker - You can skip this if you are not debugging deployment

- build services image

```sh
cd services
docker build -t embrace-the-vote/services .
```

- run services image

```sh
docker run -it --rm -P --name test-service embrace-the-vote/services
```
