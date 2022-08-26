import request from '@utils/service'
import type { Captcha, LoginFormData, LoginResponseData } from './types/index'
import {RequestEnum} from "@enums/httpEnums"

export const getCaptcha = (): Promise<Captcha> => {
    return request({
        method: RequestEnum.GET,
        url: 'auth/captcha'
    })
}

export const login = (data: LoginFormData):Promise<LoginResponseData> => {
    return request({
        url: '/auth/login',
        data
    })
}