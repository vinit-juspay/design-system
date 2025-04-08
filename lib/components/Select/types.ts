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
export interface SelectProps {
  /**
   * Items to be displayed in the select menu
   */
  items: (SelectItemProps | SelectGroupProps | SeparatorItem)[];
  
  /**
   * Current selected value
   */
  value?: string;
  
  /**
   * Default value when uncontrolled
   */
  defaultValue?: string;
  
  /**
   * Called when value changes
   */
  onValueChange?: (value: string) => void;
  
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
  rootProps?: Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, 'defaultValue' | 'value' | 'onValueChange'>;
  
  /**
   * Optional props for Radix Select.Content
   */
  contentProps?: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>;
  
  /**
   * Optional props for Radix Select.Trigger
   */
  triggerProps?: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>;
  
  /**
   * Size variant for the select
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Optional additional className for the component
   */
  className?: string;
} 