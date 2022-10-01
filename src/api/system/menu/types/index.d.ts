import { MenuTypeEnum, BooleanEnum, StateEnum } from '@enums/systemEnums'

export interface MenuRequest {
    menuName: string;
    state: string;
}

export interface MenuForm {
    menuId?: number;
    parentId: number;
    menuType: MenuTypeEnum
    menuTitle: string;
    menuName: string;
    path: string;
    component: string;
    icon: string;
    orderNum: number;
    fixed: BooleanEnum;
    hidden: BooleanEnum;
    hasCache: BooleanEnum;
    remark: string;
    state: StateEnum;
}

export interface MenuData extends MenuForm {
    menuId: number;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
}

export interface MenuTree extends MenuData{
    children: MenuTree[];
}