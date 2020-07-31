# embrace-the-vote

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
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
