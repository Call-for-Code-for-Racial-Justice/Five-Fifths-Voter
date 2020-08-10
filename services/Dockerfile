FROM node:14
#RUN npm install -g yarn
WORKDIR /usr/src/app
COPY package.json ./
ENV NODE_ENV=production
RUN yarn
COPY . .
EXPOSE 8080
CMD ["node", "services.js"]

