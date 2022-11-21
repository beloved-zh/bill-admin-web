import {getIconFontJson} from "@api/common";

/**
 * 字典选项
 */
export interface Option {
    label: string;
    value: string;
}

export interface IconItem {
    icon_id: string;
    name: string;
    font_class: string;
    unicode: string;
    unicode_decimal: number;
}

export interface IconFont {
    id: string;
    name: string;
    font_family: string;
    css_prefix_text: string;
    description: string;
    glyphs: IconItem[];
}

export interface PageParams {
    pageNum?: number;
    pageSize?: number;
}

export interface PageInfo<T> {
    pageNum: number,
    pageSize: number,
    size: number,
    startRow: number,
    endRow: number,
    pages: number,
    prePage: number,
    nextPage: number,
    isFirstPage: boolean,
    isLastPage: boolean,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
    navigatePages: number,
    navigatepageNums: number[],
    navigateFirstPage: number,
    navigateLastPage: number,
    total: number,
    list: T[]
}