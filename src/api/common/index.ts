import http from '@/utils/http'
import type * as T from './types'

export const removeFiles = (params: any): Promise<any> => {
  return http.post('/removeFiles', params)
}