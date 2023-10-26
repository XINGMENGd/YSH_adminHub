import defHttp from '@/utils/http'
import type * as T from './types'

// 添加商品
export const createProduct = (params: T.createProductParams): Promise<any> => {
  return defHttp.post('/createProduct', params)
}
// 修改商品信息
export const updateProduct = (params: T.updateProductParams): Promise<any> => {
  return defHttp.post('/updateProduct', params)
}