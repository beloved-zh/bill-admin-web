<template>
  <el-menu-item v-if="showMenuItem" :index="basePath">
    <svg-icon :class="{icon: open}" v-if="showItem.meta.icon" :name="showItem.meta.icon" size="20px" />
    <template #title>
      <span>{{showItem.meta.title}}</span>
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

  const showItem = ref<MenuTree>()

  const showMenuItem = computed(() => {
    const menuItem = props.menuItem

    // 没有子项 显示菜单
    if (!menuItem.children || menuItem.children.length === 0) {
      showItem.value = menuItem
      return true
    }

    // 查询当前所有显示的菜单项
    const showingChildren =  menuItem.children.filter(item => {
      if (item.meta.hidden) {
        return false
      } else {
        return true
      }
    })

    // 只有唯一子项 且自己没有 title 显示菜单否则显示目录
    if (showingChildren.length === 1) {
      if (menuItem.meta && menuItem.meta.title) {
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
