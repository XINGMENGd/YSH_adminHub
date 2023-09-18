import router from '@/router/index';//绝对不要加.ts后缀
import Layout from '@/Layout/index.vue'
import LoginStore from '@/stores/login';

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

export const setRoute = (routeList: any) => {
  const useStore = LoginStore();
  useStore.SET_ROUTERS(routeList)
  routeList = assistSetRoute(routeList)
  routeList.forEach((item: any) => router?.addRoute(item))
  router.addRoute({
    path: '/:pathMatch(.*)',
    redirect: '/NotFound',
    meta: { hidden: true }
  })
}

const assistSetRoute = (routeList: any) => {
  routeList.forEach((item: any) => {
    if (item.component == 'Layout') {
      item.component = Layout
      item.children ? assistSetRoute(item.children) : ''
    } else {
      item.component ? item.component = modules[`/src/views/${item.component}/index.vue`] : assistSetRoute(item.children)
    }
  })
  return routeList
}