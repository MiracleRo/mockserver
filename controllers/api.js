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
          description: item.description,
          rule: JSON.parse(item.rule)
        }))
        ctx.body = ctx.util.resuccess({
          total: count,
          list: list
        })
      } catch (e) {
        throw new Error(e)
      }
    } else {
      ctx.throw(405,'msg')
    }
  }
  async create(ctx) {
    if (ctx.method.toUpperCase() === 'POST') {
      const {url, description, rule, method} = ctx.request.body
      const data = await ApiModel.findOne({
        where: {
          url,
          method
        }
      })
      if (data) {
        ctx.body = ctx.util.refail('请检查接口是否已经存在')
        return
      }
      try {
        await ApiModel.create({
          url,
          description,
          rule,
          method
        })
        ctx.body = ctx.util.success()
      } catch(e) {
        ctx.body = {
          message: '插入失败'
        }
      }
    }
  }
}

module.exports = new Api()