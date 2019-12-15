const Router = require('koa-router')
const {
  api
} = require('./controllers')
// const middleware = require('./middlewares')

const apiRouter = new Router({ prefix: '/api' })

exports.api = apiRouter
  .get('/list', api.list)
  .post('/create', api.create)
  .get('/detail', api.detail)
  .post('/update', api.update)

