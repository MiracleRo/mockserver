const ApiModel = require("../models/api")
const { VM } = require('vm2')
const Mockjs = require('mockjs')

class Mock {
  async getMockAPI (ctx) {
    const method = ctx.method.toLowerCase();
    const url = ctx.request.url;
    const res = await ApiModel.findOne({
        where: {
          url,
          method
        }
    })
    if (res) {
        const api = res.dataValues
        const vm = new VM({
        timeout: 1000,
        sandbox: {
          Mockjs: Mockjs,
          mode: api.rule,
          template: new Function(`return ${api.rule}`) // eslint-disable-line
          }
        })
        vm.run('Mockjs.mock(new Function("return " + mode)())') // 数据验证，检测 setTimeout 等方法
        const apiData = vm.run('Mockjs.mock(template())') // 解决正则表达式失效的问题
        ctx.body = apiData
    } else {
        ctx.throw(404)
    }
  }
}

module.exports = new Mock()