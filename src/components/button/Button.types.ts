import { ComponentPropsWithoutRef } from 'react';
import { LucideIcon } from 'lucide-react';

/**
 * Available button sizes
 * @typedef {('sm'|'md'|'lg')} ButtonSize
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Available button types/variants
 * @typedef {('primary'|'secondary'|'danger'|'success')} ButtonType
 */
export type ButtonType = 'primary' | 'secondary' | 'danger' | 'success';

/**
 * Button sub-types that affect styling and layout
 * @typedef {('default'|'iconOnly'|'link')} ButtonSubType
 */
export type ButtonSubType = 'default' | 'iconOnly' | 'link';

/**
 * Props for the Button component
 * @interface ButtonProps
 * @extends {ComponentPropsWithoutRef<'button'>}
 */
export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  /** Size of the button (sm, md, lg) */
  size?: ButtonSize;
  /** Button variant (primary, secondary, danger, success) */
  buttonType?: ButtonType;
  /** Button sub-type that affects styling and layout */
  subType?: ButtonSubType;
  /** Text content for the button */
  text?: string;
  /** Icon component to display before the text */
  leadingIcon?: LucideIcon;
  /** Icon component to display after the text */
  trailingIcon?: LucideIcon;
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Whether the button is disabled */
  isDisabled?: boolean;
} 