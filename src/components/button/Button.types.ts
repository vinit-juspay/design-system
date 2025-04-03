import { ComponentPropsWithoutRef } from 'react';
import { LucideIcon } from 'lucide-react';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'primary' | 'secondary' | 'danger' | 'success';
export type ButtonSubType = 'default' | 'iconOnly' | 'link';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  size?: ButtonSize;
  buttonType?: ButtonType;
  subType?: ButtonSubType;
  text?: string;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  isLoading?: boolean;
  isDisabled?: boolean;
} 