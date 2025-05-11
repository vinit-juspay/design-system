import { ReactNode } from 'react';

export enum CheckboxSize {
  SMALL = 'sm',
  MEDIUM = 'md',
}

export enum CheckboxPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface CheckboxProps {
  id?: string;
  value?: string;
  isChecked?: boolean | 'indeterminate';
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  isDisabled?: boolean;
  required?: boolean;
  className?: string;
  indicatorClassName?: string;
  checkIconClassName?: string;
  size?: CheckboxSize;
  children?: ReactNode;
  position?: CheckboxPosition;
  subtext?: string;
  rightSlot?: ReactNode;
}
