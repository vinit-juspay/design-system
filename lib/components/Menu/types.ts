import { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LucideIcon } from 'lucide-react';

// Menu positioning options
export enum MenuAlignment {
  START = 'start',
  CENTER = 'center',
  END = 'end'
}

export enum MenuSide {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left'
}

export enum SlotDirection {
  LEFT = 'left',
  RIGHT = 'right'
}

// Slot for menu items
export interface MenuItemSlot {
  content: ReactNode;
}

// Base menu item interface
export interface BaseMenuItemProps {
  content: ReactNode;
  disabled?: boolean;
  leftSlot?: MenuItemSlot;
  /** @deprecated Use leftSlot instead */
  icon?: LucideIcon;
}

// Base interface for menu items that support right slots
export interface WithRightSlotsProps {
  rightSlots?: MenuItemSlot[];
}

export interface MenuCheckboxProps extends BaseMenuItemProps, WithRightSlotsProps {
  isCheckbox: true;
  checked?: boolean;
  onSelect?: (checked: boolean) => void;
  isCheckboxListItem?: boolean;
  value?: string;
}

export interface MenuRadioProps extends BaseMenuItemProps {
  isRadio: true;
  value: string;
  checked?: boolean;
}

export interface MenuLabelProps {
  content: ReactNode;
  isLabel: true;
}

export interface MenuStandardProps extends BaseMenuItemProps, WithRightSlotsProps {
  subtext?: ReactNode;
  onSelect?: () => void;
  hasSubmenu?: boolean;
  submenuItems?: MenuItemWithSeparatorProps[];
  color?: 'danger' | 'success' | 'warning' | string;
  /** @deprecated Use rightSlots instead */
  shortcut?: string;
}

export interface MenuSeparatorProps {
  isSeparator: true;
}

// Type unions
export type MenuItemProps = MenuStandardProps | MenuCheckboxProps | MenuRadioProps | MenuLabelProps;
export type MenuItemWithSeparatorProps = MenuItemProps | MenuSeparatorProps;

/**
 * Configuration options for the menu search functionality
 */
export interface MenuSearchProps {
  /**
   * Enable or disable search functionality
   */
  enabled: boolean;
  
  /**
   * Placeholder text for the search input
   */
  placeholder?: string;
}

/**
 * Configuration options for multi-select functionality in the menu
 */
export interface MenuMultiSelectProps {
  /**
   * Enable or disable multi-select functionality
   */
  enabled: boolean;
  
  /**
   * Array of values that are currently selected
   */
  selectedValues?: string[];
  
  /**
   * Callback function triggered when selection changes
   * @param values Array of currently selected values
   */
  onSelectionChange?: (values: string[]) => void;
}

export enum CheckboxPosition {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface MenuProps {
  /**
   * The trigger element that opens the menu (typically a button)
   */
  children: ReactNode;
  
  /**
   * Array of menu items with properties like content, leftSlot, rightSlots, color, and optional separators
   */
  items: MenuItemWithSeparatorProps[];
  
  /**
   * Controls the horizontal alignment of the menu relative to the trigger element
   * @default MenuAlignment.START
   */
  align?: MenuAlignment;
  
  /**
   * Determines which side the menu appears on relative to the trigger
   * @default MenuSide.BOTTOM
   */
  side?: MenuSide;
  
  /**
   * Configuration for enabling search functionality within the menu, includes options like placeholder text
   */
  search?: MenuSearchProps;
  
  /**
   * Configuration for multi-select functionality, allows selecting multiple menu items with checkboxes
   */
  multiSelect?: MenuMultiSelectProps;
  
  /**
   * Controls the position of checkboxes within menu items
   */
  checkboxPosition?: CheckboxPosition;
  
  /**
   * Additional props to pass to the root element of the menu component
   */
  rootProps?: Omit<DropdownMenu.DropdownMenuProps, 'children'>;
  
  /**
   * Additional props to pass to the content container of the menu component
   */
  contentProps?: Omit<ComponentPropsWithoutRef<typeof DropdownMenu.Content>, 'children'>;
} 