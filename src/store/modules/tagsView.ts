import { defineStore } from 'pinia'
import type { TagsViewState } from '../types/tagsView'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const useTagsViewStore = defineStore({
    id: 'tagsView',
    state: (): TagsViewState => ({
        allViews: [],
        cachedViews: []
    }),
    getters: {},
    actions: {
        addView(view: RouteLocationNormalizedLoaded) {
            this.addAllViews(view)
        },
        addAllViews(view: RouteLocationNormalizedLoaded) {
            // 已经存在不添加
            if(this.allViews.some(item => item.path === view.path)) return
            if (view.meta.fixed) {
                this.allViews.unshift(JSON.parse(JSON.stringify(view)))
            } else {
                this.allViews.push(JSON.parse(JSON.stringify(view)))
            }
        },
        closeView(view: RouteLocationNormalizedLoaded) {
            const deleteIndex = this.deleteAllViews(view)
            return deleteIndex
        },
        deleteAllViews(view: RouteLocationNormalizedLoaded) {
            let deleteIndex
            for (let [index, item] of this.allViews.entries()) {
                if (view.path === item.path) {
                    this.allViews.splice(index, 1)
                    deleteIndex = index
                    break
                }
            }
            return deleteIndex
        }
    }
})

export default useTagsViewStore