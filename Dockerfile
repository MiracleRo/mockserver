FROM node:10.13-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --registry=https://registry.npm.taobao.org
COPY . .
EXPOSE 9999
CMD ["npm", "run", "dev"]