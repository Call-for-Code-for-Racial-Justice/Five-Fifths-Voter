# Not needed for local development or deployment.
# NOTE: We may want to use this with Code Engine in the future.
# action test
FROM node:14
RUN git --version
RUN apt update
RUN apt install -y python3-pip
RUN apt-get clean
RUN pip3 install tweepy WordCloud ibm_watson
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
ENV NODE_ENV=production
RUN yarn
COPY . .
EXPOSE 8080
CMD ["node", "services.js"]

