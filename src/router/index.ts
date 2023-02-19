import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import http from '@/api/http'

// createWebHistory  --history模式
// createWebHashHistory  --hash模式

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index/index.vue') //一定要有.vue后缀    
  },
  {
    path: '/demo',
    name: 'demo1',
    component: () => import('../views/demo/index.vue') //一定要有.vue后缀    
  },
  {
    path: '/demo2',
    name: 'demo2',
    component: () => import('../views/demo2/index.vue') //一定要有.vue后缀    
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router