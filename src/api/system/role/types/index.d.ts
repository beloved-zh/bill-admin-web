import { MenuTypeEnum, BooleanEnum, StateEnum } from '@enums/systemEnums'
import type { PageParams } from '@api/common/types'

export interface RoleSearch extends PageParams {
    roleName: string;
    state: string;
    remark: string;
}

export interface RoleData {
    roleId: number;
    roleName: string;
    roleSort: number;
    state: StateEnum;
    remark: string;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
}