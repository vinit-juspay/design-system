import { ReactNode } from 'react';

export enum TextInputSize {
  MEDIUM = 'md',
  LARGE = 'lg',
}

export enum TextInputState {
  DEFAULT = 'default',
  HOVER = 'hover',
  FOCUSED = 'focused',
  FILLED = 'filled',
  ERROR = 'error',
  DISABLED = 'disabled',
  SUCCESS = 'success',
}

export interface TextInputProps {
  hintText?: string;
  label?: string;
  leftSlot?: ReactNode;
  mandatory?: boolean;
  placeholder?: string;
  rightSlot?: ReactNode;
  size?: TextInputSize;
  state?: TextInputState;
  sublabel?: string;
  value?: string;
  infoTooltip?: string; 
  successMessage?: string;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
} 