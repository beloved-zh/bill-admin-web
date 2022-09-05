<template>
  <el-menu-item v-if="!menuItem.children || menuItem.children.length === 0" :index="basePath">
    <svg-icon :class="{icon: open}" v-if="menuItem.meta.icon" :name="menuItem.meta.icon" size="20px" />
    <template #title>
      <span>{{menuItem.meta.title}}</span>
    </template>
  </el-menu-item>
  <el-sub-menu v-else :index="basePath">
    <template #title>
      <svg-icon :class="{icon: open}" v-if="menuItem.meta.icon" :name="menuItem.meta.icon" size="20px" />
      <span>{{menuItem.meta.title}}</span>
    </template>
    <template v-for="item in menuItem.children" :key="resolvePath(item.path)">
      <tree-item v-if="!item.meta.hidden" :menu-item="item" :base-path="resolvePath(item.path)" :open="open" />
    </template>
  </el-sub-menu>

</template>

<script setup lang="ts">
  import SvgIcon from '@components/SvgIcon/index.vue'
  import path from 'path-browserify'
  import TreeItem from '@layout/components/Sidebar/components/TreeItem/index.vue'
  import { MenuTree } from '@api/auth/types'

  const props = defineProps<{
    menuItem: MenuTree,
    basePath: string,
    open: boolean
  }>()

  const resolvePath = (routePath: string) => {
    return path.resolve(props.basePath, routePath)
  }

</script>

<style scoped lang="less">

</style>
