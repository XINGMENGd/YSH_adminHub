import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util'

const userWareHouse = [
  {
    // token: Random.id(),
    token: "64000019741229721X",
    userName: 'admin',
    passWord: 123456,
    roles: '00'
  }, {
    token: "64901376127829721Y",
    userName: 'admin2',
    passWord: 111111,
    roles: '01'
  }]

const RouteHouse = [
  {
    path: '/demo',
    component: "Layout",
    meta: { title: 'demo', hidden: false, roles: ['00', '01'] },
    children: [
      {
        path: 'demo1',
        name: 'demo1',
        component: 'demo1',
        meta: { title: 'demo1', hidden: false }
      },
      {
        path: 'demo2',
        name: 'demo2',
        component: 'demo2',
        meta: { title: 'demo2', hidden: false }
      }
    ]
  },
  {
    path: '/menu',
    component: "Layout",
    meta: { title: 'menu', hidden: false, roles: ['00'] },
    children: [
      {
        path: 'menu1',
        name: 'menu1',
        meta: { title: 'menu1', hidden: false },
        children: [
          {
            path: 'menu1-1',
            name: 'menu1-1',
            component: 'menu1-1',
            meta: { title: 'menu1-1', hidden: false }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'menu2',
        component: 'menu2',
        meta: { title: 'menu2', hidden: false }
      }
    ]
  },
]

export default [
  {
    url: "/mock/login",
    method: "post",
    response: (request: { token: string, body: any }) => {
      let isMatch: boolean
      let res: any = null
      userWareHouse.filter(item => {
        if (request.body.userName == item.userName && request.body.passWord == item.passWord) {
          res = resultSuccess({
            token: item.token,
            userName: item.userName,
            roles: item.roles
          })
          isMatch = true
        }
        if (!res && !isMatch) {
          res = resultError({
            code: 100
          }, '请输入正确的账号与密码')
        }
      })
      return res
    },
  },
  {
    url: "/mock/RouteList",
    method: "post",
    response: (request: requestParams) => {
      const { roles } = request.body
      let res: any[] = []
      RouteHouse.filter(item => {
        if (item.meta.roles.includes(roles)) {
          res.push(item)
        }
      })
      return resultSuccess(res)
    },
  }
]