import router from '@/router/index'
import Layout from '@/Layout/index.vue'
import LoginStore from '@/stores/Auth'

const getModules = (): any => {
  // vite无法像webpack一样在import引入中使用模板字符串，改用这个引入全部页面，在去根据后端返回路由名匹配进行路由组件懒加载
  const components = import.meta.glob('@/views/**/*.vue')
  return components
}
const modules = getModules()
// const reg = /^\/src\/views\/(.+)\/index\.vue$/
// const arr = []
// Object.keys(modules).forEach((item: any) => arr.push(item.match(reg)[1]))

export const setRoute = (routeList: any): void => {
  const useStore = LoginStore()
  useStore.SET_routers(routeList)
  routeList = assistSetRoute(routeList)
  routeList?.forEach((item: any) => router?.addRoute(item))
  router.addRoute({
    path: '/:pathMatch(.*)',
    redirect: '/NotFound',
    meta: { hidden: true }
  })
}

interface routesItem {
  id: string
  parent_id: string
  children?: any[] | null
  component?: any | null
}

const assistSetRoute = (routeList: any): any[] => {
  routeList?.forEach((item: routesItem) => {
    if (item.component === 'Layout') {
      item.component = Layout
      item.children !== null ? assistSetRoute(item.children) : ''
    } else {
      if (item.component !== null && item.component !== undefined) {
        item.component = modules[`/src/views/${item.component}/index.vue`] as string
      } else {
        assistSetRoute(item.children)
      }
    }
  })
  return routeList
}
