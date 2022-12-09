import type { AxiosResponse } from 'axios'
import Request from './request'
import type { RequestConfig } from './types'
import { ContentTypeEnum, MethodEnum } from '@/enums/httpEnums'
import useStore from '@/store'
import { errorMessage } from '@/hooks/useMessage'

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
      const { useApp, useUser } = useStore()
      if (useUser.token && config.headers) {
        config.headers[useApp.tokenHeader] = useUser.token
      }
      return config
    },
    requestInterceptorsCatch: err => {
      return err
    },
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse<MyResponse>) => {
      const { code, message, data } = result.data
      if (code === 2000) {
        return data
      } else {
        errorMessage(message || '系统内部错误')
        return Promise.reject(new Error(message || '系统内部错误'))
      }
    },
    responseInterceptorsCatch: err => {
      const { message } = err.response.data
      errorMessage(message || '系统内部错误')
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

