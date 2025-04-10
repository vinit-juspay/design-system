import { TextInputProps } from '../TextInput/types';

export type UnitPosition = 'prefix' | 'suffix';

export interface UnitInputProps extends Omit<TextInputProps, 'leftSlot' | 'rightSlot'> {
  unitText?: string;
  unitPosition?: UnitPosition;
  showUnit?: boolean;
} 