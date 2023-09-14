import http from '@/api/http'
import * as T from './types'

const reqRoute: T.IRoutepi = {
  fetchRoute(params) {
    return http.post('/RouteList', params)
  }

}
export default reqRoute