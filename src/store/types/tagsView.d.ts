import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface TagsViewState {
    allViews: RouteLocationNormalizedLoaded[];
    cachedViews: RouteLocationNormalizedLoaded[];
}