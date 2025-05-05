import { ReactNode } from 'react';

export enum SwitchSize {
  SMALL = 'sm',
  MEDIUM = 'md',
}

export interface SwitchProps {
  /**
   * Value for the switch (required for SwitchGroup)
   */
  value?: string;
  /**
   * Whether the switch is checked
   */
  checked?: boolean;
  /**
   * Called when the checked state changes
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;
  /**
   * Size variant for the switch
   */
  size?: SwitchSize;
  /**
   * Label text to display next to the switch
   */
  label?: ReactNode;
  /**
   * Additional text to display below the label
   */
  subtext?: string;
  /**
   * Optional content to render on the right side
   */
  rightSlot?: ReactNode;
  /**
   * Optional class name for the root container
   */
  className?: string;
  /**
   * Name for the switch (when used outside SwitchGroup)
   */
  name?: string;
  /**
   * Change handler for the switch (when used outside SwitchGroup)
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SwitchGroupProps {
  label?: string;
  name: string;
  defaultValue?: string[];
  value?: string[];
  children: ReactNode;
  onChange?: (data: { name: string; values: string[] }) => void;
  className?: string;
  isDisabled?: boolean;
} 