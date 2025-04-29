import { TextInputSize, TextInputState } from '../TextInput/types';

export enum UnitPosition {
  PREFIX = 'prefix',
  SUFFIX = 'suffix',
}

export interface UnitInputProps {
  hintText?: string;
  label?: string;
  mandatory?: boolean;
  placeholder?: string;
  showUnit?: boolean;
  size?: TextInputSize;
  state?: TextInputState;
  sublabel?: string;
  unitPosition?: UnitPosition;
  unitText?: string;
  value?: string;
  infoTooltip?: string;
  successMessage?: string;
} 