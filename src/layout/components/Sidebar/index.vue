<template>
  <el-aside class="app-sidebar" :width="sidebar.open ? variables.sideBarWidth: variables.sideBarShrinkWidth">
    <el-link class="sidebar-logo" :underline="false">
      <img class="logo-img" src="/src/assets/images/logo.png">
      <span class="logo-title" v-if="sidebar.open">LOGO</span>
    </el-link>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
          class="app-sidebar-el-menu"
          mode="vertical"
          :collapse="!sidebar.open"
          :unique-opened="true"
          :default-active="activeMenu"
          :router="true"
          :collapse-transition="false"
      >
        <template v-for="menu in menus" :key="menu.path">
          <tree-item v-if="!menu.meta.hidden" :menu-item="menu" :base-path="resolvePath(menu.path)" :open="sidebar.open" />
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
  import variables from '@assets/styles/variables.module.less'
  import TreeItem from '@layout/components/Sidebar/components/TreeItem/index.vue'
  import useStore from '@store/index'
  import { useRoute } from 'vue-router'
  import { MenuTree } from '@api/auth/types'
  import path from 'path-browserify'

  const route = useRoute()

  const { app, menu } = useStore()

  const menus = computed<MenuTree[]>(() => menu.menus)
  const sidebar = computed(() => app.sidebar)

  const activeMenu = computed(() => route.path)

  const resolvePath = (basePath: string): string => {
    return path.resolve('/', basePath)
  }

</script>

<style scoped lang="less">
  :deep(.el-scrollbar__bar) {
    width: 0!important;
    height: 0!important;
  }
</style>
