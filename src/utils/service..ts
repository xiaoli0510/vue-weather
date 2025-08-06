import axios from 'axios'
import { getToken } from './createToken'

//和风天气
const service = axios.create({
  baseURL: 'https://nk6tup5h7u.re.qweatherapi.com',
  timeout: 15000,
})

// 添加请求拦截器
service.interceptors.request.use(
  async function (config) {
    const token = await getToken()
    // 在发送请求之前做些什么
    config.headers.set('Authorization', `Bearer ${token}`)
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)

export default service
