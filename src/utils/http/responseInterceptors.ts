import LoginStore from '@/stores/Auth'

export default function responseInterceptors(response: any) {
  if (response.data.code === 200) {
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
      useStore.LOGOUT()
      return
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