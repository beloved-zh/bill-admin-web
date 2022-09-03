import type { RouteMeta } from 'vue-router'

/**
 * 验证码类型声明
 */
export interface Captcha {
    onOff: boolean;
    uuid: string;
    image: string;
}

/**
 * 登录表单类型声明
 */
export interface LoginFormData {
    username: string;
    password: string;
    code: string;
    uuid: string;
}

/**
 * 登录响应声明
 */
export interface LoginResponseData {
    header: string;
    tokenPrefix: string;
    token: string;
}

/**
 * 登录用户类型声明
 */
export interface UserInfo {
    userName: string;
    nickName: string;
    sex: string;
    avatar: string;
    roles: string[];
}

/**
 * 菜单数据类型
 */
export interface MenuTree {
    name: string;
    path: string;
    component: string | null;
    meta: RouteMeta;
    children: MenuTree[]
}