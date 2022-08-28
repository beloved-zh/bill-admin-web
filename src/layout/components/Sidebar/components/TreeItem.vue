<template>
  <el-menu-item v-if="showMenuItem" :index="resolvePath(showItem.path)">
    {{showItem.meta.title}}
  </el-menu-item>
  <el-sub-menu v-else :index="resolvePath(route.path)">
    <template #title>
      <span>{{route.meta.title}}</span>
    </template>
    <template v-for="item in route.children" :key="resolvePath(item.path)">
      <TreeItem v-if="item.meta && !item.meta.hidden" :route="item" :base-path="resolvePath(route.path)" />
    </template>
  </el-sub-menu>

</template>

<script setup lang="ts">
  import path from 'path-browserify'
  import type { RouteRecordRaw } from 'vue-router'

  const props = defineProps<{
    route: RouteRecordRaw,
    basePath: string
  }>()

  const showItem = ref<RouteRecordRaw>()

  const showMenuItem = computed(() => {
    const route = props.route

    // 没有子项 显示菜单
    if (!route.children || route.children.length === 0) {
      showItem.value = route
      return true
    }

    // 查询当前所有显示的菜单项
    const showingChildren =  route.children.filter(item => {
      if (item.meta && item.meta.hidden) {
        return false
      } else {
        return true
      }
    })

    // 只有唯一子项 且自己没有 title 显示菜单否则显示目录
    if (showingChildren.length === 1) {
      if (route.meta && route.meta.title) {
        return false
      }
      showItem.value = showingChildren[0]
      return true
    }

    return false
  })

  const resolvePath = (routePath: string) => {
    return path.resolve(props.basePath, routePath)
  }

</script>

<style scoped lang="less">

</style>
