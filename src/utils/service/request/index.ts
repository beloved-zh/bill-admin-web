import axios, { AxiosResponse } from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestConfig, RequestInterceptors } from './types'


class Request {
    // axios 实例
    instance: AxiosInstance
    // 拦截器对象
    interceptors?: RequestInterceptors

    constructor(config: RequestConfig) {
        this.instance = axios.create(config)
        this.interceptors = config.interceptors

        // 使用实例拦截器
        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptors,
            this.interceptors?.requestInterceptorsCatch,
        )

        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptors,
            this.interceptors?.responseInterceptorsCatch,
        )
    }
    request<T>(config: RequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.request<T>(config)
    }
}

export default Request