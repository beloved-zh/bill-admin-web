<template>
  <iframe :src="path" :name="name" height="100%" width="100%" frameborder="0"></iframe>
</template>
<script setup lang="ts">
  import { useRoute } from 'vue-router'
  const route = useRoute()

  const name = computed<string>(() => route.meta.title as string)
  const path = computed<string>(() => route.meta.iframe as string)

</script>
<style lang="less" scoped>

</style>
