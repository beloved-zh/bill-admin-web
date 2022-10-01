import type { MenuTree, MenuForm } from '@api/system/menu/types'
import type { FormRules } from 'element-plus'

/**
 * 操作表单
 */
export interface PanlForm {
    open: boolean;
    title: string;
    parentMenu: MenuTree | null;
    form: MenuForm,
    formRules: FormRules
}