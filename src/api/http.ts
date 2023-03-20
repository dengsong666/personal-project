import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export const service = axios.create({
  baseURL: '/api',
  timeout: 30000
})
const errors: AnyObj = {
  401: 'token 失效，请重新登录',
  403: '拒绝访问',
  404: '请求地址错误',
  500: '服务器故障',
  undefined: '网络连接故障'
}
interface ResponseData<T> {
  msg?: string
  data: T
  code: string
}
const r =
  (method: string) =>
  <T = any>(config: AxiosRequestConfig): Promise<ResponseData<T>> =>
    service.request({ ...config, method })
/* 请求拦截器 */
service.interceptors.request.use(
  (config) => {
    //  伪代码
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

service.interceptors.response.use(
  (response) => {
    const { code = 200, msg = '', data = response.data } = response.data
    if (code === 200) return { code, data, msg } as any
    else {
      // 处理业务错误。
      // Message.error(message)
      return Promise.reject(new Error(msg))
    }
  },
  (error: AxiosError) => {
    // Message.error(errors[status as unknown as string])
    return Promise.reject(error)
  }
)
export default { get: r('get'), post: r('post'), put: r('put'), patch: r('patch'), delete: r('delete') }
