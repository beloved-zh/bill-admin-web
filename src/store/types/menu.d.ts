import type { MenuTree } from '@api/auth/types'
import type { RouteRecordRaw } from 'vue-router'

export interface MenuState {
    menus: MenuTree[];
    routes: RouteRecordRaw[];
    addRoutes: RouteRecordRaw[];
}