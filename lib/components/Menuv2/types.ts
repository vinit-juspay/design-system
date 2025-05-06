import { ReactNode, ElementType } from "react";

// Menu Item Types
export enum MenuItemType {
  DEFAULT = "DEFAULT",
  MULTI_SELECT = "MULTI_SELECT",
  ACTION = "ACTION",
  LABEL = "LABEL",
  SEPARATOR = "SEPARATOR",
  SUBMENU = "SUBMENU"
}

// Menu Item States
export enum MenuItemState {
  DEFAULT = "DEFAULT",
  HOVER = "HOVER",
  SELECTED = "SELECTED",
  NA = "NA"
}

// Menu Item Action Types
export enum MenuItemAction {
  NA = "NA",
  DANGER = "DANGER",
  PRIMARY = "PRIMARY"
}

// Menu Types
export enum MenuType {
  DEFAULT = "DEFAULT",
  MULTI_SELECT = "MULTI_SELECT",
  CONTEXT_MENU = "CONTEXT_MENU"
}

// Props for the slot components
export interface SlotProps {
  className?: string;
}

// Base MenuItem props
export interface MenuItemBaseProps {
  id?: string;
  text: string;
  className?: string;
  disabled?: boolean;
  type?: MenuItemType;
  state?: MenuItemState;
  action?: MenuItemAction;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// Props for MenuItem with slots
export interface MenuItemWithSlotsProps extends MenuItemBaseProps {
  hasSlotL?: boolean;
  hasSlotR1?: boolean;
  hasSlotR2?: boolean;
  slotL?: ReactNode;
  slotR1?: ReactNode;
  slotR2?: ReactNode;
}

// Props for MenuItem with shortcut
export interface MenuItemWithShortcutProps extends MenuItemWithSlotsProps {
  hasShortcut?: boolean;
  shortcutValue?: string;
}

// Combined MenuItem props
export interface MenuItemWithMultiSelectProps extends MenuItemWithShortcutProps {
  isMultiSelect?: boolean;
  isSelected?: boolean;
  hasSubmenu?: boolean;
  submenuItems?: MenuItemProps[];
  parentId?: string;
}

// Combined MenuItem props
export type MenuItemProps = MenuItemWithMultiSelectProps;

// Menu props
export interface MenuProps {
  children?: ReactNode;
  className?: string;
  type?: MenuType;
  hasSearch?: boolean;
  items: MenuItemProps[];
  searchPlaceholder?: string;
  onItemClick?: (item: MenuItemProps) => void;
  onSearch?: (searchTerm: string) => void;
  selectedItems?: string[];
  onSelectionChange?: (selectedItems: string[]) => void;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

// Menu compound components props
export interface MenuContextValue {
  selectedItems: string[];
  toggleSelection: (itemId: string) => void;
  setSelectedItems: (items: string[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredItems: MenuItemProps[];
  highlightedIndex: number;
  setHighlightedIndex: (index: number) => void;
  closeMenu: () => void;
} 