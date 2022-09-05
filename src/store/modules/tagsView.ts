import { defineStore } from 'pinia'
import type { TagsViewState, TagView } from '../types/tagsView'

const useTagsViewStore = defineStore({
    id: 'tagsView',
    state: (): TagsViewState => ({
        tagViews: [],
        cachedViews: []
    }),
    getters: {
        cachedNames: (state):string[] => {
            return state.cachedViews.map(item => {
                return item.name as string
            })
        }
    },
    actions: {
        getViewKey(path: string) {
            const currIndex = this.tagViews.findIndex(item => item.path === path)
            if (currIndex === -1) {
                return
            }

            return this.tagViews[currIndex].key
        },
        // 利用router-view component key 值变化会导致内容刷新来实现页面强制刷新
        refreshView(view: TagView) {
            const currIndex = this.tagViews.findIndex(item => item.path === view.path)
            if (currIndex === -1) {
                return
            }

            this.tagViews[currIndex].key = Date.now()
        },
        addView(view: TagView) {
            view.key = Date.now()

            // 已经存在不添加
            if(this.tagViews.some(item => item.path === view.path)) return
            if (view.meta && view.meta.fixed) {
                this.tagViews.unshift(JSON.parse(JSON.stringify(view)))
            } else {
                this.tagViews.push(JSON.parse(JSON.stringify(view)))
            }

            if(this.cachedViews.some(item => item.path === view.path)) return
            if (view.meta && view.meta.keepAlive) {
                this.cachedViews.push(JSON.parse(JSON.stringify(view)))
            }
        },
        closeView(view: TagView) {
            let deleteIndex
            let deleteItem

            this.tagViews = this.tagViews.filter((item, index) => {
                if (item.path === view.path) {
                    deleteIndex = index
                    deleteItem = item
                    return false
                }
                return true
            })

            if (deleteItem) {
                this.cachedViews = this.cachedViews.filter(item => item.path !== deleteItem.path)
            }

            return deleteIndex
        },
        closeLeftViews(view: TagView) {
            const currIndex = this.tagViews.findIndex(item => item.path === view.path)
            if (currIndex === -1) {
                return
            }

            this.tagViews = this.tagViews.filter((item, index) => {
                if (index >= currIndex || item.meta?.fixed) {
                    return true
                }
                this.cachedViews = this.cachedViews.filter(cachedItem => {
                    return item.path !== cachedItem.path
                })

                return false
            })
        },
        closeRightViews(view: TagView) {
            const currIndex = this.tagViews.findIndex(item => item.path === view.path)
            if (currIndex === -1) {
                return
            }

            this.tagViews = this.tagViews.filter((item, index) => {
                if (index <= currIndex || item.meta?.fixed) {
                    return true
                }
                this.cachedViews = this.cachedViews.filter(cachedItem => {
                    return item.path !== cachedItem.path
                })

                return false
            })
        },
        closeOtherViews(view: TagView) {
            this.tagViews = this.tagViews.filter(item => {
                return item.meta?.fixed || item.path === view.path
            })

            this.cachedViews = this.cachedViews.filter(item => {
                return item.meta?.fixed || item.path === view.path
            })
        },
        closeAllViews() {
            this.tagViews = this.tagViews.filter(item => {
                return item.meta?.fixed
            })

            this.cachedViews = this.cachedViews.filter(item => {
                return item.meta?.fixed
            })
        }
    }
})

export default useTagsViewStore