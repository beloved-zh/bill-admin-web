<template>
  <el-container direction="horizontal" class="app-layout">
    <Sidebar/>
    <el-container direction="vertical">
      <Header/>
      <el-main style="background-color: #fefefe">
        <AppMain/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import Sidebar from '@layout/components/Sidebar/index.vue'
  import Header from '@layout/components/Header/index.vue'
  import AppMain from '@layout/components/AppMain/index.vue'
</script>

<style scoped lang="less">
</style>