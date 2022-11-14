FROM docker.io/node:16-alpine
ENV PORT 8080
EXPOSE 8080
USER node

WORKDIR /home/node/app
COPY --chown=node:0 . ./
RUN NPM_CONFIG_PRODUCTION=1 yarn install
CMD yarn start

