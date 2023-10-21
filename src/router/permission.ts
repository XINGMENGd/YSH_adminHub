import { getRoute } from '@/api/Authentication'
import LoginStore from '@/stores/Auth'
import type { Router } from 'vue-router'
import { setRoute } from './routes/setRoutes'

export const setupRouterGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const useStore = LoginStore()
    const { token } = useStore.GET_userInfo
    if (token !== '') {
      // 登录过就不能访问登录界面，需要中断这一次路由守卫，执行下一次路由守卫，并且下一次守卫的to是主页'
      if (to.path === '/login') {
        next({ path: '/' })
      }
      // 保存在store中路由不为空则放行 (如果执行了刷新操作，则 store 里的路由为空，此时需要重新添加路由)
      if (useStore.GET_routers.length > 0) {
        // if (!!useStore.GET_Routers.length || to.name != null) {
        // 放行
        next()
      } else {
        // 将路由添加到 store 中，用来标记已添加动态路由
        const { data } = await getRoute()
        setRoute(data)
        // 如果 addRoutes 并未完成，路由守卫会一层一层的执行执行，直到 addRoutes 完成，找到对应的路由
        next({ ...to, replace: true })
      }
    } else {
      // 未登录时，注意 ：在这里也许你的项目不只有 login 不需要登录 ，register 等其他不需要登录的页面也需要处理
      if (to.path !== '/login') {
        next({ path: '/login' })
      } else {
        next()
      }
    }
  })
}
