const Mock = require('mockjs')
const ApiModel = require("../models/api")
class Api {
  async list(ctx) {
    try {
      let data = await ApiModel.findAll({
        limit:10,//每页10条
        offset:0*10,//第x页*每页个数
        where:{}
      })
      console.log(data)
      ctx.body = data
    } catch (e) {
      console.log(e)
    }
    // const data = Mock.mock({
    //   'list|20': [{
    //     'id|+1': 1,
    //     'name': Mock.Random.string()
    //   }]
    // })
    
  }
}

module.exports = new Api()