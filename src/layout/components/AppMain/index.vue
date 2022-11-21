<template>
  <t-content class="app-main" ref="appMainRef">
    <router-view>
      <template #default="{ Component, route }">
        <keep-alive :include="includeComName">
          <component :is="Component" :key="getRouteKey(route)" />
        </keep-alive>
      </template>
    </router-view>
  </t-content>
</template>

<script setup lang="ts">

  import type { RouteLocationNormalizedLoaded } from 'vue-router'
  import useStore from '@store/index'
  import { useFullscreen } from "@vueuse/core";

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

<style scoped lang="less">
  //.app-main {
  //  width: 100%;
  //  height: 100%;
  //  padding: 0;
  //  background-color: #ffffff;
  //
  //  :deep(.scrollbar-view) {
  //    height: 100%;
  //    padding: 16px;
  //  }
  //}

</style>
