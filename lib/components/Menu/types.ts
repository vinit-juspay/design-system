import { ReactNode } from 'react';

// Menu Item Types
export enum MenuItemType {
  DEFAULT = 'DEFAULT',
  MULTI_SELECT = 'MULTI_SELECT',
  ACTION = 'ACTION',
  LABEL = 'LABEL',
  SEPARATOR = 'SEPARATOR',
  SUBMENU = 'SUBMENU',
}

// Menu Item States
export enum MenuItemState {
  DEFAULT = 'DEFAULT',
  HOVER = 'HOVER',
  SELECTED = 'SELECTED',
  NA = 'NA',
}

// Menu Item Action Types
export enum MenuItemAction {
  NA = 'NA',
  DANGER = 'DANGER',
  PRIMARY = 'PRIMARY',
}

// Menu Types
export enum MenuType {
  DEFAULT = 'DEFAULT',
  MULTI_SELECT = 'MULTI_SELECT',
  CONTEXT_MENU = 'CONTEXT_MENU',
}

// ========== Dropdown Types ==========
// Dropdown Types
export enum DropdownType {
  ICON_ONLY = 'iconOnly',
  SINGLE_SELECT = 'singleSelect',
  MULTI_SELECT = 'multiSelect',
}

// Dropdown States
export enum DropdownState {
  DEFAULT = 'default',
  HOVER = 'hover',
  OPEN = 'open',
  SELECTED = 'selected',
}

// Dropdown SubTypes
export enum DropdownSubType {
  /**
   * HAS_CONTAINER: Displays a full dropdown with label, sublabel, and hint text if provided.
   * Used for form elements that need additional context.
   */
  HAS_CONTAINER = 'hasContainer',

  /**
   * NO_CONTAINER: Displays only the dropdown trigger without label, sublabel, or hint text.
   * Used for standalone dropdowns that don't need additional context.
   */
  NO_CONTAINER = 'noContainer',
}

// Dropdown Selection Types
export enum DropdownSelectionType {
  TEXT = 'text',
  COUNT = 'count',
}

// Dropdown Sizes
export enum DropdownSize {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
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
  menuType?: MenuItemType;
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
export interface MenuItemProps extends MenuItemWithShortcutProps {
  isMultiSelect?: boolean;
  isSelected?: boolean;
  hasSubmenu?: boolean;
  submenuItems?: MenuItemProps[];
  parentId?: string;
}

// ========== Dropdown Props ==========
export interface DropdownProps {
  id?: string;
  className?: string;
  dropdownType?: DropdownType;
  subType?: DropdownSubType;
  size?: DropdownSize;
  state?: DropdownState;
  selectionType?: DropdownSelectionType;
  hasLabel?: boolean;
  hasSubLabel?: boolean;
  mandatory?: boolean;
  hasHelp?: boolean;
  hasHint?: boolean;
  hasClearButton?: boolean;
  hasLeftIcon?: boolean;
  leftIcon?: ReactNode;
  label?: string;
  subLabel?: string;
  hint?: string;
  placeholder?: string;
  selectedOption?: string | string[];
  selectedCount?: number;
  selectedText?: string;
  children?: ReactNode;
  menuItems: MenuItemProps[];
  onSelect?: (item: MenuItemProps | MenuItemProps[]) => void;
  onClear?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  isOpen?: boolean;
  disabled?: boolean;
  width?: string | number;
  position?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left' | 'right';
  offset?: number;
  'aria-label'?: string;
  searchTerm?: string;
  onSearchTermChange?: (searchTerm: string) => void;
  onSelectedItemsChange?: (selectedItems: string[]) => void;
  closeOnSelect?: boolean;
}

// Menu props
export interface MenuProps {
  children?: ReactNode;
  className?: string;
  menuType?: MenuType;
  hasSearch?: boolean;
  items: MenuItemProps[];
  searchPlaceholder?: string;
  onItemClick?: (item: MenuItemProps) => void;
  onSearch?: (searchTerm: string) => void;
  selectedItems?: string[];
  onSelectionChange?: (selectedItems: string[]) => void;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  searchTerm?: string;
  onSearchTermChange?: (searchTerm: string) => void;
  onContextChange?: (context: MenuContextValue) => void;
}

// Menu context value type
export interface MenuContextValue {
  selectedItems: string[];
  toggleSelection: (itemId?: string) => void;
  setSelectedItems: (items: string[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredItems: MenuItemProps[];
  highlightedIndex: number;
  setHighlightedIndex: (index: number) => void;
  closeMenu: () => void;
}
