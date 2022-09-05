<template>
  <h1>level/level-2/level-2-2/level-2-2-1</h1>
  <input type="text" v-model="val">
</template>

<script setup lang="ts" name="LEVEL-2-2-1">
  let val = ref('')

  onMounted(() => {
    console.log('加载完成')
  })
</script>

<style scoped lang="less">

</style>
