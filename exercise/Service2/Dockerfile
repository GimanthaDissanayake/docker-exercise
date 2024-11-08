FROM node:18
WORKDIR /usr/src/app
COPY package*.json app.js ./
RUN npm i
COPY . .
EXPOSE 8189
CMD ["node", "app.js"]
