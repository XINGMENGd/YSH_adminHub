import axios from 'axios'
import NProgress from 'nprogress'
import * as axiosTransform from './axiosTransform'

// 设置请求头和请求路径
axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL
axios.defaults.timeout = 1000 * 20
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 请求拦截
axios.interceptors.request.use(
  (config) => axiosTransform.requestInterceptors(config),
  (error) => axiosTransform.requestInterceptorsCatch(error)
)
// 响应拦截
axios.interceptors.response.use(
  response => axiosTransform.responseInterceptors(response),
  error => axiosTransform.responseInterceptorsCatch(error)
);

interface ResType {
  code: number
  data?: any
  message?: string
  err?: string
}
// interface Http {
//   get(url: string, params?: unknown): Promise<ResType>
//   post(url: string, body?: unknown): Promise<ResType>
//   upload(url: string, file: unknown, body: unknown): Promise<ResType>
//   download(url: string): void
// }

function request(requestOptions: any, AxiosRequestConfig: any = {}) {
  return new Promise(async (resolve, reject) => {
    NProgress.start()
    try {
      const { data } = await axios({ ...requestOptions })
      resolve(data)
    } catch (error) {
      reject(error)
    }
    NProgress.done()
  })
}

const defHttp: any = {
  get: async (options: any, config: any) => {
    const response = await request({ ...options, method: 'GET' }) as any
    return response
  },
  post: async (options: any, config: any) => {
    const response = await request({ ...options, method: 'POST' }) as any
    return response
  },
  upload: async (options: any, config: any) => {
    const response = await request({ ...options, method: 'POST', headers: { 'Content-Type': 'multipart/form-data' } }) as any
    return response
  },
  download: (url: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = ''
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export default defHttp
