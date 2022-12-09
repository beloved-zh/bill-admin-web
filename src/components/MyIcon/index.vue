<script setup lang="ts">
import { Icon } from 'tdesign-icons-vue-next'

defineOptions({
  name: 'MyIcon'
})

interface Props {
  url?: string
}

withDefaults(defineProps<Props>(), {
  url: '//at.alicdn.com/t/c/font_3505787_3hmy0ej2at.js'
})

const attrs = useAttrs()
</script>

<template>
  <icon v-bind="attrs" :url="url" />
</template>

<style scoped lang="less">

</style>
