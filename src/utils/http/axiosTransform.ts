import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import LoginStore from '@/stores/Auth'

/**
 * @description: 请求拦截器
 */
export function requestInterceptors(config: InternalAxiosRequestConfig, options: any = {}): any {
  const useStore = LoginStore()
  const { id, token } = useStore.GET_userInfo
  if (token !== '') {
    config.headers['User-Identifier'] = id
    config.headers.Authorization = token
  }
  return config
}

/**
 * @description: 请求拦截器错误处理
 */
export function requestInterceptorsCatch(error: Error) {
  return Promise.reject(error)
}

/**
 * @description: 响应拦截器
 */
export function responseInterceptors(response: any) {
  if (response.status === 200) {
    if (response.headers['response-status']) {
      ElMessage({
        message: response.data.message,
        type: 'error',
        duration: 1000
      })
      return Promise.reject(response.data)
    }
    if (response.data.message !== '获取成功' && response.data.message !== '删除成功' && response.data.message !== '分片上传成功') {
      ElMessage({
        message: response.data.message,
        type: 'success',
        duration: 1000
      })
    }
    return response
  } else {
    if (response.data.code === 401) {
      const useStore = LoginStore()
      return useStore.LOGOUT()
    }
    if (response.data.message !== '图片不存在') {
      ElMessage.error({
        message: response.data.message,
        type: 'success',
        duration: 1000
      })
    }
    return Promise.reject(response)
  }
}

/**
 * @description: 响应拦截器错误处理
 */
export function responseInterceptorsCatch(error: any) {
  console.log(error);

  const status = 'status'
  const message = 'statusText'
  // 对响应错误做点什么
  const { response = {}, config: { url, params, data } } = error;
  console.error(`
      =========warn begin===========
      当前请求：${url} 异常
      当前请求参数 👇
      ${JSON.stringify(params) || JSON.stringify(data)}
      错误码 ${response?.[status]}
      错误消息 ${response?.[message]}
      =========warn end=============
  `)
  return Promise.reject(error);
}