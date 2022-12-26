import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 扩展 AxiosRequestConfig 类型
declare module 'axios' {
    interface AxiosRequestConfig {
        showSuccessMessage?: boolean
        showLoading?: boolean
    }
}

// 自定义传入的参数
export interface RequestConfig<T = any> extends AxiosRequestConfig {
    interceptors?: RequestInterceptors<T>
}

export interface RequestInterceptors<T = any> {
    // 请求拦截
    requestInterceptors?: (config: RequestConfig<T>) => RequestConfig<T>
    requestInterceptorsCatch?: (err: any) => any
    // 响应拦截
    responseInterceptors?: (config: AxiosResponse<T>) => T
    responseInterceptorsCatch?: (err: any) => any
}