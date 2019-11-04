const Koa = require('koa')
const path = require('path')
const favicon = require('koa-favicon')

const app = module.exports = new Koa()



app
   .use(favicon(path.join(__dirname, '/public/images/icon.png')))
   .use(require('./middlewares/view').render(app))
   
app.listen(9000, () => {
  console.log(
    chalk.green(`成功监听端口：9000`)
  )
})