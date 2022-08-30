<template>
  <div class="tags-view">
    <el-scrollbar class="scroll-container" ref="scrollbarRef" @wheel.native.prevent="handleScroll">
      <template v-for="view in allViews" :key="view.path">
        <router-link
            ref="tagRefs"
            :class="isActive(view) ? 'tag-active' : 'tag'"
            :to="view.path"
            @contextmenu.prevent="openMenu(view)"
        >
          {{ view.meta.title }}
          <span class="close" @click.prevent.stop="closeSelectedTag(view)">
            <SvgIcon name="guanbi" size="10px" />
          </span>
        </router-link>
      </template>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@components/SvgIcon/index.vue'
import type { RouteLocationNormalizedLoaded, useLink } from 'vue-router'
import { useRoute, useRouter} from 'vue-router'
import useStore from '@/store'

const router = useRouter()
const route = useRoute()

const { tagsView } = useStore()

let scrollbarRef = ref()
let tagMenuRef = ref()
// @ts-ignore vue-router 将 RouterLink 的内部行为作为一个组合式API (useLink) 函数公开
let tagRefs = ref<InstanceType<typeof useLink>[]>([])

watch(route, () => {
  if (route.meta.title) {
    tagsView.addView(route)
    moveToCurrentTag()
  }
}, {
  immediate: true
})

const allViews = computed<RouteLocationNormalizedLoaded[]>(() => tagsView.allViews)

// 右键菜单
const openMenu = (view:RouteLocationNormalizedLoaded) => {
  console.log('右键', view)
}

// 关闭选中标签
const closeSelectedTag = (view:RouteLocationNormalizedLoaded) => {
  const deleteIndex = tagsView.closeView(view)

  // 关闭激活标签视图进行跳转
  if (isActive(view)) {
    toLatelyTag(deleteIndex)
  }
}

const toLatelyTag = (index) => {
  if (!index && index !== 0) return

  let prevTag = allViews.value[index - 1]
  if (prevTag) {
    router.push(prevTag.path)
    return
  }

  let nextTag = allViews.value[index === 0 ? index : index + 1]
  if (nextTag) {
    router.push(nextTag.path)
    return
  }

  router.push('/')
}

// 是否是激活标签
const isActive = (view:RouteLocationNormalizedLoaded) => {
  return route.path === view.path
}

// 移动到当前标签
function moveToCurrentTag() {
  nextTick(() => {
    let wrap = scrollbarRef.value.wrap$
    // 容器偏移量
    const scrollLeft = wrap.scrollLeft
    // 容器可视宽度
    const containerWidth = wrap.offsetWidth

    let prevTag;
    let nextTag;

    const indexOf = allViews.value.findIndex(item => item.path === route.path);

    prevTag = allViews.value[indexOf - 1]
    nextTag = allViews.value[indexOf + 1]

    let prevTagOffsetLeft = 0
    let currentTagOffsetLeft = 0
    let nextTagOffsetLeft = 0

    for (let tag of tagRefs.value) {
      if (prevTag && prevTag.path === tag.to) {
        // 上个标签 偏移量 - 宽度
        prevTagOffsetLeft = tag.$el.offsetLeft - tag.$el.offsetWidth
      }
      if (route.path === tag.to) {
        // 当前标签 偏移量 + 宽度
        currentTagOffsetLeft = tag.$el.offsetLeft + tag.$el.offsetWidth
      }
      if (nextTag && nextTag.path === tag.to) {
        // 下个标签 偏移量 + 宽度
        nextTagOffsetLeft = tag.$el.offsetLeft + tag.$el.offsetWidth
      }
    }

    if (nextTagOffsetLeft > scrollLeft + containerWidth) {
      wrap.scrollLeft = nextTagOffsetLeft - containerWidth;
    } else if (currentTagOffsetLeft > scrollLeft + containerWidth) {
      wrap.scrollLeft = currentTagOffsetLeft - containerWidth;
    } else if (prevTagOffsetLeft < scrollLeft) {
      wrap.scrollLeft = prevTagOffsetLeft;
    }

  })
}

// 重写滚动事件，滚轮横向滚动
const handleScroll = (e:WheelEvent) => {
  let wrap = scrollbarRef.value.wrap$
  wrap.scrollLeft = wrap.scrollLeft + e.deltaY
}
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