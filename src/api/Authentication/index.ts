import http from '@/utils/http'
import type * as T from './types'

export const login = (params: T.LoginParams): Promise<any> => {
  return http.post('/login', params)
}

export const getRoute = (): Promise<any> => {
  return http.post('/getRoutes')
}
