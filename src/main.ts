import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';//绝对不要加.ts后缀
import store from './store/index'
import Layout from '@/Layout/index.vue'

import { useLoginStore } from '@/store/login';
import { storeToRefs } from 'pinia';
import FetchRoute from "@/api/login/reqRoute"
import { setRoute } from './utils/route';

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

router.beforeEach(async (to, from, next) => {
  const useStore = useLoginStore();
  const { token } = storeToRefs(useStore);
  // 不能只判断有没有token，这样重定向到登录页时还会判断有没有token，导致无限重定向
  if (token.value) {
    // 登录过就不能访问登录界面，需要中断这一次路由守卫，执行下一次路由守卫，并且下一次守卫的to是主页'
    if (to.path === '/login') {
      next({ path: '/' })
    }
    // 保存在store中路由不为空则放行 (如果执行了刷新操作，则 store 里的路由为空，此时需要重新添加路由)
    if (!!useStore.GET_Routers.length) {
      // if (!!useStore.GET_Routers.length || to.name != null) {
      //放行
      next()
    } else {
      // 将路由添加到 store 中，用来标记已添加动态路由
      const res = await FetchRoute.FetchRouteList()
      setRoute(res)
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

// 定义全局方法
import http from '@/api/http'
app.config.globalProperties.$request = () => {
  return http
}
// app.config.globalProperties.$test = () => {
//   console.log(1123);
// }
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(store).mount("#app");
