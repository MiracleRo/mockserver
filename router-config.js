const Router = require('koa-router')
const {
  mock,
  api
} = require('./controllers')
// const middleware = require('./middlewares')

const apiRouter = new Router({ prefix: '/api' })
const mockRouter = new Router({ prefix: '/mock' })

exports.mock = mockRouter
  .get('/apiList', mock.mock)

exports.api = apiRouter
  .get('/list', api.list)

