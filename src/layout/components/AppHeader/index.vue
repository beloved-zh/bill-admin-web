<script setup lang="ts">
import NavBar from './components/NavBar/index.vue'
import TagsView from './components/TagsView/index.vue'

defineOptions({
  name: 'Header'
})
</script>

<template>
  <t-header class="app-header">
    <nav-bar />
    <tags-view />
  </t-header>
</template>

<style scoped lang="less">
.app-header {
  height: @nav-bar-height + @tags-view-height;
  border-bottom: 1px solid var(--td-component-stroke);
}
</style>
