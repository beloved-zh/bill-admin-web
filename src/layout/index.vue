<template>
  <el-container direction="horizontal" class="app-layout">
    <Sidebar/>
    <el-container direction="vertical">
      <Header/>
      <el-main style="background-color: #fefefe">
<!--        <router-view></router-view>-->
        <router-view>
          <template #default="{ Component, route }">
            <keep-alive>
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </template>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import Sidebar from '@layout/components/Sidebar/index.vue'
  import Header from '@layout/components/Header/index.vue'
</script>

<style scoped lang="less">
</style>