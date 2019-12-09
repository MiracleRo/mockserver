const Koa = require('koa')
const path = require('path')
const chalk = require('chalk')
const staticCache = require('koa-static-cache')
const favicon = require('koa-favicon')

const routerConfig = require('./router-config')

const app = module.exports = new Koa()

app.use(serve('/dist', './dist'))
   .use(favicon(path.join(__dirname, '/public/images/logo.png')))
   .use(routerConfig.mock.routes())
   .use(routerConfig.mock.allowedMethods())
   .use(routerConfig.api.routes())
   .use(routerConfig.api.allowedMethods())
if (!module.parent) {
  app.use(require('./middlewares/view').render(app))
  app.listen('9999', () => {
    console.log(chalk.green(`server started at http://localhost:9999`))
  })
}


function serve (prefix, filePath) {
  return staticCache(path.resolve(__dirname, filePath), {
    prefix: prefix,
    gzip: true,
    dynamic: true,
    maxAge: 60 * 60 * 24 * 30
  })
}