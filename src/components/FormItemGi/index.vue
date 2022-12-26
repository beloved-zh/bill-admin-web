<script setup lang="ts">
defineOptions({
  name: 'FormItemGi',
  inheritAttrs: false
})

interface BaseColProps {
  offset: number
  order: number
  pull: number
  push: number
  span: number
}

interface Props {
  flex?: string | number
  lg?: number | BaseColProps
  md?: number | BaseColProps
  offset?: number
  order?: number
  pull?: number
  push?: number
  sm?: number | BaseColProps
  span?: number
  tag?: string
  xl?: number | BaseColProps
  xs?: number | BaseColProps
  xxl?: number | BaseColProps
}

const props = withDefaults(defineProps<Props>(), {
})

const attrs = useAttrs()
</script>

<template>
  <t-col v-bind="props">
    <t-form-item v-bind="attrs">
      <slot />
    </t-form-item>
  </t-col>
</template>

<style scoped lang="less">

</style>

