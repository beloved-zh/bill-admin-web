import type { FormProps, GutterObject, TableProps, PaginationProps } from 'tdesign-vue-next'
import type { PageParams } from '@/api/common/types'

export interface DataForm extends PageParams {
}

export interface DataFormProps extends FormProps {
  rowGutter?: number | GutterObject | Array<GutterObject | number>
}

export interface PageListProps {
  form: DataFormProps,
  table: TableProps,
  pagination: PaginationProps
}

