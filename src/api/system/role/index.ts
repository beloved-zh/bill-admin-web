import type { RoleData, RoleSearch } from './types/index'
import type { PageInfo } from '@/api/common/types'
import request from '@/utils/service'
import { MethodEnum } from '@/enums/httpEnums'

export const getList = (data: RoleSearch): Promise<PageInfo<RoleData>> => request({
  method: MethodEnum.GET,
  url: '/system/role/getList',
  params: data
})
