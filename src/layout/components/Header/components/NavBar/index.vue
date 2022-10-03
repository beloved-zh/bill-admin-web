<template>
  <div class="navbar">
    <div class="left-content">
      <svg-icon class="sidebar-control cursor-pointer" :name="sidebar.open ? 'shrink' : 'unfold'" size="small" @click="toggleSidebar" />
      <el-breadcrumb separator="/">
        <template v-for="item in breadcrumbs">
          <el-breadcrumb-item>{{ item }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <svg-icon class="item cursor-pointer" name="search" size="small" />
      <svg-icon class="item cursor-pointer" @click="toggleDark" :name="isDark ? 'night' : 'white'" size="small" />
      <svg-icon class="item cursor-pointer" @click="toggle" :name="isFullscreen ? 'cancel-full-screen': 'full-screen'" size="small" />
      <svg-icon class="item cursor-pointer" name="setup" size="small" />
      <el-avatar class="item cursor-pointer" :size="30" :src="avatar" />
    </div>
  </div>

</template>

<script setup lang="ts">
  import SvgIcon from '@components/SvgIcon/index.vue'
  import { useRoute } from 'vue-router'
  import { useDark, useToggle , useFullscreen } from '@vueuse/core'
  import useStore from '@store/index'

  defineOptions({
    name: 'NavBar'
  })

  const route = useRoute()

  const isDark = useDark()

  const toggleDark = () => {
    useToggle(isDark)
  }

  const { isFullscreen, toggle } = useFullscreen()

  const { app, user } = useStore()

  const toggleSidebar = () => {
    app.toggleSidebar()
  }
  
  const sidebar = computed(() => app.sidebar)

  const avatar = computed<string>(() => user.avatar)

  let breadcrumbs = ref<string[]>([])

  watch(route, () => {
    breadcrumbs.value = route.meta.breadcrumbs as string[]
  }, {
    immediate: true
  })
</script>

<style scoped lang="less">
  @import url('@assets/styles/base.less');
  .navbar {
    &:extend(.flex-row-center);
    justify-content: space-between;
    width: inherit;
    height: 50px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    .left-content {
      &:extend(.flex-row-center);
      .sidebar-control {
        margin: 0 14px;
      }
    }
    .right-content {
      &:extend(.flex-row-center);
      .item {
        margin-right: 14px;
      }
      span {
        color: #606266;
      }
    }
  }
</style>