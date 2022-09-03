<template>
  <div class="tags-view" ref="tagsViewRef">
    <el-scrollbar class="scroll-container" ref="scrollbarRef" @wheel.native.prevent="handleScroll">
      <template v-for="view in tagViews" :key="view.path">
        <router-link
            ref="tagRefs"
            :class="isActive(view) ? 'tag-active' : 'tag'"
            :to="view.path"
            @contextmenu.prevent="openMenu(view, $event)"
        >
          {{ view.meta.title }}
          <span class="close" v-if="tagViews.length > 1 && !view.meta.fixed" @click.prevent.stop="closeSelectedTag(view)">
            <SvgIcon name="guanbi" size="10px" />
          </span>
          <span class="close" v-else>
            <SvgIcon name="tudingguding" size="10px" />
          </span>
        </router-link>
      </template>
    </el-scrollbar>
    <RightKeyMenu
        :offset="-10"
        v-model="showMenu"
        :clikeEvent="openMenuEvent"
        :parent-el="tagsViewRef">
      <ul class="menu-main">
        <li @click="refreshSelectedTag">刷新</li>
        <li v-if="!isFixed" @click="closeSelectedTag(rightClickSelectedTag)">关闭</li>
        <li v-if="!isFirstView" @click="closeLeftTags">关闭左侧</li>
        <li v-if="!isLastView" @click="closeRightTags">关闭右侧</li>
        <li v-if="tagViews.length > 1" @click="closeOtherTags">关闭其它</li>
        <li v-if="tagViews.length > 1" @click="closeAllTags">关闭所有</li>
      </ul>
    </RightKeyMenu>
  </div>

</template>

<script setup lang="ts">
import SvgIcon from '@components/SvgIcon/index.vue'
import RightKeyMenu from '@components/RightKeyMenu/index.vue'
import type { RouteRecordRaw, useLink } from 'vue-router'
import type { TagView } from '@store/types/tagsView'
import type { ElScrollbar } from 'element-plus'
import { useRoute, useRouter} from 'vue-router'
import useStore from '@store/index'
import path from 'path-browserify'

const router = useRouter()
const route = useRoute()

const { menu, tagsView } = useStore()

let tagsViewRef = ref<HTMLDivElement>()
let scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
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

const tagViews = computed<TagView[]>(() => tagsView.tagViews)
const routes = computed<RouteRecordRaw[]>(() => menu.routes)

let rightClickSelectedTag = ref<TagView>()

const isFixed = computed<boolean>(() => {
  if (!rightClickSelectedTag.value) {
    return false
  }
  if (rightClickSelectedTag.value.meta && rightClickSelectedTag.value.meta.fixed) {
    return true
  }
  return false
})

const isFirstView = computed<boolean>(() => {
  if (!rightClickSelectedTag.value || tagViews.value.length === 0) {
    return false
  }
  if (rightClickSelectedTag.value.path === tagViews.value[0].path) {
    return true
  }
  return false
})

const isLastView = computed<boolean>(() => {
  if (!rightClickSelectedTag.value || tagViews.value.length === 0) {
    return false
  }
  if (rightClickSelectedTag.value.path === tagViews.value[tagViews.value.length - 1].path) {
    return true
  }
  return false
})

// 刷新 todo 需要更新 cachedViews 数据
const refreshSelectedTag = () => {
  if (!rightClickSelectedTag.value) {
    return
  }

  router.replace(rightClickSelectedTag.value.path as string)
}

// 关闭左边标签
const closeLeftTags = () => {
  if (!rightClickSelectedTag.value) {
    return
  }
  tagsView.closeLeftViews(rightClickSelectedTag.value)

  router.push(rightClickSelectedTag.value.path as string)
}

// 关闭右边标签
const closeRightTags = () => {
  if (!rightClickSelectedTag.value) {
    return
  }
  tagsView.closeRightViews(rightClickSelectedTag.value)

  router.push(rightClickSelectedTag.value.path as string)
}

// 关闭其它标签
const closeOtherTags = () => {
  if (!rightClickSelectedTag.value) {
    return
  }
  tagsView.closeOtherViews(rightClickSelectedTag.value)

  router.push(rightClickSelectedTag.value.path as string)
}

// 关闭所有标签
const closeAllTags = () => {
  if (!rightClickSelectedTag.value) {
    return
  }

  tagsView.closeAllViews()

  if (tagViews.value.length > 0) {
    router.push(tagViews.value[tagViews.value.length - 1].path as string)
  } else {
    router.push("/")
  }
}

let showMenu = ref(false)
let openMenuEvent = ref<MouseEvent>()

// 打开右键菜单
const openMenu = (view:TagView, e: MouseEvent) => {
  openMenuEvent.value = e
  showMenu.value = true

  rightClickSelectedTag.value = view
}

// 关闭选中标签
const closeSelectedTag = (view:TagView) => {
  const deleteIndex = tagsView.closeView(view)

  // 关闭激活标签视图进行跳转
  if (isActive(view)) {
    toLatelyTag(deleteIndex)
  }
}

// 跳转最近标签
const toLatelyTag = (index) => {
  if (!index && index !== 0) return

  let prevTag = tagViews.value[index - 1]
  if (prevTag) {
    router.push(prevTag.path as string)
    return
  }

  let nextTag = tagViews.value[index === 0 ? index : index + 1]
  if (nextTag) {
    router.push(nextTag.path as string)
    return
  }

  router.push('/')
}

// 是否是激活标签
const isActive = (view:TagView) => {
  return route.path === view.path
}

// 移动到当前标签
function moveToCurrentTag() {
  nextTick(() => {
    if (!scrollbarRef.value || !scrollbarRef.value.wrap$) {
      return
    }
    let wrap = scrollbarRef.value.wrap$
    // 容器偏移量
    const scrollLeft = wrap.scrollLeft
    // 容器可视宽度
    const containerWidth = wrap.offsetWidth

    let prevTag;
    let nextTag;

    const indexOf = tagViews.value.findIndex(item => item.path === route.path);

    prevTag = tagViews.value[indexOf - 1]
    nextTag = tagViews.value[indexOf + 1]

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
  if (!scrollbarRef.value || !scrollbarRef.value.wrap$) {
    return
  }
  let wrap = scrollbarRef.value.wrap$
  wrap.scrollLeft = wrap.scrollLeft + e.deltaY
}

// 获取固定标签
const getFixedTags = (routes: RouteRecordRaw[], basePath = '/') => {
  let tags: TagView[] = []
  routes.forEach(item => {
    if (item.children) {
      tags = tags.concat(getFixedTags(item.children, item.path))
    }

    if (item.meta && item.meta.fixed) {
      item.path = path.resolve(basePath, item.path)
      tags.push(item)
    }
  })
  return tags
}

const initTags = () => {
  const fixedTags = getFixedTags(routes.value)

  // 对固定标签进行倒叙添加
  // 正序会将后面的标签添加在前面
  fixedTags.reverse().forEach(item => {
    tagsView.addView(item)
  })
}

onMounted(() => {
  initTags()
})
</script>

<style scoped lang="less">
:deep(.el-scrollbar__bar) {
  width: 0!important;
  height: 0!important;
}

:deep(.el-scrollbar__view) {
  height: 100%;
}

.menu-main {
  list-style: none;
  margin: 0 8px;
  padding: 0;

  width: 100px;
  font-size: 12px;
  line-height: 28px;
  text-align: left;
  color: #444040;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  white-space: nowrap;
  z-index: 1000;
}
.menu-main:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.menu-main li {
  list-style: none;
  margin: 0;
  padding: 0 8px;
}
.menu-main li:hover {
  cursor: pointer;
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
</style>