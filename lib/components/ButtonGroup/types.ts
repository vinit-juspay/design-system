import { ReactNode } from 'react';

export enum ButtonGroupSize {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
}

export enum ButtonGroupMode {
  SINGLE_PRIMARY = 'singlePrimary',
  ALL_SECONDARY = 'allSecondary',
  NO_TRANSFORM = 'noTransform',
}

export interface ButtonGroupProps {
  /**
   * Size of buttons in the group
   */
  size?: ButtonGroupSize;
  /**
   * Whether buttons should be stacked without spacing (default: true)
   */
  isStacked?: boolean;
  /**
   * Button group mode for type handling:
   * - singlePrimary: Only one button can be primary/success/danger, rest will be secondary (default)
   * - allSecondary: Force all buttons to be secondary
   * - noTransform: Don't modify button types
   */
  mode?: ButtonGroupMode;
  /**
   * Children elements (should be Button components)
   */
  children: ReactNode;
  /**
   * Additional class names
   */
  className?: string;
} 