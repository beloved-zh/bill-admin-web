import type { FormRule, PrimaryTableCol, TreeNodeModel } from 'tdesign-vue-next'
import type { RoleData, RoleForm } from '@/api/system/role/types'
import type { PaginationProps } from 'tdesign-vue-next'
import type { Ref } from 'vue';
import { MenuTree } from '@/api/system/menu/types';

export interface TableOption {
    columns: PrimaryTableCol<RoleData>[],
    data: RoleData[],
    pagination: PaginationProps,
    height: Ref<number>
}

export interface OperatePanlForm {
    open: boolean;
    title: string;
    data: RoleForm,
    rules: {[field in keyof RoleForm]?: FormRule[]}
}

export interface AuthMenuPanlForm {
    open: boolean;
    data: {
        roleId: number
        roleName: string
        roleCode: string
        menus: number[]
    },
    tree: {
        data: MenuTree[]
        searchText: string
        expandAll: boolean
        selectAll: boolean
    }
}