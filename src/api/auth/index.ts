import type { Captcha, LoginFormData, LoginResponseData, MenuTree, UserInfo } from './types/index'
import request from '@/utils/service'
import { MethodEnum } from '@/enums/httpEnums'

export const getCaptcha = (): Promise<Captcha> => request({
  method: MethodEnum.GET,
  url: 'auth/captcha'
})

export const login = (data: LoginFormData): Promise<LoginResponseData> => request({
  url: '/auth/login',
  data
})

export const getUserInfo = (): Promise<UserInfo> => request({
  method: MethodEnum.GET,
  url: '/auth/getUserInfo'
})

export const getMenuTree = (): Promise<MenuTree[]> => request({ url: '/auth/getMenuTree' })
