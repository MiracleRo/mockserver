const Koa = require('koa')
const path = require('path')
const chalk = require('chalk')
const staticCache = require('koa-static-cache')
const app = module.exports = new Koa()

app.use(serve('/dist', './dist'))
app.use(require('./middlewares/view').render(app))

app.listen(9000, () => {
  console.log(
    chalk.green(`成功监听端口：9000`)
  )
})

function serve (prefix, filePath) {
  return staticCache(path.resolve(__dirname, filePath), {
    prefix: prefix,
    gzip: true,
    dynamic: true,
    maxAge: 60 * 60 * 24 * 30
  })
}