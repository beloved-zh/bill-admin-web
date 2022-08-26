import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

export const Layout = () => import('@/layout/index.vue')

// 静态路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@views/dashboard/index.vue')
      }
    ]
  },
  {
    path: '/test',
    component: () => import('@views/test/index.vue')
  },
  {
    path: '/login',
    component: () => import('@views/login/index.vue')
  }
];

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
