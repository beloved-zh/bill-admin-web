import Request from './request'
import type { AxiosResponse } from 'axios'
import type { RequestConfig } from './types'
import { MethodEnum, ContentTypeEnum } from '@enums/httpEnums'
import { ElMessage } from 'element-plus'
import useStore from '@/store'

interface MyResponse<T = any> {
    code: number
    message: string
    data?: T
}

const defaultRequest = new Request({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 1000 * 5,
    headers: {
        'Content-Type': ContentTypeEnum.JSON
    },
    interceptors: {
        // 请求拦截器
        requestInterceptors: (config: RequestConfig<MyResponse>) => {
            const { app, user } = useStore();
            if (user.token && config.headers) {
                config.headers[app.tokenHeader] = user.token
            }
            return config
        },
        requestInterceptorsCatch: err => {
            return err
        },
        // 响应拦截器
        responseInterceptors: (result:AxiosResponse<MyResponse>) => {

            const { code, message, data } = result.data
            if (code === 2000) {
                return data
            } else {
                ElMessage({
                    message: message || '系统内部错误',
                    type: 'error'
                })
                return Promise.reject(new Error(message || '系统内部错误'))
            }
        },
        responseInterceptorsCatch: err => {
            const { message } = err.response.data
                ElMessage({
                message: message || '系统内部错误',
                type: 'error'
            })
            return Promise.reject(new Error(message || '系统内部错误'))
        }
    }
})

const request = <T>(config: RequestConfig): Promise<T> => {
    const { method = MethodEnum.POST } = config
    config.method = method
    return defaultRequest.instance.request(config)
}

export default request

