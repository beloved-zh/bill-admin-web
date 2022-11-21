import request from '@utils/service'
import { MethodEnum } from '@enums/httpEnums'
import type { PageInfo } from '@api/common/types'
import type { RoleSearch, RoleData } from './types/index'



export const getList = (data: RoleSearch): Promise<PageInfo<RoleData>> => {
    return request({
        method: MethodEnum.GET,
        url: '/system/role/getList',
        params: data
    })
}