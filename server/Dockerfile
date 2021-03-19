FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .
COPY .env.production .env

RUN npx tsc

ENV NODE_ENV=production

EXPOSE 8080
CMD ["node", "dist/index.js"]
USER node
