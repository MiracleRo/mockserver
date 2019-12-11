const Mock = require('mockjs')
const ApiModel = require("../models/api")
class Api {
  async list(ctx) {
    if (ctx.method.toUpperCase() === 'GET') {
      try {
        let {pageSize, pageNum} = ctx.query
        pageSize = Number(pageSize)
        pageNum = Number(pageNum)
        const res = await ApiModel.findAndCountAll({
          limit: pageSize,//每页10条
          offset:(pageNum -1) * pageSize,//第x页*每页个数
          where:{}
        })
        const count = res.count
        const list = res.rows.map(item => ({
          id: item.id,
          url: item.url,
          method: item.method,
          desc: item.desc,
          rules: JSON.parse(item.rules)
        }))
        ctx.body = {
          total: count,
          list: list
        }
      } catch (e) {
        throw new Error(e)
      }
    } else {
    }
    
  }
}

module.exports = new Api()