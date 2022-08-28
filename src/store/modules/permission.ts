import { defineStore } from 'pinia'
import type { PermissionState } from '../types/permission'
import type { RouteRecordRaw } from 'vue-router'
import type { RouteTree } from '@api/auth/types'
import { constantRoutes } from '@/router'
import { getRoutes } from '@/api/auth'

const modules = import.meta.glob('../../views/**/**.vue');
const Layout = () => import('@/layout/index.vue')
const ParentView = () => import('@components/ParentView/index.vue')

const generateAsyncRoutes = (routes: RouteTree[] | RouteRecordRaw[]): RouteRecordRaw[] => {
  return routes.map(route => {

    switch (route.component) {
      case 'Layout':
        route.component = Layout
        break
      case 'ParentView':
        route.component = ParentView
        break
      default:
        // route.component = modules[`../../views/${route.component}/index.vue`] || import('@views/error-page/404.vue')
        route.component = modules[`../../views/${route.component}/index.vue`] || modules[`../../views/error-page/404.vue`]
    }

    if (route.children) {
      route.children = generateAsyncRoutes(route.children)
    }

    return route
  })
}

const permissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: [],
    addRoutes: [],
  }),
  getters: {},
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = routes
      this.routes = constantRoutes.concat(routes)
    },
    getRoutes() {
      return new Promise<RouteRecordRaw[]>((resolve, reject) => {
        getRoutes()
            .then(data => {
              const asyncRoutes = generateAsyncRoutes(data)
              this.setRoutes(asyncRoutes)
              resolve(asyncRoutes)
            })
            .catch(err => {
              reject(err)
            })
      })
    }
  }
})

export default permissionStore