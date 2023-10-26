import defHttp from '@/utils/http'
import type * as T from './types'

export const removeFiles = (params: any): Promise<any> => {
  return defHttp.post('/removeFiles', params)
}