<template>
  <icon v-bind="attrs" :url="url" />
</template>

<script setup lang="ts">

  defineOptions({
    name: 'MyIcon'
  })

  import { Icon } from 'tdesign-icons-vue-next'

  type Props = {
    url?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    url: '//at.alicdn.com/t/c/font_3505787_3hmy0ej2at.js'
  })

  const attrs = useAttrs()

</script>

<style scoped lang="less">

</style>