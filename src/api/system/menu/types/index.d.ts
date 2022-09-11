export interface MenuForm {
    menuName: string;
    state: string;
}

export interface MenuData {
    menuId: number;
    menuName: string;
    parentId: number;
    orderNum: number;
    path: string;
    component: string;
    iframePath: string;
    hasCache: string;
    hidden: string;
    fixed: string;
    menuType: string;
    state: string;
    icon: string;
    remark: string;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
}

export interface MenuTree extends MenuData{
    children: MenuTree[];
}