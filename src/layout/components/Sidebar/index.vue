<template>
  <el-aside class="app-sidebar" :width="variables.sideBarWidth">
    <el-link class="sidebar-logo" :underline="false">
      <img src="/src/assets/images/logo.png">
      <span>LOGO</span>
    </el-link>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
          class="app-sidebar-el-menu"
          mode="vertical"
          :collapse="false"
          :unique-opened="true"
          :default-active="activeMenu"
          :router="true"
      >
        <template v-for="(route,index) in routes" :key="route.path + '-' + index">
          <TreeItem v-if="route.meta && !route.meta.hidden" :route="route" :base-path="route.path" />
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
  console.log(route.path)

  const { permission } = useStore()

  const routes = computed<RouteRecordRaw[]>(() => permission.routes)

  const activeMenu = computed(() => route.path)
</script>

<style scoped lang="less">
  :deep(.el-scrollbar__bar) {
    width: 0!important;
    height: 0!important;
  }
</style>
