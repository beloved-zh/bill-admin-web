<template>
  <el-menu-item v-if="!menuItem.children || menuItem.children.length === 0" :index="basePath" @click="handleMenuItemClick">
    <svg-icon :class="{icon: open}" v-if="menuItem.meta.icon" :name="menuItem.meta.icon" size="small" />
    <template #title>
      <span>{{menuItem.meta.title}}</span>
    </template>
  </el-menu-item>
  <el-sub-menu v-else :index="basePath">
    <template #title>
      <svg-icon :class="{icon: open}" v-if="menuItem.meta.icon" :name="menuItem.meta.icon" size="20px" />
      <span>{{menuItem.meta.title}}</span>
    </template>
    <template v-for="item in menuItem.children" :key="resolvePath(props.basePath, item.path)">
      <tree-item v-if="!item.meta.hidden" :menu-item="item" :base-path="resolvePath(props.basePath, item.path)" :open="open" />
    </template>
  </el-sub-menu>

</template>

<script setup lang="ts">
  import type { MenuItemRegistered } from 'element-plus'
  import SvgIcon from '@components/SvgIcon/index.vue'
  import { isExternalLink, resolvePath } from '@utils/index'
  import TreeItem from '@layout/components/Sidebar/components/TreeItem/index.vue'
  import { MenuTree } from '@api/auth/types'
  import { useRouter } from 'vue-router'
  import useStore from '@store/index'

  defineOptions({
    name: 'TreeItem'
  })

  const props = defineProps<{
    menuItem: MenuTree,
    basePath: string,
    open: boolean
  }>()

  const router = useRouter()

  const { app } = useStore()
  
  const handleMenuItemClick = (item:MenuItemRegistered) => {
    if (isExternalLink(item.index)) {
      if (app.confirmLeave) {
        const routeData = router.resolve({
          path: "/confirm-leave",
          query: {
            target: item.index
          }
        })
        window.open(routeData.href)
      } else {
        window.open(item.index)
      }
    } else {
      router.push(item.index)
    }
  }

</script>

<style scoped lang="less">
  .icon {
    margin-right: 10px;
  }
</style>
