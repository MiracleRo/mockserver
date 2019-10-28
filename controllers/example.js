import Mock from 'mockjs'

class user {
  login(ctx) {
    const data = Mock.mock({
      'list|20': [{
        'id|+1': 1,
        'name': Mock.Random.string()

      }]
    })
    ctx.body = data
  }
  logout() {
    console.log(22222)
  }
}

module.exports = new user()