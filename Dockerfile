FROM node:latest

WORKDIR /genshin-api

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "start"]