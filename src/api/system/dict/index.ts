import type { DictRequest, DictType } from './types/index'
import request from '@/utils/service'
import { MethodEnum } from '@/enums/httpEnums'

export const queryTypeList = (data: DictRequest): Promise<DictType[]> => request({
  method: MethodEnum.GET,
  url: '/system/dict/queryTypeList',
  params: data
})
