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
          icon: 'github'
        }
      }
    ],
    meta: {
      hidden: false
    }
  },
  // {
  //   path: '/test',
  //   component: Layout,
  //   meta: {
  //     title: '测试单目录',
  //     hidden: false,
  //     icon: 'github'
  //   }
  // },
  // {
  //   path: '/system',
  //   component: Layout,
  //   redirect: '/system/user',
  //   children: [
  //     {
  //       path: 'user',
  //       component: () => import('@views/test/index.vue'),
  //       meta: {
  //         title: '用户管理',
  //         hidden: false,
  //         icon: 'github'
  //       }
  //     },
  //     {
  //       path: 'menu',
  //       component: () => import('@views/test/index2.vue'),
  //       meta: {
  //         title: '菜单管理',
  //         hidden: false,
  //         icon: 'github'
  //       }
  //     }
  //   ],
  //   meta: {
  //     title: '系统管理',
  //     hidden: false,
  //     icon: 'github'
  //   }
  // },
  // {
  //   path: '/test01',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'test01-01',
  //       component: ParentView,
  //       children: [
  //         {
  //           path: 'test01-01-01',
  //           component: () => import('@views/test/index.vue'),
  //           meta: {
  //             title: '测试01-01',
  //             hidden: false,
  //             icon: 'github'
  //           }
  //         }
  //       ],
  //       meta: {
  //         title: '测试01',
  //         hidden: false,
  //         icon: 'github'
  //       }
  //     }
  //   ],
  //   meta: {
  //     title: '测试目录',
  //     hidden: false,
  //     icon: 'github',
  //   }
  // },
  {
    path: '/login',
    component: () => import('@views/login/index.vue')
  }
];

console.log('路由', constantRoutes)
// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
