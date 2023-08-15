# Get Started

## Dependencies

- [install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [install nvm](https://github.com/nvm-sh/nvm#install--update-script)
- [install pnpm](https://pnpm.io/installation#using-npm)
- Install node 18 `nvm install 18`
- **OSX** [install docker](https://docs.docker.com/get-docker/)
- **Fedora** You can of course skip the docker install since you already have podman. Use `podman` for any of the instructions that show `docker`. Or you can create an alias for docker.

## Running locally
See [README](../app/README.md) in the app folder

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

### DCO needs your email address to match your GitHub account

- `git config user.email` make sure your email is configured
- If it is not configured `git config --global user.email "person@example.com"`

## Setup local environment
Begin by cloning the Git repository
```
 git clone https://github.com/Call-for-Code-for-Racial-Justice/Five-Fifths-Voter
 cd Five-Fifths-Voter
```

### Deployment

This repo is set up for automatic deployment to Code Engine. (see [services DEPLOYMENT](DEPLOYMENT.md) for details)
