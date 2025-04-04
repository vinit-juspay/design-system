import { ComponentPropsWithoutRef, ElementType } from 'react';

export type ButtonType = 'primary' | 'secondary' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonSubType = 'default' | 'iconOnly' | 'link';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  buttonType?: ButtonType;
  size?: ButtonSize;
  subType?: ButtonSubType;
  text?: string;
  leadingIcon?: ElementType;
  trailingIcon?: ElementType;
  isLoading?: boolean;
  isDisabled?: boolean;
} 