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