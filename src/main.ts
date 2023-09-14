import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';//绝对不要加.ts后缀
import store from './store/index'

import { useLoginStore } from '@/store/login';
import { storeToRefs } from 'pinia';

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

router.beforeEach(async (to, from, next) => {
  const useStore = useLoginStore();
  const { token, jurisdiction, routeList } = storeToRefs(useStore);
  // 不能只判断有没有token，这样重定向到登录页时还会判断有没有token，导致无限重定向
  if (!token.value && to.path !== '/login') {
    next('/login')
  } else {
    // if (token.value) await useStore.setRouteList(jurisdiction.value)
    // await addRoute(routeList.value)
    if (!to.redirectedFrom) {
      next()
    } else {
      // if (to.fullPath == "/NotFound" && RoutePathNameArr.value.includes(to.redirectedFrom?.fullPath)) {
      //   // console.log('有路由');
      //   next({ path: to.redirectedFrom.fullPath, replace: true })
      // } else {
      //   // console.log('无路由');        
        next()
      // }
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
