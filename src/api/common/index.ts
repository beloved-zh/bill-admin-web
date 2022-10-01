import request from '@utils/service'
import localRequest from '@utils/service/localFile'
import { MethodEnum } from '@enums/httpEnums'
import type { Option, IconFont } from './types/index'

export const getOptionData = (type): Promise<Option[]> => {
    return request({
        method: MethodEnum.GET,
        url: `common/optionData/${type}`
    })
}

export const getIconFontJson = (): Promise<IconFont> => {
    return localRequest(`/src/assets/icons/iconfont/iconfont.json`)
}