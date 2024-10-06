FROM node:18
WORKDIR /usr/src/app
COPY package*.json app.js ./
RUN npm i
EXPOSE 8198
CMD ["node", "app.js"]
