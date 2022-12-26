import { BaseEntity } from '@/api/common/types';
import { StateEnum } from '@/enums/systemEnums'

export interface DictRequest {
  dictName?: string;
  dictType?: string;
  state?: StateEnum | null;
}

export interface DictType extends Partial<BaseEntity> {
  dictId?: number;
  dictName: string;
  dictType: string;
}