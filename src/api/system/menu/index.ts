import request from '@utils/service'
import { MethodEnum } from '@enums/httpEnums'
import type { MenuTree, MenuRequest, MenuForm } from './types/index'


export const getMenuTree = (data: MenuRequest): Promise<MenuTree[]> => {
    return request({
        method: MethodEnum.GET,
        url: '/system/menu/getMenuTree',
        params: data
    })
}

export const addMenu = (data: MenuForm): Promise<number> => {
    return request({
        url: '/system/menu/save',
        data
    })
}

export const editMenu = (data: MenuForm): Promise<number> => {
    return request({
        method: MethodEnum.PUT,
        url: '/system/menu/edit',
        data
    })
}

export const removeMenu = (menuId: number) => {
    return request({
        method: MethodEnum.DELETE,
        url: `/system/menu/remove/${menuId}`
    })
}