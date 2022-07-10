import request from '@utils/service'
import { AxiosResponse } from 'axios'
import { LoginFormData, LoginResponseData } from './types/index'

export const login = (data: LoginFormData):Promise<AxiosResponse<LoginResponseData>> => {
    return request<LoginResponseData>({
        url: '/oauth/login',
        data
    })
}