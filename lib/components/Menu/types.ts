import { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LucideIcon } from 'lucide-react';

// Menu positioning options
export type MenuAlignment = 'start' | 'center' | 'end';
export type MenuSide = 'top' | 'right' | 'bottom' | 'left';
export type SlotDirection = 'left' | 'right';

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

export interface MenuSearchProps {
  enabled: boolean;
  placeholder?: string;
}

export interface MenuMultiSelectProps {
  enabled: boolean;
  selectedValues?: string[];
  onSelectionChange?: (values: string[]) => void;
}

export interface MenuProps {
  children: ReactNode;
  items: MenuItemWithSeparatorProps[];
  align?: MenuAlignment;
  side?: MenuSide;
  search?: MenuSearchProps;
  multiSelect?: MenuMultiSelectProps;
  checkboxPosition?: 'left' | 'right';
  rootProps?: Omit<DropdownMenu.DropdownMenuProps, 'children'>;
  contentProps?: Omit<ComponentPropsWithoutRef<typeof DropdownMenu.Content>, 'children'>;
} 