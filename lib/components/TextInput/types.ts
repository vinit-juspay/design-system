export type TextInputSize = 'md' | 'lg';

export type TextInputState = 'default' | 'hover' | 'focused' | 'filled' | 'error' | 'disabled';

export interface TextInputProps {
  hintText?: string;
  label?: string;
  leftSlot?: React.ReactNode;
  mandatory?: boolean;
  placeholder?: string;
  rightSlot?: React.ReactNode;
  showHint?: boolean;
  showLabel?: boolean;
  showLeftSlot?: boolean;
  showRightSlot?: boolean;
  showSublabel?: boolean;
  size?: TextInputSize;
  state?: TextInputState;
  sublabel?: string;
} 