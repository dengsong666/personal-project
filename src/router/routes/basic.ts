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
    name: 'Foods',
    path: '/foods',
    component: () => import('@/pages/foods/index.vue'),
    children: [
      {
        name: 'List',
        path: 'list',
        component: () => import('@/pages/foods/list.vue'),
        children: [
          {
            name: 'Food',
            path: ':food',
            component: () => import('@/pages/foods/food.vue')
          }
        ],
        meta: { title: '列表' }
      }
    ],
    meta: { title: '食物' }
  },
  {
    name: 'NotFound',
    path: '/not-found',
    component: () => import('@/layout/NotFound.vue')
  }
]
