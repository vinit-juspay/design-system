import { TextInputSize, TextInputState } from '../TextInput/types';
import { ReactNode } from 'react';

export enum StepperDirection {
  UP = 'up',
  DOWN = 'down',
}

export interface NumberInputProps {
  hintText?: string;
  label?: string;
  leftSlot?: ReactNode;
  mandatory?: boolean;
  placeholder?: string;
  rightSlot?: ReactNode;
  size?: TextInputSize;
  state?: TextInputState;
  sublabel?: string;
  value?: number;
  infoTooltip?: string;
  successMessage?: string;
  errorMessage?: string;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number | undefined) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
} 