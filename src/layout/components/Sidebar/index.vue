<template>
  <div class="has-logo">
    <div class="sidebar-logo-container">
      <transition name="sidebarLogoFade">
        <div>
          <img src="/src/assets/logo.png" class="sidebar-logo" />
          <h1 class="sidebar-title">XXXX</h1>
        </div>
      </transition>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-aside width="100%">
        <el-menu
            mode="vertical"
            :collapse="false"
            :background-color="variables.menuBg"
            :text-color="variables.menuText"
            :active-text-color="variables.menuActiveText"
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
                <span>{{ i }} - 1 - 1</span>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item :index="i+'-2'">
              <span>{{ i }} - 2</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
    </el-scrollbar>
  </div>

</template>

<script setup lang="ts">
  import variables from '@assets/styles/variables.module.less'

</script>

<style scoped lang="less">
  .sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
  }

  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }

</style>
