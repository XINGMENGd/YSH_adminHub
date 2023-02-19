import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util'

export default [
  {
    url: "/mock/menu",
    method: "post",
    response: (request: requestParams) => {
      return [
        {
          path: 'menu1',
          name: 'menu1',
          component: 'menu1/index'
        },
        {
          path: 'menu2',
          name: 'menu2',
          component: 'menu2/index'
        }
      ]
    },
  }
]