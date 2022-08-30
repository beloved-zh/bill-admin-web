<template>
  <el-header height="85px" class="app-header">
    <Navbar/>
    <TagsView/>
  </el-header>
</template>

<script setup lang="ts">
  import Navbar from '@layout/components/Header/components/Navbar/index.vue'
  import TagsView from '@layout/components/Header/components/TagsView/index.vue'
</script>

<style scoped lang="less">
</style>