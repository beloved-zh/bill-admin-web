import { MenuTypeEnum, BooleanEnum, StateEnum } from '@/enums/systemEnums'
import type { BaseEntity, PageParams } from '@/api/common/types'

export interface RoleSearch extends Partial<PageParams> {
    roleName: string;
    state: string;
    remark: string;
}

export interface RoleData extends Partial<BaseEntity> {
    roleId: number;
    roleName: string;
    roleCode: string;
}

export interface RoleForm {
    roleId?: number;
    roleName: string;
    roleCode: string;
    state: StateEnum;
    remark: string;
}

export interface AuthRoleMenusForm {
    roleId: number;
    menus: number[];
}