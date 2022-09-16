import Request from './request'
import type { AxiosResponse } from 'axios'
import type { RequestConfig } from './types'

const defaultRequest = new Request({
    timeout: 1000 * 2,
    interceptors: {
        // 请求拦截器
        requestInterceptors: (config: RequestConfig) => {
            return config
        },
        requestInterceptorsCatch: err => {
            return err
        },
        // 响应拦截器
        responseInterceptors: (result:AxiosResponse) => {
            return result.data
        },
        responseInterceptorsCatch: err => {
            return err
        }
    }
})

const localRequest = <T>(url: string): Promise<T> => {
    return defaultRequest.instance.get(url)
}

export default localRequest

