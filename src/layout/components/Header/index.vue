<template>
  <el-header height="85px" class="app-header">
    <NavBar/>
    <TagsView/>
  </el-header>
</template>

<script setup lang="ts">
  import NavBar from '@layout/components/Header/components/NavBar/index.vue'
  import TagsView from '@layout/components/Header/components/TagsView/index.vue'
</script>

<style scoped lang="less">
</style>