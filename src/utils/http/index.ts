import axios from 'axios'
import NProgress from 'nprogress'
import LoginStore from '@/stores/Auth'
import responseInterceptors from './responseInterceptors'
import errorInterceptors from './errorInterceptors'

// 设置请求头和请求路径
axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL
axios.defaults.timeout = 1000 * 20
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.request.use(
  (config) => {
    const useStore = LoginStore()
    const { id, token } = useStore.GET_userInfo

    if (token !== '') {
      config.headers['User-Identifier'] = id
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return error
  }
)
// 响应拦截
axios.interceptors.response.use(
  response => responseInterceptors(response),
  error => errorInterceptors(error)
);

interface ResType {
  code: number
  data?: any
  message?: string
  err?: string
}
interface Http {
  get(url: string, params?: unknown): Promise<ResType>
  post(url: string, params?: unknown): Promise<ResType>
  upload(url: string, file: unknown, body: unknown): Promise<ResType>
  download(url: string): void
}

const defHttp: Http = {
  get: async (url: string, params: any) => {
    try {
      NProgress.start()
      const res = await axios.get(url, { params })
      NProgress.done()
      return res.data
    } catch (err: any) {
      NProgress.done()
      throw err.response?.data || err?.data
    }
  },
  post: async (url: string, params: any) => {
    try {
      NProgress.start()
      const res = await axios.post(url, JSON.stringify(params))
      NProgress.done()
      return res.data
    } catch (err: any) {
      NProgress.done()
      throw err.response?.data || err?.data
    }
  },
  upload: async (url: string, file: File, body: any) => {
    try {
      NProgress.start()
      const formData = new FormData()
      formData.append('file', file)
      if (body) {
        for (let key in body) {
          formData.append(`${key}`, body[`${key}`])
        }
      }
      const res = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      NProgress.done()
      return res.data
    } catch (err: any) {
      NProgress.done()
      throw err.response?.data || err?.data
    }
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
