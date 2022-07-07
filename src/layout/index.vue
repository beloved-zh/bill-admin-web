<template>
  <el-container>
    <Sidebar class="sidebar-container"></Sidebar>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import Sidebar from '@layout/components/Sidebar/index.vue'
</script>

<style scoped lang="less">
  .app {
    height: 100%;
  }
</style>