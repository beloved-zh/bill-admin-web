import type { MenuForm, MenuRequest, MenuTree } from './types/index'
import request from '@/utils/service'
import { MethodEnum } from '@/enums/httpEnums'

export const getMenuTree = (data: MenuRequest): Promise<MenuTree[]> => request({
  method: MethodEnum.GET,
  url: '/system/menu/getMenuTree',
  params: data
})

export const addMenu = (data: MenuForm): Promise<number> => request({
  url: '/system/menu/save',
  data
})

export const editMenu = (data: MenuForm): Promise<number> => request({
  method: MethodEnum.PUT,
  url: '/system/menu/edit',
  data
})

export const removeMenu = (menuId: number) => request({
  method: MethodEnum.DELETE,
  url: `/system/menu/remove/${menuId}`
})
