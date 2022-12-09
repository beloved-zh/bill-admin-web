import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import type { TagView, TagsViewState } from '../types/tagsView'

const useTagsViewStore = defineStore({
  id: 'tagsView',
  state: (): TagsViewState => ({
    activeTagView: {
      key: Date.now(),
      name: '/',
      path: '/',
      meta: {}
    },
    fixedTagViews: [],
    canCloseTagViews: []
  }),
  getters: {
    tagViews: (state): TagView[] => {
      return state.fixedTagViews.concat(state.canCloseTagViews)
    },
    allFixed(): boolean {
      return this.tagViews.every(item => item.meta?.fixed)
    },
    cachedNames(): string[] {
      return this.tagViews.filter(item => item.meta!.keepAlive).map(item => item.name as string)
    }
  },
  actions: {
    // 判断标签是否存在
    isExist(view: TagView): boolean {
      return this.tagViews.some(item => item.path === view.path)
    },
    // 获取标签下标
    getViewIndex(view: TagView): number {
      return this.tagViews.findIndex(item => item.path === view.path)
    },
    // 除自己外都是固定
    otherFixed(view: TagView): boolean {
      return this.tagViews.every(item => view.path === item.path || item.meta?.fixed)
    },
    // 添加标签
    addView(view: TagView) {
      if (this.isExist(view)) {
        return
      }

      view.key = Date.now()

      if (view.meta && view.meta.fixed) {
        this.fixedTagViews.push(JSON.parse(JSON.stringify(view)))
      } else {
        this.canCloseTagViews.push(JSON.parse(JSON.stringify(view)))
      }
    },
    // 关闭标签
    closeTagView(view: TagView): TagView {
      const index = this.getViewIndex(view)
      const activeIndex = this.getViewIndex(this.activeTagView)

      if (view.meta && view.meta.fixed) {
        this.fixedTagViews = this.fixedTagViews.filter(item => item.path !== view.path)
      } else {
        this.canCloseTagViews = this.canCloseTagViews.filter(item => item.path !== view.path)
      }

      return index !== activeIndex ? this.activeTagView : this.tagViews[index - 1] || this.tagViews[index] || { path: '/' }
    },
    // 关闭左侧
    closeLeftTagViews(view: TagView): TagView {
      const index = this.getViewIndex(view)
      const activeIndex = this.getViewIndex(this.activeTagView)

      let targetTag = this.activeTagView

      if (index > activeIndex) {
        targetTag = view
      }

      const leftTagViews = this.tagViews.slice(0, index)

      leftTagViews.forEach(leftTag => {
        if (leftTag.meta?.fixed) {
          return
        }
        this.canCloseTagViews = this.canCloseTagViews.filter(item => item.path !== leftTag.path)
      })

      return targetTag
    },
    // 关闭右侧
    closeRightTagViews(view: TagView): TagView {
      const index = this.getViewIndex(view)
      const activeIndex = this.getViewIndex(this.activeTagView)

      let targetTag = this.activeTagView

      if (index < activeIndex) {
        targetTag = view
      }

      const rightTagViews = this.tagViews.slice(index + 1)

      rightTagViews.forEach(rightTag => {
        this.canCloseTagViews = this.canCloseTagViews.filter(item => item.path !== rightTag.path)
      })

      return targetTag
    },
    // 关闭其它
    closeOtherTagViews(view: TagView) {
      this.canCloseTagViews = this.canCloseTagViews.filter(item => item.path === view.path)
    },
    // 关闭所有
    closeAllTagViews(): TagView {
      this.canCloseTagViews = []
      return this.fixedTagViews[this.fixedTagViews.length - 1] || { path: '/' }
    },
    // 获取标签key
    getTagViewKey(path: string): number | undefined {
      return this.tagViews[this.tagViews.findIndex(item => item.path === path)]?.key
    },
    // 刷新标签
    refreshTagView(view: TagView) {
      const index = this.getViewIndex(view)

      // 通过 改变 component key 值进行强制刷新
      this.tagViews[index].key = Date.now()
    },
    // 类型转换
    routeToTagView(route: RouteRecordRaw | RouteLocationNormalizedLoaded): TagView {
      return {
        key: Date.now(),
        name: route.name as string,
        path: route.path,
        meta: route.meta!
      }
    }
  }
})

export default useTagsViewStore
