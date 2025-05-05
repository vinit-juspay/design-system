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
  /**
   * Whether the checkbox is checked, unchecked, or indeterminate
   */
  checked?: boolean | 'indeterminate';
  /**
   * Called when the checked state changes
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Required attribute for the checkbox
   */
  required?: boolean;
  /**
   * Controlled value for the checkbox (for use in list selections)
   */
  value?: string;
  /**
   * Optional class name for the root container
   */
  className?: string;
  /**
   * Optional class name for the indicator container
   */
  indicatorClassName?: string;
  /**
   * Optional class name for the check icon
   */
  checkIconClassName?: string;
  /**
   * Size variant for the checkbox
   */
  size?: CheckboxSize;
  /**
   * Children to render next to the checkbox (like a label)
   */
  children?: ReactNode;
  /**
   * Position of the checkbox relative to children/label
   */
  position?: CheckboxPosition;
  /**
   * Additional text to display below the checkbox
   */
  subtext?: string;
  /**
   * Optional content to render on the right side
   */
  rightSlot?: ReactNode;
}
