<script setup lang="ts">
import Sidebar from './components/Sidebar/index.vue'
import Header from './components/Header/index.vue'
import AppMain from './components/AppMain/index.vue'
import variables from '@/assets/styles/variables.module.less'
import useStore from '@/store/index'

defineOptions({
  name: 'Layout'
})

const { useApp } = useStore()

const menuWidth = computed(() => useApp.sidebar.open ? variables['menu-unfold-width'] : variables['menu-fold-width'])
</script>

<template>
  <t-layout direction="horizontal" class="app-layout">
    <sidebar />
    <t-layout direction="vertical" class="app-layout-header-main">
      <header />
      <app-main />
    </t-layout>
  </t-layout>
</template>

<style scoped lang="less">
.app-layout {
    width: 100vw;
    min-height: 100vh;
  }

  .app-layout-header-main {
    width: calc(~'100% - 'v-bind(menuWidth));
  }
</style>
