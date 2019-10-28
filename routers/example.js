const router = require('koa-router')()
const example = require('../controllers/example')

module.exports = router.get('/login', example.login)