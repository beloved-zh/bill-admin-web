<template>
  <el-aside class="app-sidebar" :width="sidebar.open ? variables.sideBarWidth: variables.sideBarShrinkWidth">
    <el-link class="sidebar-logo" :underline="false">
      <img class="logo-img" src="/src/assets/images/logo.png">
      <span class="logo-title" v-if="sidebar.open">LOGO</span>
    </el-link>
    <el-scrollbar class="scrollbar" wrap-class="scrollbar-wrapper">
      <el-menu
          class="app-sidebar-el-menu"
          mode="vertical"
          :collapse="!sidebar.open"
          :unique-opened="true"
          :default-active="activeMenu"
          :collapse-transition="false"
      >
        <template v-for="menu in menus" :key="menu.path">
          <tree-item v-if="!menu.meta.hidden" :menu-item="menu" :base-path="resolveBasePath(menu.path)" :open="sidebar.open" />
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
  import { resolveBasePath } from '@utils/index'

  defineOptions({
    name: 'Sidebar'
  })

  const route = useRoute()

  const { app, menu } = useStore()

  const menus = computed<MenuTree[]>(() => menu.menus)
  const sidebar = computed(() => app.sidebar)

  const activeMenu = computed(() => route.path)

</script>

<style scoped lang="less">

  .app-sidebar {
    max-width: @sideBarWidth;
    min-width: @sideBarShrinkWidth;
    overflow: hidden;
    overscroll-behavior: contain;
    transition: width 0.2s linear;
    box-shadow: 1px 0px 3px 0 rgb(0 0 0 / 12%),0 0 3px 0 rgb(0 0 0 / 4%);
    z-index: 1;

    .sidebar-logo {
      width: inherit;
      height: @sideBarLogoContainerHeight;
      background-color: @sideBarLogoContainerBg;
      padding: 0 10px;
      overflow: hidden;

      .logo-img {
        width: @sideBarLogoWidth;
        height: @sideBarLogoHeight;
      }
      .logo-title {
        margin-left: 10px;
        font-weight: 700;
        color: #ffffff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .scrollbar {
      :deep(.scrollbar-wrapper) {
        height: calc(100% - @sideBarLogoContainerHeight);
        overflow-x: hidden;
        border-right: solid 1px #dcdfe6;
        .app-sidebar-el-menu {
          border-right: none;
          transition: all 10ms;
        }
      }

      :deep(.el-scrollbar__bar) {
        width: 0;
        height: 0;
      }
    }
  }
</style>
