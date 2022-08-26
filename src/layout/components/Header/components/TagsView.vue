<template>
  <div class="tags-view">
    <el-scrollbar class="scroll-container">
      <template v-for="item in 50" :key="item">
        <el-link :underline="false" :class="item == 5 ? 'tag-active' : 'tag'" closable>
          标签{{ item }}
          <div class="close">
            <SvgIcon name="guanbi" size="10px" />
          </div>
        </el-link>
      </template>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import SvgIcon from '@components/SvgIcon/index.vue'
</script>

<style scoped lang="less">
  :deep(.el-scrollbar__bar) {
    width: 0!important;
    height: 0!important;
  }

  :deep(.el-scrollbar__view) {
    height: 100%;
  }
</style>