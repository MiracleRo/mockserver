const Mock = require('mockjs')

class Api {
  list(ctx) {
    const data = Mock.mock({
      'list|20': [{
        'id|+1': 1,
        'name': Mock.Random.string()
      }]
    })
    ctx.body = data
  }
}

module.exports = new Api()