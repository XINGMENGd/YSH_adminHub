import http from '@/api/http'
import type * as T from './types'

// 添加商品
export const createProduct = (params: T.createProductParams): Promise<any> => {
  return http.post('/createProduct', params)
}
// 修改商品信息
export const updateProduct = (params: T.updateProductParams): Promise<any> => {
  return http.post('/updateProduct', params)
}