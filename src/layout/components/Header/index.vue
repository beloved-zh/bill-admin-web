<template>
  <el-header height="85px" class="app-header">
    <Navbar/>
    <TagsView/>
  </el-header>
</template>

<script setup lang="ts">
  import Sidebar from '@layout/components/Sidebar/index.vue'
  import Navbar from '@layout/components/Header/components/Navbar.vue'
  import TagsView from '@layout/components/Header/components/TagsView.vue'
</script>

<style scoped lang="less">
</style>