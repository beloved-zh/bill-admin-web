import type { IconFont, Option } from './types/index'
import request from '@/utils/service'
import localRequest from '@/utils/service/localFile'
import { MethodEnum } from '@/enums/httpEnums'

export const getOptionData = (type): Promise<Option[]> => request({
  method: MethodEnum.GET,
  url: `common/optionData/${type}`
})

export const getIconFontJson = (): Promise<IconFont> => localRequest('/src/assets/icons/iconfont/iconfont.json')
