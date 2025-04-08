import { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

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

// Type that overrides base MenuItemProps for separators
export type MenuSeparatorProps = {
  isSeparator: true;
  content?: never; // Content is not needed for separators
};

/**
 * Props for menu items
 */
export interface MenuItemProps {
  /** The content of the menu item */
  content: ReactNode;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Optional icon component to display before the content */
  icon?: React.ElementType;
  /** Optional action when the menu item is selected */
  onSelect?: (event: Event) => void;
  /** Whether this is a separator rather than a regular item */
  isSeparator?: boolean;
  /** Whether this is a sub-menu label */
  isLabel?: boolean;
  /** Whether this is a checkbox item */
  isCheckbox?: boolean;
  /** Whether the checkbox (if applicable) is checked */
  checked?: boolean;
  /** Whether this is a radio item */
  isRadio?: boolean;
  /** Value for radio items */
  value?: string;
  /** Whether this opens a submenu */
  hasSubmenu?: boolean;
  /** Items for the submenu if this opens one */
  submenuItems?: MenuItemWithSeparatorProps[];
}

// Create a union type to allow either standard menu items or separators
export type MenuItemWithSeparatorProps = Omit<MenuItemProps, 'isSeparator'> | MenuSeparatorProps;

/**
 * Props for the Menu component
 */
export interface MenuProps {
  /** The element that will trigger the menu */
  children: ReactNode;
  /** The menu items to be displayed */
  items: MenuItemWithSeparatorProps[];
  /** Alignment of the menu */
  align?: MenuAlignment;
  /** Side where the menu appears */
  side?: MenuSide;
  /** Additional props for the dropdown menu root */
  rootProps?: Omit<DropdownMenu.DropdownMenuProps, 'children'>;
  /** Additional props for the dropdown menu content */
  contentProps?: Omit<ComponentPropsWithoutRef<typeof DropdownMenu.Content>, 'children'>;
} 