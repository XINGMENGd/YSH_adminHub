import http from '@/api/http'
import type * as T from './types'
import type * as CT from '../common'

export const fetchProduct = (params: CT.tableParams): Promise<any> => {
  return http.get('/fetchProduct', params)
}

export const createProduct = (params: T.createProductParams): Promise<any> => {
  return http.post('/createProduct', params)
}