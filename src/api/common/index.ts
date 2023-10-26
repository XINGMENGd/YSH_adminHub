import defHttp from '@/utils/http'
import type * as T from './types'

export const removeFiles = (data: any): Promise<any> => {
  return defHttp.post({ url: '/removeFiles', data })
}