import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface TagView extends Partial<RouteLocationNormalizedLoaded> {
    key?: number
}

export interface TagsViewState {
    tagViews: TagView[];
    cachedViews: TagView[];
}