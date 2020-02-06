FROM node:10.13-alpine
ENV NODE_ENV production
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 9999
CMD ["npm", "run", "dev"]