import { defineStore } from 'pinia'
import type { MenuTree } from '@api/auth/types'
import type { MenuState } from '../types/menu'
import type { RouteRecordRaw } from 'vue-router'
import { getMenuTree } from '@/api/auth'
import {Layout, errorPage, constantRoutes } from '@router/constantRoutes'
import path from 'path-browserify'

const modules = import.meta.glob('../../views/**/**.vue')

const generateAsyncRoute = (menuTrees: MenuTree[]): RouteRecordRaw[] => {

    const children = formatRoutes(menuTrees)

    const addRoutes:RouteRecordRaw[] = [
        {
            path: '/',
            component: Layout,
            children: children,
            redirect: children[0]?.path
        },
        {
            path: '/:path(.*)*',
            component: errorPage
        }
    ]

    return addRoutes
}

const formatRoutes = (menuTrees: MenuTree[], basePath = '/', breadcrumbs:string[] = []): RouteRecordRaw[] => {
    let routes:RouteRecordRaw[] = []
    menuTrees.forEach(item => {
        breadcrumbs.push(item.meta.title as string)
        if (item.children && item.children.length > 0) {
            routes = routes.concat(formatRoutes(item.children, path.resolve(basePath, item.path), breadcrumbs))
        } else {
            routes.push({
                path: path.resolve(basePath, item.path),
                name: item.name,
                meta: {
                    ...item.meta,
                    breadcrumbs: breadcrumbs
                },
                component: modules[`../../views/${item.component}/index.vue`] || errorPage,
            })
        }
        breadcrumbs = []
    })

    return routes
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