import http from '@/api/http'
import * as T from './types'

export const login = (params: T.LoginParams) => http.post('/login', params)

export const FetchRoute = () => http.post('/FetchRouteList')

