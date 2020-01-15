import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
import { toast } from 'vant'
// 设置默认请求地址
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 拦截响应数据默认处理方式，解决大数字数据转换失真问题
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    return {}
  }
}]
// 请求拦截器
request.interceptors.request.use(function (config) {
  let { user } = store.state
  if (user) { config.headers.Authorization = `Bearer ${user.token}` }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  let { url, method } = error.config
  if (url === '/app/v1_0/authorizations' && method === 'post') {
    toast.fail('登陆失败')
  } else if (url.indexOf('/app/v1_0/sms/codes/') !== -1 && method === 'get') {
    toast.fail('验证码发送失败，请稍后重试')
  }
  return Promise.reject(error)
})
// 导出修改后的axios对象
export default request
