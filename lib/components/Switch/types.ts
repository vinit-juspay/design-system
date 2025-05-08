import { ReactNode } from 'react';

export enum SwitchSize {
  SMALL = 'sm',
  MEDIUM = 'md',
}

export interface SwitchProps {
  /**
   * Unique identifier for the switch
   */
  id?: string;
  /**
   * If true, the switch will be checked (controlled)
   */
  isChecked?: boolean;
  /**
   * If true, the switch will be initially checked (uncontrolled)
   */
  defaultChecked?: boolean;
  /**
   * If true, the switch will be disabled
   */
  isDisabled?: boolean;
  /**
   * Size variant for the switch
   */
  size?: SwitchSize;
  /**
   * Called when the switch is toggled
   */
  onChange?: (isChecked: boolean) => void;
  /**
   * The value to be used in the switch input for form submission
   */
  value?: string;
  /**
   * Label text to display next to the switch
   */
  label?: ReactNode;
  /**
   * Additional text to display below the label
   */
  subtext?: ReactNode;
  /**
   * Accessible label for screen readers (sets aria-label)
   */
  accessibilityLabel?: string;
  /**
   * Optional content to render on the right side
   */
  rightSlot?: ReactNode;
  /**
   * Optional class name for the root container
   */
  className?: string;
  /**
   * Name for the underlying input (useful for forms)
   */
  name?: string;
}

export interface SwitchGroupProps {
  /**
   * Unique identifier for the group
   */
  id?: string;
  /**
   * Label for the group
   */
  label?: ReactNode;
  /**
   * Name for all switches in the group
   */
  name?: string;
  /**
   * Children components (switches)
   */
  children: ReactNode;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * If true, all switches in the group will be disabled
   */
  isDisabled?: boolean;
  /**
   * Values that should be checked
   */
  value?: string[];
  /**
   * Default values that should be checked (uncontrolled)
   */
  defaultValue?: string[];
  /**
   * Called when any switch in the group changes
   */
  onChange?: (value: string[]) => void;
}
