FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./



EXPOSE 5000
CMD ["node", "dist/index.js"]

