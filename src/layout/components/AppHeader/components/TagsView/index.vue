<script setup lang="ts">
import type { RouteRecordRaw, useLink } from 'vue-router'
import { h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MouseMenuDirective as vMouseMenu } from '@howdyjs/mouse-menu'
import type { TagView } from '@/store/types/tagsView'
import MyIcon from '@/components/MyIcon/index.vue'
import useStore from '@/store/index'
import { resolvePath } from '@/utils/index'

defineOptions({
  name: 'TagsView'
})

const route = useRoute()
const router = useRouter()

const { useMenu, useTagsView } = useStore()

const tagViewsRef = ref<HTMLDivElement>()
// @ts-expect-error vue-router 将 RouterLink 的内部行为作为一个组合式API (useLink) 函数公开
const tagRefs = ref<InstanceType<typeof useLink>[]>([])

// 打开的标签
const tagViews = computed<TagView[]>(() => useTagsView.tagViews)
// 所有路由
const routes = computed<RouteRecordRaw[]>(() => useMenu.routes)

// 监听当前路由添加到标签列表，同时移动到选中标签
watch(
  route,
  () => {
    useTagsView.activeTagView = useTagsView.routeToTagView(route)
    // 固定标签不在监听添加，初始化时已经添加过
    if (!route.meta.fixed) {
      useTagsView.addView(useTagsView.routeToTagView(route))
    }
    moveToActiveTag()
  },
  {
    immediate: true
  }
)

// 移动到初始化标签
function moveToActiveTag() {
  nextTick(() => {
    const activeRefIndex = tagRefs.value.findIndex(
      tagRef => tagRef.to === route.path
    )

    // 容器偏移量
    const scrollLeft = tagViewsRef.value!.scrollLeft
    // 容器可视宽度
    const containerWidth = tagViewsRef.value!.offsetWidth

    // 标签相对父容器的偏移量
    const tagOffsetLeft = tagRefs.value[activeRefIndex].$el.offsetLeft
    // 标签宽度
    const tagOffsetWidth = tagRefs.value[activeRefIndex].$el.offsetWidth

    if (tagOffsetLeft + tagOffsetWidth > scrollLeft + containerWidth) {
      tagViewsRef.value!.scrollLeft
        = tagOffsetLeft + tagOffsetWidth - containerWidth + 4
    }

    if (tagOffsetLeft < scrollLeft) {
      tagViewsRef.value!.scrollLeft = tagOffsetLeft - 4
    }
  })
}

// 全屏内容
const fullScreenContent = (view: TagView) => {
  router.push(view.path as string)

  EventBus.emit('FullScreenAppLayoutMain')
}

// 刷新标签
const refreshTag = (view: TagView) => {
  useTagsView.refreshTagView(view)
}

// 关闭所有
const closeAllTags = () => {
  const targetTag = useTagsView.closeAllTagViews()

  router.push(targetTag.path as string)
}

// 关闭其它
const closeOtherTags = (view: TagView) => {
  useTagsView.closeOtherTagViews(view)

  router.push(view.path as string)
}

// 关闭左侧标签
const closeLeftTags = (view: TagView) => {
  const targetTag = useTagsView.closeLeftTagViews(view)

  router.push(targetTag.path as string)
}

// 关闭右侧标签
const closeRightTags = (view: TagView) => {
  const targetTag = useTagsView.closeRightTagViews(view)

  router.push(targetTag.path as string)
}

// 关闭选中标签
const closeTag = (view: TagView) => {
  const targetTag = useTagsView.closeTagView(view)

  router.push(targetTag.path as string)
}

// 初始化右键菜单配置
const initTagMenu = (view: TagView) => {
  return {
    params: view,
    menuWidth: 110,
    menuWrapperCss: {
      background: '#fff'
    },
    menuItemCss: {
      iconColor: '#444040',
      hoverBackground: '#66b1ff',
      hoverLabelColor: '#fff'
    },
    hasIcon: true,
    iconType: 'vnode-icon',
    menuList: [
      {
        label: '刷新',
        icon: h(MyIcon, { name: 'icon-search', size: 'small' }),
        fn: (view: TagView) => refreshTag(view)
      },
      {
        label: '全屏',
        icon: h(MyIcon, { name: 'icon-full-screen', size: 'small' }),
        fn: (view: TagView) => fullScreenContent(view)
      },
      {
        line: true
      },
      {
        label: '关闭',
        // 固定标签或只剩一个标签禁用
        disabled: (view: TagView) =>
          (view.meta && view.meta.fixed) || tagViews.value.length <= 1,
        fn: (view: TagView) => closeTag(view)
      },
      {
        label: '关闭左侧',
        // 第一个标签或只剩一个标签或选择标签的前一个标签是固定标签禁用
        disabled: (view: TagView) =>
          view.path === tagViews.value[0].path
          || tagViews.value.length === 1
          || tagViews.value[useTagsView.getViewIndex(view) - 1].meta?.fixed,
        fn: (view: TagView) => closeLeftTags(view)
      },
      {
        label: '关闭右侧',
        // 最后一个标签或只剩一个标签或选择标签的后一个标签是固定标签禁用
        disabled: (view: TagView) =>
          view.path === tagViews.value[tagViews.value.length - 1].path
          || tagViews.value.length === 1
          || tagViews.value[useTagsView.getViewIndex(view) + 1].meta?.fixed,
        fn: (view: TagView) => closeRightTags(view)
      },
      {
        label: '关闭其它',
        // 剩余一个标签或剩余标签全部是固定禁用
        disabled: (view: TagView) =>
          tagViews.value.length <= 1
          || useTagsView.otherFixed(view)
          || useTagsView.allFixed,
        fn: (view: TagView) => closeOtherTags(view)
      },
      {
        label: '关闭所有',
        // 剩余一个标签或剩余标签全部是固定禁用
        disabled: () => tagViews.value.length <= 1 || useTagsView.allFixed,
        fn: () => closeAllTags()
      }
    ]
  }
}

// 获取固定标签
const getFixedTags = (routes: RouteRecordRaw[], basePath = '/') => {
  let tags: TagView[] = []
  routes.forEach(item => {
    if (item.children) {
      tags = tags.concat(getFixedTags(item.children, item.path))
    }

    if (item.meta && item.meta.fixed) {
      item.path = resolvePath(basePath, item.path)
      tags.push(useTagsView.routeToTagView(item))
    }
  })
  return tags
}

const initTags = () => {
  const fixedTags = getFixedTags(routes.value)

  fixedTags.forEach(item => {
    useTagsView.addView(item)
  })
}

onMounted(async () => {
  initTags()
})
</script>

<template>
  <div ref="tagViewsRef" class="tags-view">
    <template v-for="view in tagViews" :key="view.path">
      <router-link
        ref="tagRefs"
        v-mouse-menu="initTagMenu(view)"
        :class="route.path === view.path ? 'tag-active' : 'tag'"
        :to="view.path"
      >
        {{ view.meta.title }}
        <span
          v-if="!view.meta.fixed && tagViews.length > 1"
          @click.prevent.stop="closeTag(view)"
        >
          <my-icon class="icon" name="icon-close" size="12" />
        </span>
        <span v-else>
          <my-icon class="icon" name="icon-fixed" size="12" />
        </span>
      </router-link>
    </template>
  </div>
</template>

<style scoped lang="less">
.tags-view {
  height: @tags-view-height;
  position: relative;
  white-space: nowrap;
  background: transparent;
  padding: 4px 0;
  overflow-y: hidden;
  overflow-x: scroll;

  /* 隐藏滚动条 */
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  .tag {
    display: inline-block;
    box-sizing: border-box;
    list-style: none;
    align-items: center;
    text-decoration: none;
    white-space: nowrap;
    font-size: 12px;
    padding: 0 4px;
    margin: 0 0 0 4px;

    border: 1px solid #d8dce5;
    border-radius: 3px;
    background: transparent;
    color: #000000;

    &:hover {
      color: #409eff;
    }

    &:last-child {
      margin-right: 4px;
    }

    .icon {
      margin-left: 4px;
    }
  }

  .tag-active:extend(.tags-view .tag all) {
    border: 1px solid transparent;
    background-color: @activate-background-color;
    color: #ffffff;

    &:hover {
      color: #ffffff;
    }
  }
}
</style>
