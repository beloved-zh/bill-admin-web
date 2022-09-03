import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import useStore from '@store/index'

import { whiteList, constantRoutes } from './constantRoutes'

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// @ts-ignore 忽略 form 未使用提示
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const { user, menu } = useStore();
  if (user.token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (user.userName) {
        next()
        NProgress.done()
      } else {
        try {
          await user.getUserInfo()
          const asyncRoutes:RouteRecordRaw[] = await menu.getMenuTree()
          asyncRoutes.forEach(route => router.addRoute(route))
          next({ ...to, replace: true })
          NProgress.done()
        } catch (err) {
          // 移除 token 并跳转登录页
          await user.resetToken()
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 未登录可以访问白名单页面(登录页面)
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
