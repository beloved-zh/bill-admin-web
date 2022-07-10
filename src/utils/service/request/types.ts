import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 自定义传入的参数
export interface RequestConfig<T = any> extends AxiosRequestConfig {
    showLoading?: boolean
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

export interface CancelRequestSource {
    [index: string]: () => void
}

