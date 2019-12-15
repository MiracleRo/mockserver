import axios from 'axios'

const isClient = process.env.VUE_ENV === 'client'
const instance = axios.create({
  baseURL: isClient ? '/api' : `http://localhost:9999/api`,
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  if (response.data.code === 200) {
    response = response.data
    return response;
  } else {
    return Promise.reject(response.data.message);
  }
  // 对响应数据做点什么
  
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

const createAPI = (url, method, config) => {
  config = config || {}
  return instance({
    url,
    method,
    ...config
  })
}

const Api = {
  list: config => createAPI('/list', 'get', config),
  create: config => createAPI('/create', 'post', config)
}

export {
  Api
}