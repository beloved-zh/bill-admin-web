import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

export const Layout = () => import('@/layout/index.vue')
export const ParentView = () => import('@components/ParentView/index.vue')

// 静态路由
export const constantRoutes:RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@views/dashboard/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'github',
          fixed: true
        }
      }
    ],
    meta: {
      hidden: false
    }
  },
  {
    path: '/login',
    component: () => import('@views/login/index.vue')
  }
]

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
