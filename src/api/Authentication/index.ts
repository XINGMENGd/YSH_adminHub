import defHttp from '@/utils/http'
import type * as T from './types'

export const login = (data: T.LoginParams): Promise<any> => {
  return defHttp.post({ url: '/login', data })
}

export const getRoute = (): Promise<any> => {
  return defHttp.post({ url: '/getRoutes' })
}
