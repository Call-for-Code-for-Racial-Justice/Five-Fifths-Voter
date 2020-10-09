# Get Started

## Dependencies

- [install yarn](https://yarnpkg.com/lang/en/docs/cli/install/)
- [install python3](https://realpython.com/installing-python/)
- install python dependencies - `pip3 install --user tweepy WordCloud ibm_watson`
- [install docker](https://docs.docker.com/get-docker/)

## Developer Certification of Origin (DCO)

More information here: https://github.com/probot/dco

To make a good faith effort to ensure licensing criteria are met, this project requires the Developer Certificate of Origin (DCO) process to be followed.

The DCO is an attestation attached to every contribution made by every developer. In the commit message of the contribution, (described more fully later in this document), the developer simply adds a Signed-off-by statement and thereby agrees to the DCO.

When a developer submits a patch, it is a commitment that the contributor has the right to submit the patch per the license. The DCO agreement is shown below and at http://developercertificate.org/.

```
Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the
    best of my knowledge, is covered under an appropriate open
    source license and I have the right under that license to
    submit that work with modifications, whether created in whole
    or in part by me, under the same open source license (unless
    I am permitted to submit under a different license), as
    Indicated in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including
    all personal information I submit with it, including my
    sign-off) is maintained indefinitely and may be redistributed
    consistent with this project or the open source license(s)
    involved.
```

### DCO Sign-Off Methods

The DCO requires a sign-off message in the following format appear on each commit in the pull request:

Signed-off-by: Example Person <person@example.com>

The DCO text can either be manually added to your commit body, or you can add either -s or --signoff to your usual Git commit commands. If you forget to add the sign-off you can also amend a previous commit with the sign-off by running git commit --amend -s. If you’ve pushed your changes to GitHub already you’ll need to force push your branch after this with git push -f.

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
yarn test
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
