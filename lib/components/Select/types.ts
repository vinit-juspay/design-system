import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { LucideIcon } from 'lucide-react';

// Props for individual SelectItem
export interface SelectItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  textValue?: string;
  text: React.ReactNode;
  icon?: LucideIcon;
}

// Props for SelectGroup
export interface SelectGroupProps {
  label: string; 
  items: SelectItemProps[];
}

// Type for item that can be a separator
export interface SeparatorItem {
  isSeparator: true;
}

// Union type for items that can be rendered in a Select
export type SelectItemWithSeparatorProps = SelectItemProps | SeparatorItem | SelectGroupProps;

// Main props for Select component
export interface SelectProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  /**
   * Items to be displayed in the select menu
   */
  items: Array<SelectItemProps | SelectGroupProps | SeparatorItem>;
  
  /**
   * Current selected value(s)
   * Can be a single string or array of strings when multiSelect is true
   */
  value?: string | string[];
  
  /**
   * Default value when uncontrolled
   * Can be a single string or array of strings when multiSelect is true
   */
  defaultValue?: string | string[];
  
  /**
   * Called when value changes
   */
  onValueChange?: (value: string | string[]) => void;
  
  /**
   * Enable multiple selection mode
   */
  multiSelect?: boolean;
  
  /**
   * Position of checkboxes relative to text (for multiSelect mode)
   */
  checkboxPosition?: 'left' | 'right';
  
  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string;
  
  /**
   * Custom render prop for trigger content
   */
  triggerContent?: React.ReactNode;
  
  /**
   * Whether the select is disabled
   */
  disabled?: boolean;
  
  /**
   * Optional props for Radix Select.Root
   */
  rootProps?: SelectPrimitive.SelectProps;
  
  /**
   * Optional props for Radix Select.Content
   */
  contentProps?: Omit<SelectPrimitive.SelectContentProps, 'ref'>;
  
  /**
   * Optional props for Radix Select.Trigger
   */
  triggerProps?: SelectPrimitive.SelectTriggerProps;
  
  /**
   * Size variant for the select
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Optional additional className for the component
   */
  className?: string;
  
  /**
   * Search functionality
   */
  search?: {
    enabled: boolean;
    placeholder?: string;
  };
} 