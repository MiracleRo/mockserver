import Router from 'koa-router'
import example from './example'

const router = new Router()

router.use('/example', example.routes(), example.allowedMethods())

export default router
