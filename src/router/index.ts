import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

// createWebHistory  --history模式
// createWebHashHistory  --hash模式
import Layout from '@/Layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录页', hidden: false }
  },
  {
    name: '首页',
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { title: 'home', hidden: false },
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: { title: 'home', hidden: false }
    }]
  },
  {
    name: 'NotFound',
    path: '/NotFound',
    component: () => import('@/views/NotFound/index.vue'),
    meta: { hidden: true }
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
