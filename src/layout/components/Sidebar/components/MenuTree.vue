<template>
  <el-sub-menu v-if="item.children && item.children.length > 0" :index="basePath">
    <template #title>
      <span>{{item.meta.title}}</span>
    </template>
    <template v-for="route in item.children" :key="route.path">
      <MenuTree :item="route" v-if="route.meta && !route.meta.hidder" :base-path="basePath + '/' +route.path" />
    </template>
  </el-sub-menu>
  <el-menu-item v-else :index="basePath">{{item.meta.title}}</el-menu-item>

</template>

<script setup lang="ts">
  import type { RouteRecordRaw } from 'vue-router'

  const props = defineProps<{
    item: RouteRecordRaw,
    basePath: string
  }>()

  const hasOneShowingChild = (item) => {
    if (item.meta) {

    }
  }
</script>

<style scoped lang="less">

</style>
