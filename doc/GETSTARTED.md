# Get Started

## Dependencies

- [install yarn](https://yarnpkg.com/lang/en/docs/cli/install/)
- [install python3](https://realpython.com/installing-python/)
- install python dependencies - `pip3 install --user tweepy WordCloud ibm_watson`
- [install docker](https://docs.docker.com/get-docker/)

## Developer Certification of Origin (DCO)

More information here: https://github.com/probot/dco

The Developer Certificate of Origin (DCO) is a lightweight way for contributors to certify that they wrote or otherwise have the right to
submit the code they are contributing to the project.
Here is the full The DCO agreement is shown below and at [text of the DCO](http://developercertificate.org/.)

> Developer's Certificate of Origin 1.1
>
> By making a contribution to this project, I certify that:
>
> (a) The contribution was created in whole or in part by me and I
> have the right to submit it under the open source license
> indicated in the file; or
>
> (b) The contribution is based upon previous work that, to the
> best of my knowledge, is covered under an appropriate open
> source license and I have the right under that license to
> submit that work with modifications, whether created in whole
> or in part by me, under the same open source license (unless
> I am permitted to submit under a different license), as
> Indicated in the file; or
>
> (c) The contribution was provided directly to me by some other
> person who certified (a), (b) or (c) and I have not modified
> it.
>
> (d) I understand and agree that this project and the contribution
> are public and that a record of the contribution (including
> all personal information I submit with it, including my
> sign-off) is maintained indefinitely and may be redistributed
> consistent with this project or the open source license(s)
> involved.

### DCO Sign-Off Methods

The DCO requires a sign-off message in the following format appear on each commit in the pull request:

Signed-off-by: Example Person <person@example.com>

The DCO text can either be manually added to your commit body, or you can add either -s or --signoff to your usual Git commit commands. If you forget to add the sign-off you can also amend a previous commit with the sign-off by running git commit --amend -s. If you’ve pushed your changes to GitHub already you’ll need to force push your branch after this with git push -f.

### DCO needs your email address to match your github account

- `git config user.email` make sure your email is configured
- If it is not configured `git config --global user.email "person@example.com"`

## Project setup

```
cd ui
yarn install
cd ../services
yarn install
cd ..
```

### Compiles and hot-reloads for development

Start local database (see [database README](../database/README.md) for details)
```sh
cd database
yarn build
yarn serve
cd ..
```

Start services (see [services README](../services/README.md) for details)

```
cd services
yarn serve
```

Start web app (open another terminal in root project directory `Five-Fifths-Voter`)

```
cd ui
yarn serve
```

### Clean up code before pushing

```
yarn ci-format
```

### Deployment

This repo is setup for automatic deployment to Clud Foundry. (see [services DEPLOYMENT](DEPLOYMENT.md) for details)

### Docker - You can skip this if you are not debugging deployment

- build services image

```sh
cd services
docker build -t five-fifths-voter/services .
```

- run services image

```sh
docker run -it --rm -P --name test-service five-fifths-voter/services
```
