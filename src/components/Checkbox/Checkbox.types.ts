/**
 * Possible states for the checkbox
 */
export type CheckboxState = "selected" | "intermediate" | "unselected";

/**
 * Size options for the checkbox
 */
export type CheckboxSize = "sm" | "md";

/**
 * Props for the Checkbox component
 */
export interface CheckboxProps {
  /**
   * Size of the checkbox
   * @default "md"
   */
  size?: CheckboxSize;
  
  /**
   * Current state of the checkbox
   * @default "unselected"
   */
  state?: CheckboxState;
  
  /**
   * Whether the checkbox is enabled or disabled
   * @default true
   */
  enabled?: boolean;
  
  /**
   * Text label for the checkbox
   */
  labelText?: string;
  
  /**
   * Whether to show the label
   * @default true
   */
  hasLabel?: boolean;
  
  /**
   * Whether to include a slot for custom content
   * @default false
   */
  hasSlot?: boolean;
  
  /**
   * Whether to show descriptive subtext
   * @default false
   */
  hasSubtext?: boolean;
  
  /**
   * Subtext content displayed below the label
   */
  subtext?: string;
  
  /**
   * Callback for when checkbox state changes
   */
  onChange?: (checked: boolean) => void;
} 