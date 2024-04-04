FROM node:latest

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app

EXPOSE 3001

CMD ["node", "authApp.js"]
