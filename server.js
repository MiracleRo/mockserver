const Koa = require('koa')
const path = require('path')

const app = module.exports = new Koa()

app.use(require('./middlewares/view').render(app))

app.listen(9000, () => {
  console.log(
    chalk.green(`成功监听端口：9000`)
  )
})