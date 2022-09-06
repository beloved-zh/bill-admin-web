<template>
  <el-main>
    <router-view>
      <template #default="{ Component, route }">
        <keep-alive :include="includeRouteName">
          <component :is="Component" :key="getKey(route)" />
        </keep-alive>
      </template>
    </router-view>
  </el-main>
</template>

<script setup lang="ts">
  import type { RouteLocationNormalizedLoaded } from 'vue-router'
  import useStore from '@store/index'

  const { tagsView } = useStore()

  const getKey = (route:RouteLocationNormalizedLoaded):string => {
    return route.path + '-' + (tagsView.getViewKey(route.path) ? tagsView.getViewKey(route.path) : Date.now())
  }
  
  const includeRouteName = computed<string[]>(() => tagsView.cachedNames)

</script>

<style scoped lang="less">
</style>
