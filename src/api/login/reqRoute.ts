import http from '@/api/http'
import * as T from './types'

const FetchRoute: T.IRouteApi = {
  FetchRouteList() {
    return http.post('/FetchRouteList')
  }

}
export default FetchRoute