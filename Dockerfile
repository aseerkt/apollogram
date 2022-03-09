FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .
COPY .env.development .env

RUN npx tsc

ENV NODE_ENV=development

EXPOSE 5000
CMD ["node", "dist/index.js"]
USER node
