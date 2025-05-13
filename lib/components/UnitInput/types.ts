import { ReactNode } from 'react';
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
  size?: TextInputSize;
  rightSlot?: ReactNode;
  leftSlot?: ReactNode;
  state?: TextInputState;
  sublabel?: string;
  unitPosition?: UnitPosition;
  unitText?: string;
  value?: string;
  infoTooltip?: string;
  successMessage?: string;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
