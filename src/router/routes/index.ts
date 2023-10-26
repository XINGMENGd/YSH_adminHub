import Layout from '@/Layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

// 基础路由
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

export default routes