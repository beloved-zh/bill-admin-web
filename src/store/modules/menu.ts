import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import type { MenuState } from '../types/menu'
import type { MenuTree } from '@/api/auth/types'
import type { Breadcrumb } from '@/router/types'
import { getMenuTree } from '@/api/auth'
import { Layout, constantRoutes, errorPage, iframePage } from '@/router/constantRoutes'
import { isExternalLink, resolvePath } from '@/utils/index'

const modules = import.meta.glob('../../views/**/**.vue')

const formatRoutes = (menuTrees: MenuTree[], basePath = '/', breadcrumbs: Breadcrumb[] = []): RouteRecordRaw[] => {
  let routes: RouteRecordRaw[] = []
  menuTrees.forEach(item => {
    breadcrumbs.push({
      path: resolvePath(basePath, item.path),
      title: item.meta.title as string
    })
    if (item.children && item.children.length > 0) {
      routes = routes.concat(formatRoutes(item.children, resolvePath(basePath, item.path), breadcrumbs))
    } else {
      // 新建标签页菜单不注册路由
      if (!isExternalLink(item.path)) {
        // 判断是否 iframe 路由
        if (isExternalLink(item.component!)) {
          routes.push({
            path: resolvePath(basePath, item.path),
            name: item.name,
            meta: {
              ...item.meta,
              breadcrumbs: JSON.parse(JSON.stringify(breadcrumbs)),
              iframe: item.component!
            },
            component: iframePage
          })
        } else {
          routes.push({
            path: resolvePath(basePath, item.path),
            name: item.name,
            meta: {
              ...item.meta,
              breadcrumbs: JSON.parse(JSON.stringify(breadcrumbs))
            },
            component: modules[`../../views/${item.component}/index.vue`] || errorPage
          })
        }
      }
    }
    breadcrumbs.pop()
  })

  return routes
}

const generateAsyncRoute = (menuTrees: MenuTree[]): RouteRecordRaw[] => {
  const children = formatRoutes(menuTrees)

  const addRoutes: RouteRecordRaw[] = [
    {
      path: '/',
      component: Layout,
      children,
      redirect: children[0]?.path
    },
    {
      path: '/:path(.*)*',
      component: errorPage
    }
  ]

  return addRoutes
}

const useMenuStore = defineStore({
  id: 'menu',
  state: (): MenuState => ({
    menus: [],
    routes: [],
    addRoutes: []
  }),
  getters: {},
  actions: {
    setMenus(menus: MenuTree[]) {
      this.menus = menus
    },
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = routes
      this.routes = constantRoutes.concat(routes)
    },
    getMenuTree() {
      return new Promise<RouteRecordRaw[]>((resolve, reject) => {
        getMenuTree()
          .then(data => {
            this.setMenus(data)
            const asyncRoute = generateAsyncRoute(data)
            this.setRoutes(asyncRoute)
            resolve(this.addRoutes)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
})

export default useMenuStore
