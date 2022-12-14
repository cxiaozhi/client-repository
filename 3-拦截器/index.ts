// index.ts
import Request from '@/utils/request'
import type { RequestConfig } from '../types/utils/axios'

const requestInstance = new Request({
  baseURL: '',
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => {
      const token = localStorage.getItem('token')
      if (token && config.headers) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      return config
    },
    // 响应拦截器
    responseInterceptors: result => {
      return result
    },
  },
})

interface CustomRequestConfig<T> extends RequestConfig {
  data?: T
}
interface CustomResponse<T> {
  code: string
  msg: string
  data: T
  pagination?: string
}

/**
 * @interface D 请求参数的interface
 * @interface T 响应结构的intercept
 * @param {CustomRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const commonRequest = <D = any, T = any>(config: CustomRequestConfig<D>) => {
  const { method = 'GET' } = config
  if (method === 'get' || (method === 'GET' && config.data)) {
    config.params = config.data
  }

  return requestInstance.request<CustomResponse<T>>(config)
  // return requestInstance.request<T>(config)
}

export default commonRequest
