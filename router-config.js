const Router = require('koa-router')
const restc = require('restc').koa2()
const {
  api,
  mock
} = require('./controllers')

const apiRouter = new Router({ prefix: '/api' })
const mockRouter = new Router({ prefix: '/mock' })

exports.mock = mockRouter
  .all('*', restc, mock.getMockAPI)

exports.api = apiRouter
  .get('/list', api.list)
  .post('/create', api.create)
  .get('/detail', api.detail)
  .post('/update', api.update)
  .post('/delete', api.deleteApi)

