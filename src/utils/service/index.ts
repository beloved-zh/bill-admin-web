import Request from './request'
import { AxiosResponse } from 'axios'

import type { RequestConfig } from './request/types'
import { RequestEnum, ContentTypeEnum } from '@enums/httpEnums'

interface MyResponse<T = any> {
    code: number
    message: string
    data?: T
}

const defaultRequest = new Request({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 1000 * 60 * 5,
    headers: {
        'Content-Type': ContentTypeEnum.JSON
    },
    interceptors: {
        // 请求拦截器
        requestInterceptors: (config: RequestConfig<MyResponse>) => {
            console.log('实例请求拦截器')
            return config
        },
        requestInterceptorsCatch: err => {
            console.log('请求失败的拦截')
            return err
        },
        // 响应拦截器
        responseInterceptors: (result:AxiosResponse<MyResponse>) => {
            console.log('实例响应拦截器', result)
            return result.data
        },
        responseInterceptorsCatch: err => {
            console.log('响应失败拦截器')
            return err
        }
    },
})

const request = <T>(config: RequestConfig):Promise<AxiosResponse<T>> => {
    const { method = RequestEnum.POST } = config
    if (method.toUpperCase() === RequestEnum.GET) {
        config.params = config.data
    }
    config.method = method

    return defaultRequest.request<T>(config)
}

export default request