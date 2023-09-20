import axios from 'axios'
import NProgress from 'nprogress'
import LoginStore from '@/stores/login'

// 设置请求头和请求路径
axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.request.use(
  (config) => {
    const useStore = LoginStore()
    const { token } = useStore.GET_USERINFO
    if (token !== '') {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return error
  }
)
// // 响应拦截
// axios.interceptors.response.use((res) => {
//   if (res.data.code === 111) {
//     localStorage.setItem('token', '')
//     // token过期操作
//   }
//   return res
// })

interface ResType<T> {
  code: number
  data?: T
  message?: string
  err?: string
}
interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>
  post<T>(url: string, params?: unknown): Promise<ResType<T>>
  upload<T>(url: string, params: unknown): Promise<ResType<T>>
  download(url: string): void
}

const http: Http = {
  get: async (url: string, params: any) => {
    try {
      NProgress.start()
      const res = await axios.get(url, { params })
      NProgress.done()
      return res.data
    } catch (err: any) {
      NProgress.done()
      throw err.response?.data
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
      throw err.response?.data
    }
  },
  upload: async (url: string, file: File) => {
    try {
      NProgress.start()
      const formData = new FormData()
      formData.append('file', file)
      const res = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      NProgress.done()
      return res.data
    } catch (err: any) {
      NProgress.done()
      throw err.response?.data
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
export default http
