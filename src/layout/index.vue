<template>
  <t-layout direction="horizontal" class="app-layout">
    <Sidebar />
    <t-layout direction="vertical" class="app-layout-header-main">
      <Header />
      <AppMain />
    </t-layout>
  </t-layout>
</template>

<script setup lang="ts">
  import Sidebar from '@layout/components/Sidebar/index.vue'
  import Header from '@layout/components/Header/index.vue'
  import AppMain from '@layout/components/AppMain/index.vue'
  import variables from '@assets/styles/variables.module.less';
  import useStore from '@store/index'

  defineOptions({
    name: 'Layout'
  })

  const { useApp } = useStore()

  const menuWidth = computed(() => useApp.sidebar.open ? variables['menu-unfold-width'] : variables['menu-fold-width'])
</script>

<style scoped lang="less">

  .app-layout {
    width: 100vw;
    min-height: 100vh;
  }

  .app-layout-header-main {
    width: calc(~'100% - 'v-bind(menuWidth));
  }

</style>