import http from '@/api/http'
import type * as T from './types'

// 查询商品分类列表
export const getProductCategoryList = (): Promise<any> => {
  return http.get('/getProductCategoryList')
}
// 查询商品状态列表
export const getProductStatusList = (): Promise<any> => {
  return http.get('/getProductStatusList')
}
// 添加商品
export const createProduct = (params: T.createProductParams): Promise<any> => {
  return http.post('/createProduct', params)
}
// 修改商品信息
export const updateProduct = (params: T.updateProductParams): Promise<any> => {
  return http.post('/updateProduct', params)
}