import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface TagView extends Partial<RouteLocationNormalizedLoaded> {
}

export interface TagsViewState {
    tagViews: TagView[];
    cachedViews: TagView[];
}