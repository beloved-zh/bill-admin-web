import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface TagView extends Partial<RouteLocationNormalizedLoaded> {
}

export interface TagsViewState {
    allViews: TagView[];
    cachedViews: TagView[];
}