import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import { constantRoutes, whiteList } from './constantRoutes'
import useStore from '@/store/index'

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach(async (to, from, next) => {
  console.log(from)
  NProgress.start()
  const { useUser, useMenu } = useStore()
  if (useUser.token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (useUser.hasInfo) {
        next()
        NProgress.done()
      } else {
        try {
          await useUser.getUserInfo()
          const asyncRoutes: RouteRecordRaw[] = await useMenu.getMenuTree()
          asyncRoutes.forEach(route => router.addRoute(route))
          next({ ...to, replace: true })
          NProgress.done()
        } catch (err) {
          // 移除 token 并跳转登录页
          useUser.resetToken()
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 未登录可以访问白名单页面(登录页面)
    if (whiteList.includes(to.path)) {
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
