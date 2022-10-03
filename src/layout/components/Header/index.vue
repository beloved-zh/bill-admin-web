<template>
  <el-header class="app-header">
    <NavBar/>
    <TagsView/>
  </el-header>
</template>

<script setup lang="ts">
  import NavBar from '@layout/components/Header/components/NavBar/index.vue'
  import TagsView from '@layout/components/Header/components/TagsView/index.vue'

  defineOptions({
    name: 'Header'
  })
</script>

<style scoped lang="less">
  .app-header {
    width: 100%;
    height: 84px;
    padding: 0;
    background-color: #ffffff;
  }
</style>