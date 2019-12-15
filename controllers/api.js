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
          rule: item.rule.replace(/\s/g, '')
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
          rule: rule,
          method
        })
        ctx.body = ctx.util.resuccess()
      } catch(e) {
        ctx.body = {
          message: e
        }
      }
    }
  }
  async detail(ctx) {
    if (ctx.method.toUpperCase() === 'GET') {
      try {
        let {id} = ctx.query
        const res = await ApiModel.findOne({
          where: {id: parseInt(id)}
        })
        ctx.body = ctx.util.resuccess({
          detail: res
        })
      } catch (e) {
        ctx.body = ctx.util.refail({
          message: e
        })
        throw new Error(e)
      }
    }else{
      ctx.body = ctx.util.refail({
        message: e
      })
    }
  }
  async update(ctx){
    if (ctx.method.toUpperCase() === 'POST') {
      const {url, description, rule, method, id} = ctx.request.body
      const res = await ApiModel.findOne({
        where: {url}
      })
      if (res && res.id !== parseInt(id)) {
        ctx.body = ctx.util.refail('请检查接口是否已经存在')
        return
      }
      try {
        await ApiModel.update({
          url,
          description,
          rule: rule.replace(/\s/g, ''),
          method
        },
        {
          where:{id: parseInt(id)}
        })
        ctx.body =ctx.util.resuccess()
      } catch(e) {
        ctx.body =ctx.util.refail(e)
      }
    }
  }
  async deleteApi(ctx) {
    if (ctx.method.toUpperCase() === 'POST') {
      const {id} = ctx.request.body
      try {
        await ApiModel.destroy({where: {id}})
        ctx.body =ctx.util.resuccess()
      } catch(e) {
        console.log(e)
        ctx.body =ctx.util.refail(e)
      }
    }
  }
}

module.exports = new Api()