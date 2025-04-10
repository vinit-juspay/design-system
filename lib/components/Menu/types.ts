import * as React from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LucideIcon } from 'lucide-react';

/**
 * Available menu alignments
 */
export type MenuAlignment = 'start' | 'center' | 'end';

/**
 * Available menu sides
 */
export type MenuSide = 'top' | 'right' | 'bottom' | 'left';

/**
 * Slot direction within menu items
 */
export type SlotDirection = 'left' | 'right';

// Type for menu item with checkbox properties
export interface MenuCheckboxProps {
  content: ReactNode;
  isCheckbox: true;
  checked?: boolean;
  onSelect?: (checked: boolean) => void;
  disabled?: boolean;
  icon?: LucideIcon;
}

// Type for menu item with radio properties
export interface MenuRadioProps {
  content: ReactNode;
  isRadio: true;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  icon?: LucideIcon;
}

// Type for menu label
export interface MenuLabelProps {
  content: ReactNode;
  isLabel: true;
}

// Type for standard menu item
export interface MenuStandardProps {
  content: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  icon?: LucideIcon;
  hasSubmenu?: boolean;
  submenuItems?: MenuItemWithSeparatorProps[];
}

// Type for menu separator
export interface MenuSeparatorProps {
  isSeparator: true;
}

// Union type for all menu item types
export type MenuItemProps = MenuStandardProps | MenuCheckboxProps | MenuRadioProps | MenuLabelProps;

// Create a union type to allow either standard menu items or separators
export type MenuItemWithSeparatorProps = MenuItemProps | MenuSeparatorProps;

/**
 * Search props for Menu component
 */
export interface MenuSearchProps {
  /**
   * Whether to enable the search functionality
   */
  enabled: boolean;
  
  /**
   * Placeholder text for the search input
   */
  placeholder?: string;
}

/**
 * Props for Menu component
 */
export interface MenuProps {
  /**
   * The trigger element that opens the menu
   */
  children: ReactNode;
  /**
   * Items to be displayed in the menu
   */
  items: MenuItemWithSeparatorProps[];
  /**
   * Alignment of the menu
   */
  align?: MenuAlignment;
  /**
   * Side where the menu appears
   */
  side?: MenuSide;
  /**
   * Search configuration for the menu
   */
  search?: MenuSearchProps;
  /**
   * Additional props for the dropdown menu root
   */
  rootProps?: Omit<DropdownMenu.DropdownMenuProps, 'children'>;
  /**
   * Additional props for the dropdown menu content
   */
  contentProps?: Omit<ComponentPropsWithoutRef<typeof DropdownMenu.Content>, 'children'>;
} 