<template>
  <div class="navbar">
    <div class="left-content">
      <div class="sidebar-control">
        <svg-icon name="shousuo" size="20px" />
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <div class="item">
        <svg-icon name="sousuo" size="20px" />
      </div>
      <div class="item">
        <svg-icon name="baitianmoshi" size="20px" />
      </div>
      <div class="item">
        <svg-icon name="quanping" size="20px" />
      </div>
      <div class="item">
        <svg-icon name="bianji" size="22px" />
      </div>
      <div class="item">
        <el-avatar :size="30" src="https://joeschmoe.io/api/v1/random" />
      </div>
      <span class="item">admin</span>
    </div>
  </div>

</template>

<script setup lang="ts">
import SvgIcon from '@components/SvgIcon/index.vue'
</script>

<style scoped lang="less">
</style>