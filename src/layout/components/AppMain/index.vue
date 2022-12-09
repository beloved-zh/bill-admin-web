<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useFullscreen } from '@vueuse/core'
import useStore from '@/store/index'

defineOptions({
  name: 'AppMain'
})

const { useTagsView } = useStore()

const appMainRef = ref<HTMLElement>()

const { toggle } = useFullscreen(appMainRef)

const includeComName = computed<string[]>(() => useTagsView.cachedNames)

const getRouteKey = (route: RouteLocationNormalizedLoaded) => {
  return useTagsView.getTagViewKey(route.path)
}

// 内容全屏
EventBus.on('FullScreenAppLayoutMain', () => {
  toggle()
})
</script>

<template>
  <t-content ref="appMainRef" class="app-main">
    <router-view>
      <template #default="{ Component, route }">
        <keep-alive :include="includeComName">
          <component :is="Component" :key="getRouteKey(route)" />
        </keep-alive>
      </template>
    </router-view>
  </t-content>
</template>

<style scoped lang="less">
  .app-main {
    padding: 8px;
    max-height: calc(~"100vh - @{nav-bar-height} - @{tags-view-height}");
    overflow-y: auto;
  }
</style>
