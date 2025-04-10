export type TextInputSize = 'md' | 'lg';

export type TextInputState = 'default' | 'hover' | 'focused' | 'filled' | 'error' | 'disabled' | 'success';

export interface TextInputProps {
  hintText?: string;
  label?: string;
  leftSlot?: React.ReactNode;
  mandatory?: boolean;
  placeholder?: string;
  rightSlot?: React.ReactNode;
  size?: TextInputSize;
  state?: TextInputState;
  sublabel?: string;
  value?: string;
  infoTooltip?: string; 
  successMessage?: string;
} 