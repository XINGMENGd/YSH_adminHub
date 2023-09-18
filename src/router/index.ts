import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// createWebHistory  --history模式
// createWebHashHistory  --hash模式
import Layout from '@/Layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'), // 一定要有.vue后缀    
    meta: { title: '登录页', hidden: false }
  },
  {
    name: "首页",
    path: '/',
    component: Layout, // 一定要有.vue后缀
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
    component: () => import('@/views/NotFound/index.vue'), // 一定要有.vue后缀    
    meta: { hidden: true }
  }
]
let router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router