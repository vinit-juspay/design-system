import { ReactNode } from 'react';

export enum RadioSize {
  SMALL = 'sm',
  MEDIUM = 'md',
}

export interface RadioProps {
  value: string;
  checked?: boolean;
  isDisabled?: boolean;
  size?: RadioSize;
  children: ReactNode;
  subtext?: string;
  rightSlot?: ReactNode;
  className?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioGroupProps {
  label?: string;
  name: string;
  defaultValue?: string;
  value?: string;
  children: ReactNode;
  onChange?: (data: { name: string; value: string }) => void;
  className?: string;
  isDisabled?: boolean;
}
