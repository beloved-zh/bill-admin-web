<template>
  <div class="navbar">
    <div class="left-content">
      <div class="sidebar-control">
        <svg-icon name="shousuo" size="20px" />
      </div>
      <el-breadcrumb separator="/">
        <template v-for="item in breadcrumbArray" :key="item.path">
          <el-breadcrumb-item :to="item.path">{{ item.meta.title }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <div class="item">
        <svg-icon name="sousuo" size="20px" />
      </div>
      <div class="item">
        <svg-icon name="baitianmoshi" size="20px" />
      </div>
      <div class="item">
        <svg-icon name="quanping" size="20px" />
      </div>
      <div class="item">
        <svg-icon name="bianji" size="22px" />
      </div>
      <div class="item">
        <el-avatar :size="30" src="https://joeschmoe.io/api/v1/random" />
      </div>
      <span class="item">admin</span>
    </div>
  </div>

</template>

<script setup lang="ts">
  import SvgIcon from '@components/SvgIcon/index.vue'
  import type { RouteLocationMatched } from 'vue-router'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  let breadcrumbArray = ref<RouteLocationMatched[]>([])

  watch(route, () => {
    breadcrumbArray.value = route.matched.filter(item => {
      return item.meta && item.meta.title
    })
  }, {
    immediate: true
  })
</script>

<style scoped lang="less">
</style>