import { TextInputSize, TextInputState } from '../TextInput/types';
import { ReactNode } from 'react';

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
  showStepper?: boolean;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number | undefined) => void;
} 