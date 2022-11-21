<template>
  <el-pagination
      background
      layout="->, total, sizes, prev, pager, next, jumper"
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :total="totalCount" />
</template>

<script setup lang="ts">

  defineOptions({
    name: 'Pagination'
  })

  type Props = {
    pageNum: number,
    pageSize?: number,
    totalCount: number
  }

  const props = withDefaults(defineProps<Props>(), {
    pageSize: 20
  })

</script>

<style scoped lang="less">
  @import url('@assets/styles/base.less');

</style>
