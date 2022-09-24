FROM registry.access.redhat.com/ubi8/nodejs-16 AS base

RUN npm -g install npm@latest @vue/cli@latest yarn@latest

WORKDIR /opt/app-root/src
COPY package.json .
COPY yarn.lock .

#RUN npm install -- throws an error see https://github.com/vuejs/vue-cli/issues/5986
RUN yarn install

COPY . .
EXPOSE 8539

CMD ["npm", "run", "serve"]
