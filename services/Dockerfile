FROM registry.access.redhat.com/ubi8/nodejs-16
WORKDIR /opt/app-root/src
COPY . .
RUN npm install -g yarn && yarn install

EXPOSE 8080
ENV PORT 8080
ENV NODE_ENV=production

USER root
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]
RUN chown -R 1001:0 /opt/
USER 1001

# Start
CMD node server.js