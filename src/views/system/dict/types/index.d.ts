import type { PrimaryTableCol } from 'tdesign-vue-next'
import type { RoleData } from '@/api/system/role/types'
import type { PaginationProps } from 'tdesign-vue-next'

export interface TableOption {
    columns: PrimaryTableCol<RoleData>[],
    data: RoleData[],
    pagination: PaginationProps
}

export interface PanlForm {
    open: boolean;
    title: string;
    data: {
        menuArray: number[]
    }
}