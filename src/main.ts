import { createApp } from 'vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/stores'
import http from '@/utils/http'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'

async function setupApp() {
  const app = createApp(App)
  // 配置store
  setupStore(app)
  // 配置路由
  setupRouter(app)
  // 定义全局方法
  app.config.globalProperties.$request = http

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  app.mount('#app')
}

setupApp()