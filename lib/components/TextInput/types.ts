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
} 