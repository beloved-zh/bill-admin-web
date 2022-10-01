import request from '@utils/service'
import { MethodEnum } from '@enums/httpEnums'
import type { Captcha, LoginFormData, LoginResponseData, UserInfo, MenuTree } from './types/index'

export const getCaptcha = (): Promise<Captcha> => {
    return request({
        method: MethodEnum.GET,
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
        method: MethodEnum.GET,
        url: '/auth/getUserInfo'
    })
}

export const getMenuTree = (): Promise<MenuTree[]> => {
    return request({
        url: '/auth/getMenuTree'
    })
}