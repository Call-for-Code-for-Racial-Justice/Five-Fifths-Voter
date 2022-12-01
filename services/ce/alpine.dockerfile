FROM docker.io/node:16-alpine
ENV PORT 8080
EXPOSE 8080

WORKDIR /home/node/app
RUN chown -R node:node /home/node
USER node
COPY --chown=node:node . ./
RUN NPM_CONFIG_PRODUCTION=1 yarn install
CMD yarn start

