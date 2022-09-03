<template>
  <div class="navbar">
    <div class="left-content">
      <div class="sidebar-control">
        <svg-icon :name="sidebar.open ? 'shousuo' : 'zhankai'" size="20px" @click="toggleSidebar" />
      </div>
      <el-breadcrumb separator="/">
        <template v-for="item in breadcrumbArray">
          <el-breadcrumb-item>{{ item }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <div class="item">
        <svg-icon name="sousuo" size="20px" />
      </div>
      <div class="item">
        <svg-icon @click="toggleDark" :name="isDark ? 'yueliang' : 'baitianmoshi'" size="20px" />
      </div>
      <div class="item">
        <svg-icon @click="toggle" :name="isFullscreen ? 'huanyuanhuabu': 'quanping'" size="20px" />
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
  import { useDark, useToggle , useFullscreen } from '@vueuse/core'
  import useStore from '@store/index'

  const route = useRoute()

  const isDark = useDark()

  const toggleDark = () => {
    useToggle(isDark)
  }

  const { isFullscreen, toggle } = useFullscreen()

  const { app } = useStore()

  const toggleSidebar = () => {
    app.toggleSidebar()
  }
  
  const sidebar = computed(() => app.sidebar)

  let breadcrumbArray = ref<string[]>([])

  watch(route, () => {
    // breadcrumbArray.value = route.matched.filter(item => {
    //   return item.meta && item.meta.title
    // })
    breadcrumbArray.value = route.meta.breadcrumbs as string[]
  }, {
    immediate: true
  })
</script>

<style scoped lang="less">
</style>