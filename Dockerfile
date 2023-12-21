FROM node:18.17.0-alpine
WORKDIR /usr/app
COPY package.json .
RUN npm i --quiet

COPY . .
