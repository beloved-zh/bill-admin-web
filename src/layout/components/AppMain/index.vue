<template>
  <router-view>
    <template #default="{ Component, route }">
      <keep-alive :include="includeRouteName">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </template>
  </router-view>
</template>

<script setup lang="ts">
  import useStore from '@store/index'

  const { tagsView } = useStore()

  const includeRouteName = computed<string[]>(() => tagsView.cachedNames)
</script>

<style scoped lang="less">
</style>
