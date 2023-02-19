// /mock/test.ts

export default [
  {
    url: "/mock/test",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "success",
        result: ["jiang", "junfeng"],
      };
    },
  }
]

// import { MockMethod } from 'vite-plugin-mock'
// import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util'

// export default [
//   {
//     url: '/mock/test',
//     method: 'get',
//     response: (request: requestParams) => {
//       console.log('----请求了getUserInfo---')

//       return resultSuccess({
//         name: '章三',
//         age: 40,
//         sex: '男'
//       })
//     }
//   }
// ] as MockMethod[]