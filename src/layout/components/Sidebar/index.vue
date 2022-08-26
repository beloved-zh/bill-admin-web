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
      >
        <el-sub-menu :index="i" v-for="i in 10">
          <template #title>
            <span>{{i}}</span>
          </template>
          <el-sub-menu :index="i+'-1'">
            <template #title>
              <span>{{ i }} - 1</span>
            </template>
            <el-menu-item :index="i+'-1-1'">
              <span>{{ i }} - 1 - 1 -----------------------------------------------1</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item :index="i+'-2'">
            <span>{{ i }} - 2</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
  import variables from '@assets/styles/variables.module.less'
</script>

<style scoped lang="less">
  :deep(.el-scrollbar__bar) {
    width: 0!important;
    height: 0!important;
  }
</style>
