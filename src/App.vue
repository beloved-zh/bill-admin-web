<script setup lang="ts">
import enConfig from 'tdesign-vue-next/es/locale/zh_CN'
import merge from 'lodash/merge'

defineOptions({
  name: 'App'
})

// 全局特性配置
const globalConfig = merge(enConfig, {
  // 可以在此处定义更多自定义配置，具体可配置内容参看 API 文档
  // https://tdesign.tencent.com/vue-next/config?tab=api
  calendar: {},
  table: {},
  pagination: {},
  icon: {}
})
</script>

<template>
  <t-config-provider :locale="globalConfig">
    <router-view />
  </t-config-provider>
</template>

<style>

</style>
