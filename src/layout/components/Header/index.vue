<template>
  <t-header class="app-header">
    <NavBar/>
    <TagsView/>
  </t-header>
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
    height: @nav-bar-height + @tags-view-height;
  }
</style>