import 'vue-router'

export interface Breadcrumb {
    path: string
    title: string;
}

// 扩展 RouteMeta 类型
declare module 'vue-router' {
    interface RouteMeta {
        title?: string,
        icon?: string,
        hidden?: boolean,
        fixed?: boolean,
        keepAlive?: boolean,
        breadcrumbs?: Breadcrumb[],
        iframe?: string
    }
}