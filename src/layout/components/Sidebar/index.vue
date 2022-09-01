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
        <template v-for="(route,index) in routes" :key="route.path + '-' + index">
          <TreeItem v-if="route.meta && !route.meta.hidden" :route="route" :base-path="route.path" :open="sidebar.open" />
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
  import type { RouteRecordRaw } from 'vue-router'
  import variables from '@assets/styles/variables.module.less'
  import TreeItem from '@layout/components/Sidebar/components/TreeItem.vue'
  import useStore from '@/store'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const { app, permission } = useStore()

  const routes = computed<RouteRecordRaw[]>(() => permission.routes)
  const sidebar = computed(() => app.sidebar)

  const activeMenu = computed(() => route.path)
</script>

<style scoped lang="less">
  :deep(.el-scrollbar__bar) {
    width: 0!important;
    height: 0!important;
  }
</style>
