import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes/index'
import { setupRouterGuard } from './permission'
import { App } from 'vue'
// createWebHistory  --history模式
// createWebHashHistory  --hash模式

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router-guard
// 路由守卫
setupRouterGuard(router)

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export { router }
