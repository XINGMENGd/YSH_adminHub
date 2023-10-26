import defHttp from '@/utils/http'
import type * as T from './types'

// 添加商品
export const createProduct = (data: T.createProductParams): Promise<any> => {
  return defHttp.post({ url: '/createProduct', data })
}
// 修改商品信息
export const updateProduct = (data: T.updateProductParams): Promise<any> => {
  return defHttp.post({ url: '/updateProduct', data })
}