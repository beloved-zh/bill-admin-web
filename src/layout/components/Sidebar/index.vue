<template>
  <el-aside class="app-sidebar" :width="variables.sideBarWidth">
    <el-link class="sidebar-logo" :underline="false">
      <img src="/src/assets/images/logo.png">
      <span>LOGO</span>
    </el-link>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
          mode="vertical"
          :collapse="false"
          :unique-opened="false"
          class="app-sidebar-el-menu"
          router
      >
        <template v-for="route in routes" :key="route.path">
          <MenuTree :item="route" v-if="route.meta.hidden" :base-path="route.path" />
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
  import type { RouteRecordRaw } from 'vue-router'
  import variables from '@assets/styles/variables.module.less'
  import MenuTree from '@layout/components/Sidebar/components/MenuTree.vue'
  import useStore from '@/store'

  const { permission } = useStore()

  const routes = computed<RouteRecordRaw[]>(() => permission.routes)

</script>

<style scoped lang="less">
  :deep(.el-scrollbar__bar) {
    width: 0!important;
    height: 0!important;
  }
</style>
