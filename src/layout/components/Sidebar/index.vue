<template>
  <t-aside class="app-sidebar" :width="sidebar.open ? variables['menu-unfold-width'] : variables['menu-fold-width']">
    <t-menu
        ref="menuRef"
        :expand-mutex="true"
        :value="activeMenu"
        v-model:expanded="expandedMenus"
        :collapsed="!sidebar.open"
        :width="menuWidth"
    >
      <template #logo>
        <div class="logo-content">
          <img class="logo-img" src="/src/assets/images/logo.png" />
          <span class="logo-title" v-if="sidebar.open">LOGO</span>
        </div>
      </template>

      <template v-for="menu in menus" :key="menu.path">
        <tree-item v-if="!menu.meta.hidden" :menu="menu" :path="resolveBasePath(menu.path)" :open="sidebar.open" />
      </template>
    </t-menu>
  </t-aside>
</template>

<script setup lang="ts">

  import variables from '@/assets/styles/variables.module.less';
  import type { TdMenuInterface } from 'tdesign-vue-next/lib/menu/const'
  import type { MenuValue } from 'tdesign-vue-next/lib/menu/type'
  import TreeItem from '@layout/components/Sidebar/components/TreeItem/index.vue'
  import useStore from '@store/index'
  import { useRoute } from 'vue-router'
  import { MenuTree } from '@api/auth/types'
  import { resolveBasePath } from '@utils/index'

  defineOptions({
    name: 'Sidebar'
  })

  const menuRef = ref<TdMenuInterface>()

  const expandedMenus = ref<MenuValue[]>()

  const route = useRoute()

  const { useApp, useMenu } = useStore()

  const menus = computed<MenuTree[]>(() => useMenu.menus)
  const sidebar = computed(() => useApp.sidebar)
  const activeMenu = computed(() => route.path)
  const menuWidth = computed(() => [variables['menu-unfold-width'], variables['menu-fold-width']])

  watch(route, () => {
    expandedMenus.value = route.meta.breadcrumbs!.map(item => item.path)
  }, {
    immediate: true
  })

</script>

<style scoped lang="less">

  .app-sidebar {

    :deep(.t-default-menu) {
      border-right: 1px solid var(--td-component-stroke);
    }

    :deep(.t-menu__logo) {
      height: @nav-bar-height + @tags-view-height;
    }

    .logo-content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .logo-img {
        width: 30px;
        height: 30px;
      }

      .logo-title {
        margin-left: 10px;
        font-weight: 700;
        color: #000000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }




  }
</style>
