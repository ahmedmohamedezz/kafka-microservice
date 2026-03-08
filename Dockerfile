FROM node:18-alpine

WORKDIR /app

# cache dependencies
COPY package*.json ./

RUN npm install

# copy proejct files
COPY . .

CMD ["node", "src/index.js"]
