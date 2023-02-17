import type { RouteRecordRaw } from 'vue-router'
import Home from '@/pages/home/index.vue'
export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    name: 'Home',
    path: '/home',
    component: Home
  },
  {
    name: 'Purine',
    path: '/purine',
    component: () => import('@/pages/purine/index.vue')
  },
  {
    name: 'NotFound',
    path: '/not-found',
    component: () => import('@/layout/NotFound.vue')
  }
]
