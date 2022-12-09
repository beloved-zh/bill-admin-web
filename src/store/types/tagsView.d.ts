import type { RouteMeta } from 'vue-router'

export interface TagView {
    key: number;
    name: string;
    path: string;
    meta: RouteMeta
}

export interface TagsViewState {
    activeTagView: TagView;
    fixedTagViews: TagView[];
    canCloseTagViews: TagView[];
}