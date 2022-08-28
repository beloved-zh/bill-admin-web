import request from '@utils/service'
import type { Captcha, LoginFormData, LoginResponseData, UserInfo, RouteTree } from './types/index'
import {RequestEnum} from "@enums/httpEnums"

export const getCaptcha = (): Promise<Captcha> => {
    return request({
        method: RequestEnum.GET,
        url: 'auth/captcha'
    })
}

export const login = (data: LoginFormData): Promise<LoginResponseData> => {
    return request({
        url: '/auth/login',
        data
    })
}

export const getUserInfo = (): Promise<UserInfo> => {
    return request({
        method: RequestEnum.GET,
        url: '/auth/getUserInfo'
    })
}

export const getRoutes = (): Promise<RouteTree[]> => {
    return request({
        url: '/auth/getRoutes'
    })
}