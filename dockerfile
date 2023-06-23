FROM node:alpine AS grc-admin

ENV NODE_ENV grc-admin

WORKDIR /app

COPY ./package.json /app

COPY . .

EXPOSE 3000

CMD npm start