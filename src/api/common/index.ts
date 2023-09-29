import http from '@/api/http'
import type * as T from './types'

export const removeImages = (params: any): Promise<any> => {
  return http.post('/removeImages', params)
}