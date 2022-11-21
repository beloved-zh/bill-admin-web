import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface TagView extends Partial<RouteLocationNormalizedLoaded> {
    key?: number
}

export interface TagsViewState {
    activeTagView: TagView;
    fixedTagViews: TagView[];
    canCloseTagViews: TagView[];
}