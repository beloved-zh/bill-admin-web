<script setup lang="ts">
import { useRouter } from 'vue-router'
import TreeItem from './index.vue'
import { isExternalLink, resolvePath } from '@/utils/index'
import type { MenuTree } from '@/api/auth/types'
import useStore from '@/store/index'

defineOptions({
  name: 'TreeItem'
})

defineProps<{
  menu: MenuTree
  path: string
  open: boolean
}>()

const router = useRouter()

const { useApp } = useStore()

const handleMenuItemClick = (path: string) => {
  if (isExternalLink(path)) {
    if (useApp.confirmLeave) {
      const routeData = router.resolve({
        path: '/confirm-leave',
        query: {
          target: path
        }
      })
      window.open(routeData.href)
    } else {
      window.open(path)
    }
  } else {
    router.push(path)
  }
}
</script>

<template>
  <t-menu-item
    v-if="!menu.children || menu.children.length === 0"
    :value="path"
    @click="handleMenuItemClick(path)"
  >
    <template #icon>
      <my-icon v-if="menu.meta.icon" :name="menu.meta.icon" />
    </template>
    {{ menu.meta.title }}
  </t-menu-item>
  <t-submenu v-else :value="path">
    <template #icon>
      <my-icon v-if="menu.meta.icon" :name="menu.meta.icon" />
    </template>
    <template #title>
      {{ menu.meta.title }}
    </template>
    <template v-for="item in menu.children" :key="resolvePath(path, item.path)">
      <tree-item
        v-if="!item.meta.hidden"
        :menu="item"
        :path="resolvePath(path, item.path)"
        :open="open"
      />
    </template>
  </t-submenu>
</template>

<style scoped lang="less">
.icon {
  margin-right: 10px;
}
</style>
