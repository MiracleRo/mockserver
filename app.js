import Koa from 'koa'
import Mock from 'mockjs'
import routers from './routers/index'
import chalk from 'chalk'

const app = new Koa()

app.use(routers.routes()).use(routers.allowedMethods())

// app.use(async (ctx) => {
//  ctx.body = JSON.stringify(data)
// } )

app.listen(9000, () => {
  console.log(
		chalk.green(`成功监听端口：9000`)
	)
})