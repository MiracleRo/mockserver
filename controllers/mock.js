class Mock {
  static async getMockAPI (ctx) {
    ctx.body ={
      dd: 'sss'
    }
    // const { query, body } = ctx.request
    // const method = ctx.method.toLowerCase()

    // api = apis.filter((item) => {
    //   const url = item.url.replace(/{/g, ':').replace(/}/g, '') // /api/{user}/{id} => /api/:user/:id
    //   return item.method === method && pathToRegexp(url).test(mockURL)
    // })[0]

    // if (!api) ctx.throw(404)

    // Mock.Handler.function = function (options) {
    //   const mockUrl = api.url.replace(/{/g, ':').replace(/}/g, '') // /api/{user}/{id} => /api/:user/:id
    //   options.Mock = Mock
    //   options._req = ctx.request
    //   options._req.params = util.params(mockUrl, mockURL)
    //   options._req.cookies = ctx.cookies.get.bind(ctx)
    //   return options.template.call(options.context.currentContext, options)
    // }

    // if (/^http(s)?/.test(api.mode)) { // 代理模式
    //   const url = nodeURL.parse(api.mode.replace(/{/g, ':').replace(/}/g, ''), true)
    //   const params = util.params(api.url.replace(/{/g, ':').replace(/}/g, ''), mockURL)
    //   const pathname = pathToRegexp.compile(url.pathname)(params)
    //   try {
    //     apiData = await axios({
    //       method: method,
    //       url: url.protocol + '//' + url.host + pathname,
    //       params: _.assign({}, url.query, query),
    //       data: body,
    //       timeout: 3000,
    //       headers: ctx.headers
    //     }).then(res => res.data)
    //   } catch (error) {
    //     ctx.body = ctx.util.refail(error.message || '接口请求失败')
    //     return
    //   }
    // } else {
    //   const vm = new VM({
    //     timeout: 1000,
    //     sandbox: {
    //       Mock: Mock,
    //       mode: api.mode,
    //       template: new Function(`return ${api.mode}`) // eslint-disable-line
    //     }
    //   })

    //   vm.run('Mock.mock(new Function("return " + mode)())') // 数据验证，检测 setTimeout 等方法
    //   apiData = vm.run('Mock.mock(template())') // 解决正则表达式失效的问题

    //   /* istanbul ignore else */
    //   if (apiData._res) { // 自定义响应 Code
    //     let _res = apiData._res
    //     ctx.status = _res.status || /* istanbul ignore next */ 200
    //     /* istanbul ignore else */
    //     if (_res.cookies) {
    //       for (let i in _res.cookies) {
    //         /* istanbul ignore else */
    //         if (_res.cookies.hasOwnProperty(i)) ctx.cookies.set(i, _res.cookies[i])
    //       }
    //     }
    //     /* istanbul ignore next */
    //     if (_res.headers) {
    //       for (let i in _res.headers) {
    //         /* istanbul ignore next */
    //         if (_res.headers.hasOwnProperty(i)) ctx.set(i, _res.headers[i])
    //       }
    //     }
    //     /* istanbul ignore next */
    //     if (_res.status && parseInt(_res.status, 10) !== 200 && _res.data) apiData = _res.data
    //     delete apiData['_res']
    //   }
    // }
  }
}

module.exports = new Mock()