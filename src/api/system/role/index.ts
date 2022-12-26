import type { AuthRoleMenusForm, RoleData, RoleForm, RoleSearch } from './types/index'
import type { PageInfo } from '@/api/common/types'
import request from '@/utils/service'
import { MethodEnum } from '@/enums/httpEnums'

export const getList = (data: RoleSearch): Promise<PageInfo<RoleData>> => request({
  method: MethodEnum.GET,
  url: '/system/role/getList',
  params: data
})

export const saveRole = (data: RoleForm): Promise<number> => request({
  showSuccessMessage: true,
  method: MethodEnum.POST,
  url: '/system/role/save',
  data
})

export const editRole = (data: RoleForm): Promise<number> => request({
  showSuccessMessage: true,
  method: MethodEnum.PUT,
  url: '/system/role/edit',
  data
})

export const getRoleAuthMenus = (roleId: number): Promise<number[]> => request({
  method: MethodEnum.GET,
  url: `/system/role/getRoleAuthMenus/${roleId}`
})

export const authRoleMenus = (data: AuthRoleMenusForm): Promise<number> => request({
  showSuccessMessage: true,
  method: MethodEnum.POST,
  url: '/system/role/authRoleMenus',
  data
})

export const removeRole = (roleId: number) => request({
  showSuccessMessage: true,
  method: MethodEnum.DELETE,
  url: `/system/role/remove/${roleId}`
})
