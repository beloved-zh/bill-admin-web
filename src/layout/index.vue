<template>
  <el-container direction="horizontal" class="app-layout">
    <Sidebar />
    <el-container direction="vertical">
      <Header />
      <AppMain />
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import Sidebar from '@layout/components/Sidebar/index.vue'
  import Header from '@layout/components/Header/index.vue'
  import AppMain from '@layout/components/AppMain/index.vue'

  defineOptions({
    name: 'Layout'
  })
</script>

<style scoped lang="less">

  .app-layout {
    width: 100%;
    height: 100%;
  }
</style>