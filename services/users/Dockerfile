FROM node:13.12.0-alpine3.10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]