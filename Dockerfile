FROM node:latest
RUN npm install -g nodemon
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["nodemon", "--legacy-watch", "index.js"]
