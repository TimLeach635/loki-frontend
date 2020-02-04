FROM node:13.7.0-alpine3.10

COPY package.json package.json

RUN npm install

COPY src src
COPY public public

ENTRYPOINT ["npm", "start"]
