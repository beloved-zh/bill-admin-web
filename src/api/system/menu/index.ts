import request from '@utils/service'
import type { MenuForm, MenuTree } from './types/index'

export const getMenuTree = (data: MenuForm): Promise<MenuTree[]> => {
    return request({
        url: '/system/menu/getMenuTree',
        data
    })
}