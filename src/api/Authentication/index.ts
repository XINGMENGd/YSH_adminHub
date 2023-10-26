import defHttp from '@/utils/http'
import type * as T from './types'

export const login = (params: T.LoginParams): Promise<any> => {
  return defHttp.post('/login', params)
}

export const getRoute = (): Promise<any> => {
  return defHttp.post('/getRoutes')
}
