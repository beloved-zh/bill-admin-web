import { defineStore } from 'pinia'
import type { PermissionState } from '../types/permission'
import type { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router'


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
      this.setRoutes([])
    }
  }
})

export default permissionStore