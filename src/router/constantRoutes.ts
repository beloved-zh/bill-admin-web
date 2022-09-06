// 静态路由
import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

const errorPage = () => import('@views/error-page/404.vue')

const iframePage = () => import('@views/iframe/index.vue')

// 白名单路由
const whiteList = ['/login']

const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        component: () => import('@views/login/index.vue')
    }
]

export {
    Layout,
    errorPage,
    iframePage,
    whiteList,
    constantRoutes
}

