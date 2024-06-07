FROM node:21.7.1

WORKDIR /app

COPY package*.json ./API/

WORKDIR /app/API

RUN npm install

COPY ./API /app/API

EXPOSE 3000

CMD ["node", "index.js"]