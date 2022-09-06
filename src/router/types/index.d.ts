import 'vue-router'

// 扩展 RouteMeta 类型
declare module 'vue-router' {
    interface RouteMeta {
        title?: string,
        icon?: string,
        hidden?: boolean,
        fixed?: boolean,
        keepAlive?: boolean,
        breadcrumbs?: string[],
        iframe?: string
    }
}