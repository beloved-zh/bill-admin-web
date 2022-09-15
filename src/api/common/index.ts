import request from '@utils/service'
import { RequestEnum } from '@enums/httpEnums'
import type { Option } from './types/index'

export const getOptionData = (type): Promise<Option[]> => {
    return request({
        method: RequestEnum.GET,
        url: `common/optionData/${type}`
    })
}