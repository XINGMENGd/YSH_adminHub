import router from '@/router/index';//绝对不要加.ts后缀

function getModules() {
  // vite无法像webpack一样在import引入中使用模板字符串，改用这个引入全部页面，在去根据后端返回路由名匹配进行路由组件懒加载
  const components = import.meta.glob('@/views/**/*.vue')
  return components
}
const modules = getModules();
const reg = /^\/src\/views\/(.+)\/index\.vue$/
const arr: any[] = []
Object.keys(modules).forEach((item: any) => {
  arr.push(item.match(reg)[1])
})

function matchRoute(route: any) {
  route.forEach((item: any) => {
    if (item.children) {
      item.meta.hasChildren = true
      return matchRoute(item.children)
    } else {
      item.meta.hasChildren = false
      arr.forEach(index => {
        if (index.includes(item.name)) {
          item.component = modules[`/src/views/${index}/index.vue`]
        }
      })
      return item
    }
  })
  return route
}

// export const filterSingleChild = (routeMenu: any) => {
//   console.log(routeMenu,'routeMenu');
  
//   routeMenu = routeMenu.map((item: any) => {
//     if (item.children?.length == 1) {
//       item.path = item.children[0].path == 'home' ? '/home' : `${item.path}/${item.children[0].path}`
//       item.meta.title = item.children[0].name
//       // item.meta.hasChildren = false
//       delete item.children
//     } else {
//       function match(fatherPath: any, children: any) {
//         let Path = fatherPath
//         children.map((index: any) => {
//           if (index.children) {
//             return match(`${Path}/${index.path}`, index.children)
//           } else {
//             index.path = `${Path}/${index.name}`
//             return index
//           }
//         })
//       }
//       match(item.path, item.children)
//     }
//     return item
//   })
// }



// export const processRoute = (routeList: any) => {
//   matchRoute(Object.values(routeList))
//   routeList.forEach((item: any) => {
//     item.component = () => import('@/Layout/index.vue')
//   })
//   return routeList
// }

// // 匹配路由信息地址
// export const addRoute = async (routeList: any) => {
//   const arr1 = Object.values(routeList)
//   const arr2 = router.getRoutes()
//   const newArr = uniqueArray(arr1, arr2, 'path')
//   matchRoute(Object.values(newArr))
//   newArr.forEach((index: any) => {
//     index.component = () => import('@/Layout/index.vue')
//   })
//   return newArr.forEach((index: any) => router.addRoute(index))
// }