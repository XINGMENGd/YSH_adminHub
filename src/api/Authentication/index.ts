import http from '@/api/http'
import type * as T from './types'

export const login = (params: T.LoginParams): Promise<any> => {
  return http.post('/login', params)
}

export const FetchRoute = (): Promise<any> => {
  return http.get('/FetchRouteList')
}
