<script setup lang="ts">
defineOptions({
  name: 'PageList'
})
</script>

<template>
  <div class="page-main">
    <data-form>
      <template #default>
        <slot name="from-default" />
      </template>
      <template #hide-panel>
        <slot name="from-hide-panel" />
      </template>
      <template #more-operate>
        <slot name="from-more-operate" />
      </template>
    </data-form>
  </div>
</template>

<style scoped lang="less">

</style>
