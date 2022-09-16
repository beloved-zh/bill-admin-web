import type { MenuTree } from '@api/system/menu/types'
import {isExternalLink} from "@/utils";

/**
 * 操作表单
 */
export interface PanlForm {
    open: boolean;
    title: string;
    parentMenu: MenuTree | null;
    form: {
        parentId: number;
        menuType: 'D' | 'M' | 'B';
        menuName: string;
        icon: string;
        orderNum: number;
        path: string;
        component: string;
        iframe: boolean;
        iframePath: string;
        isExternalLink: boolean;
        fixed: boolean;
        hidden: boolean;
        hasCache: boolean;
        state: '正常' | '停用';
    }
}