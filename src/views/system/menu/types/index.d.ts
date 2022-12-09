import type { MenuTree, MenuForm } from '@/api/system/menu/types'
import {FormRule} from "tdesign-vue-next";

/**
 * 操作表单
 */
export interface PanlForm {
    open: boolean;
    title: string;
    parentMenu: MenuTree | null;
    form: MenuForm,
    rules: {[field in keyof MenuForm]?: FormRule[]}
}