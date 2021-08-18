FROM node:10-alpine

RUN apk update && apk upgrade && apk add python g++ gcc libgcc libstdc++ linux-headers make

RUN npm install -g pm2

RUN apk update

WORKDIR /app

CMD pm2-docker index.js --no-auto-exit