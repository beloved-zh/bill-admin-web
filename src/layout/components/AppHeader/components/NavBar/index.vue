<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useDark, useFullscreen, useToggle } from '@vueuse/core'
import type { Breadcrumb } from '@/router/types'

import useStore from '@/store/index'

defineOptions({
  name: 'NavBar'
})

const route = useRoute()

const isDark = useDark()

const toggleDark = () => {
  useToggle(isDark)
}

const { isFullscreen, toggle } = useFullscreen()

const { useApp, useUser } = useStore()

const toggleSidebar = () => {
  useApp.toggleSidebar()
}

const sidebar = computed(() => useApp.sidebar)

const breadcrumbs = computed<Breadcrumb[]>(
  () => route.meta.breadcrumbs as Breadcrumb[]
)
</script>

<template>
  <div class="navbar">
    <div class="left-content">
      <my-icon
        class="cursor-pointer item"
        :name="sidebar.open ? 'icon-shrink' : 'icon-unfold'"
        size="large"
        @click="toggleSidebar"
      />
      <t-breadcrumb>
        <template v-for="item in breadcrumbs" :key="item.path">
          <t-breadcrumb-item :disabled="true">
            {{ item.title }}
          </t-breadcrumb-item>
        </template>
      </t-breadcrumb>
    </div>
    <div class="right-content">
      <my-icon class="item cursor-pointer" name="icon-search" size="large" />
      <my-icon
        class="item cursor-pointer"
        :name="isDark ? 'icon-night' : 'icon-white'"
        size="large"
        @click="toggleDark"
      />
      <my-icon
        class="item cursor-pointer"
        :name="isFullscreen ? 'icon-cancel-full-screen' : 'icon-full-screen'"
        size="large"
        @click="toggle"
      />
      <my-icon class="item cursor-pointer" name="icon-setup" size="large" />
      <template v-if="useUser.userInfo.avatar">
        <t-avatar
          class="item cursor-pointer"
          size="medium"
          :image="useUser.userInfo.avatar"
        />
      </template>
      <template v-else>
        <t-avatar class="item cursor-pointer" size="medium">
          {{ useUser.userInfo.userName }}
        </t-avatar>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.navbar {
  height: @nav-bar-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  background: #fff;
  //box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  border-bottom: 1px solid var(--td-component-stroke);
  padding: 4px 14px;

  .left-content {
    display: flex;
    align-items: center;
    .item {
      margin-right: 14px;
    }
  }
  .right-content {
    .item {
      margin-left: 14px;
    }
  }
}
</style>
