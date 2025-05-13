import React from 'react';
import { cn } from '../../utils';
import { themeConfig } from '../../themeConfig';
import {
  MenuItemType,
  MenuItemState,
  MenuItemAction,
  MenuType,
  MenuItemProps,
  DropdownType,
  DropdownState,
  DropdownSubType,
  DropdownSize,
} from './types';

// Generic helper to map enum values to themeConfig keys
export function mapEnumToThemeKey<T extends string | number, R extends string>(
  value: T,
  mapping: Record<T, R>
): R {
  return mapping[value] || (Object.values(mapping)[0] as R); // Cast to R to fix type error
}

// Size enum mapping
const SIZE_KEY_MAP = {
  [DropdownSize.SMALL]: 'SMALL',
  [DropdownSize.MEDIUM]: 'MEDIUM',
  [DropdownSize.LARGE]: 'LARGE',
} as const;

// State enum mapping
const STATE_KEY_MAP = {
  [DropdownState.DEFAULT]: 'DEFAULT',
  [DropdownState.HOVER]: 'HOVER',
  [DropdownState.OPEN]: 'OPEN',
  [DropdownState.SELECTED]: 'SELECTED',
} as const;

// Type enum mapping
const TYPE_KEY_MAP = {
  [DropdownType.ICON_ONLY]: 'ICON_ONLY',
  [DropdownType.MULTI_SELECT]: 'MULTI_SELECT',
  [DropdownType.SINGLE_SELECT]: 'SINGLE_SELECT',
} as const;

// Subtype enum mapping
const SUBTYPE_KEY_MAP = {
  [DropdownSubType.HAS_CONTAINER]: 'HAS_CONTAINER',
  [DropdownSubType.NO_CONTAINER]: 'NO_CONTAINER',
} as const;

// Maps dropdown size enum to themeConfig size key
export function getSizeKey(size: DropdownSize) {
  return SIZE_KEY_MAP[size] || 'MEDIUM';
}

// Maps dropdown state to theme key
export function getStateKey(state: DropdownState) {
  return STATE_KEY_MAP[state] || 'DEFAULT';
}

// Maps dropdown type to theme key
export function getTypeKey(type: DropdownType) {
  return TYPE_KEY_MAP[type] || 'SINGLE_SELECT';
}

// Maps dropdown subtype to theme key
export function getSubTypeKey(subType: DropdownSubType) {
  return SUBTYPE_KEY_MAP[subType] || 'HAS_CONTAINER';
}

// ===== Menu Helpers =====
export function getMenuClassNames(type: MenuType = MenuType.DEFAULT): string {
  return cn(
    themeConfig.euler.menuv2.baseStyles,
    themeConfig.euler.menuv2.types[type],
    themeConfig.euler.menuv2.dimensions.width,
    themeConfig.euler.menuv2.dimensions.minWidth,
    themeConfig.euler.menuv2.dimensions.maxWidth
  );
}

export function getMenuItemClassNames({
  type = MenuItemType.DEFAULT,
  state = MenuItemState.DEFAULT,
  action = MenuItemAction.NA,
  disabled = false,
}: {
  type?: MenuItemType;
  state?: MenuItemState;
  action?: MenuItemAction;
  disabled?: boolean;
}): string {
  const stateClass =
    state === MenuItemState.HOVER
      ? themeConfig.euler.menuv2.menuItem.actionHover[action]
      : themeConfig.euler.menuv2.menuItem.states[state];

  return cn(
    themeConfig.euler.menuv2.menuItem.baseStyles,
    themeConfig.euler.menuv2.menuItem.types[type],
    themeConfig.euler.menuv2.menuItem.actions[action],
    stateClass,
    disabled && themeConfig.euler.menuv2.menuItem.disabled
  );
}

// Menu UI element classnames
export const menuUIClasses = {
  search: {
    container: () => cn(themeConfig.euler.menuv2.search.container),
    input: () => cn(themeConfig.euler.menuv2.search.input),
    icon: () => cn(themeConfig.euler.menuv2.search.icon),
    noResults: () => cn(themeConfig.euler.menuv2.search.noResults),
  },
  menuItem: {
    slotL: () => cn(themeConfig.euler.menuv2.menuItem.slots.slotL),
    slotR1: () => cn(themeConfig.euler.menuv2.menuItem.slots.slotR1),
    slotR2: () => cn(themeConfig.euler.menuv2.menuItem.slots.slotR2),
    shortcut: () => cn(themeConfig.euler.menuv2.menuItem.shortcut),
    submenu: () => cn(themeConfig.euler.menuv2.menuItem.submenu.container),
  },
};

// For backward compatibility
export const getMenuSearchClassNames = menuUIClasses.search.container;
export const getMenuSearchInputClassNames = menuUIClasses.search.input;
export const getMenuSearchIconClassNames = menuUIClasses.search.icon;
export const getMenuNoResultsClassNames = menuUIClasses.search.noResults;
export const getSlotLClassNames = menuUIClasses.menuItem.slotL;
export const getSlotR1ClassNames = menuUIClasses.menuItem.slotR1;
export const getSlotR2ClassNames = menuUIClasses.menuItem.slotR2;
export const getShortcutClassNames = menuUIClasses.menuItem.shortcut;
export const getSubmenuClassNames = menuUIClasses.menuItem.submenu;

// Filter items based on search term
export function filterMenuItems(items: MenuItemProps[], searchTerm: string): MenuItemProps[] {
  if (!searchTerm) return items;

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return items.filter(item => {
    // Don't filter separators, they should remain visible
    if (item.type === MenuItemType.SEPARATOR) return true;

    // Filter by text content
    return item.text.toLowerCase().includes(lowerCaseSearchTerm);
  });
}

// Helper for menu navigation
export const isNodeInRange = (currentNode: HTMLElement, menuElement: HTMLElement) => {
  const menuRect = menuElement.getBoundingClientRect();
  const currentRect = currentNode.getBoundingClientRect();

  return currentRect.top >= menuRect.top && currentRect.bottom <= menuRect.bottom;
};

export const handleHighlightOption = (
  event: React.KeyboardEvent<HTMLDivElement> | React.KeyboardEvent<HTMLInputElement>,
  currentIndex: number,
  totalItems: number,
  setHighlightedIndex: (index: number) => void,
  menuElement: HTMLElement | null
) => {
  if (!menuElement) return;

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();

    const newIndex =
      event.key === 'ArrowDown'
        ? (currentIndex + 1) % totalItems
        : (currentIndex - 1 + totalItems) % totalItems;

    setHighlightedIndex(newIndex);

    const targetElement = menuElement.querySelector(`[data-index="${newIndex}"]`) as HTMLElement;
    if (targetElement && !isNodeInRange(targetElement, menuElement)) {
      targetElement.scrollIntoView({ block: 'nearest' });
    }
  }
};

/**
 * Generates the base class names for a dropdown based on its type, state, size, and other properties
 */
export const getDropdownBaseClasses = (
  type: DropdownType,
  subType: DropdownSubType,
  size: DropdownSize,
  state: DropdownState,
  disabled: boolean = false,
  className?: string
): string => {
  // Map enum values to themeConfig keys
  const stateKey = getStateKey(state);
  const typeKey = getTypeKey(type);
  const sizeKey = getSizeKey(size);
  const subTypeKey = getSubTypeKey(subType);

  // Select the appropriate state classes based on subType
  const stateClasses =
    subType === DropdownSubType.NO_CONTAINER
      ? themeConfig.euler.menuv2.dropdown.states.noBorder[stateKey]
      : themeConfig.euler.menuv2.dropdown.states.withBorder[stateKey];

  return cn(
    themeConfig.euler.menuv2.dropdown.baseClasses,
    themeConfig.euler.menuv2.dropdown.typeClasses[typeKey],
    stateClasses,
    themeConfig.euler.menuv2.dropdown.sizes[sizeKey],
    themeConfig.euler.menuv2.dropdown.subtypes[subTypeKey],
    disabled
      ? themeConfig.euler.menuv2.dropdown.disabled.true
      : themeConfig.euler.menuv2.dropdown.disabled.false,
    className
  );
};

/**
 * Calculates the position for the dropdown menu
 */
export const calculateDropdownPosition = (
  triggerElement: HTMLElement,
  position: string = 'bottom-start',
  offset: number = 4
): { top: number; left: number; maxHeight: number } => {
  const rect = triggerElement.getBoundingClientRect();
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const scrollX = window.scrollX || document.documentElement.scrollLeft;

  // Get constants from themeConfig
  const menuWidth = themeConfig.euler.menuv2.dropdown.positioning.menuWidth;
  const menuHeight = themeConfig.euler.menuv2.dropdown.positioning.menuHeight;
  const rightPadding = themeConfig.euler.menuv2.dropdown.positioning.rightPadding;
  const maxHeightOffset = themeConfig.euler.menuv2.dropdown.positioning.maxHeightOffset;
  const configOffset = themeConfig.euler.menuv2.dropdown.positioning.offset;

  // Use provided offset or default from config
  const finalOffset = offset !== 4 ? offset : configOffset;

  // Default position is below the trigger element
  let top = rect.bottom + scrollY + finalOffset;
  let left = rect.left + scrollX;
  let maxHeight = window.innerHeight - rect.bottom - finalOffset - maxHeightOffset;

  // Calculate position based on the specified position
  if (position === 'bottom-end') {
    left = rect.right + scrollX - menuWidth;
  } else if (position === 'top-start') {
    top = rect.top + scrollY - finalOffset - menuHeight;
    maxHeight = rect.top - finalOffset - maxHeightOffset;
  } else if (position === 'top-end') {
    top = rect.top + scrollY - finalOffset - menuHeight;
    left = rect.right + scrollX - menuWidth;
    maxHeight = rect.top - finalOffset - maxHeightOffset;
  } else if (position === 'left') {
    left = rect.left + scrollX - menuWidth - finalOffset;
  } else if (position === 'right') {
    left = rect.right + scrollX + finalOffset;
  }

  // Adjust if overflows right side of window
  if (left + menuWidth > window.innerWidth + scrollX) {
    left = window.innerWidth + scrollX - menuWidth - rightPadding;
  }

  // Adjust if overflows left side of window
  if (left < scrollX) {
    left = scrollX + rightPadding;
  }

  // If vertical position overflows, flip it
  if (position.startsWith('bottom') && top + menuHeight > window.innerHeight + scrollY) {
    top = rect.top + scrollY - finalOffset - menuHeight;
    maxHeight = rect.top - finalOffset - maxHeightOffset;
  } else if (position.startsWith('top') && top < scrollY) {
    top = rect.bottom + scrollY + finalOffset;
    maxHeight = window.innerHeight - rect.bottom - finalOffset - maxHeightOffset;
  }

  return { top, left, maxHeight };
};

// Helper to get component classes by size
export const getComponentClassBySize = (componentPath: string, size: DropdownSize): string => {
  const sizeKey = getSizeKey(size);
  const theme = themeConfig.euler.menuv2;

  // Safely navigate to the component's path
  const parts = componentPath.split('.');
  let current: any = theme;

  for (const part of parts) {
    if (current && current[part]) {
      current = current[part];
    } else {
      console.warn(`Path ${componentPath} not found in theme config`);
      return '';
    }
  }

  // Return the combined classes
  return cn(current.base, current.sizes ? current.sizes[sizeKey] : '');
};

// Component-specific class name getters
export const getLeftIconClassNames = (size: DropdownSize = DropdownSize.MEDIUM): string => {
  return getComponentClassBySize('dropdown.leftIcon', size);
};

export const getChevronIconClassNames = (size: DropdownSize = DropdownSize.MEDIUM): string => {
  return getComponentClassBySize('dropdown.chevron', size);
};

export const getLabelClassNames = (size: DropdownSize = DropdownSize.MEDIUM): string => {
  return getComponentClassBySize('dropdown.label', size);
};

export const getSubLabelClassNames = (size: DropdownSize = DropdownSize.MEDIUM): string => {
  return getComponentClassBySize('dropdown.sublabel', size);
};

export const getHintTextClassNames = (size: DropdownSize = DropdownSize.MEDIUM): string => {
  return getComponentClassBySize('dropdown.hint', size);
};

// Helper function to check if item is interactive
export const isInteractiveItem = (item: MenuItemProps): boolean => {
  return item.type !== MenuItemType.SEPARATOR && item.type !== MenuItemType.LABEL;
};

// Helper function to find next valid item index
export const findNextValidItemIndex = (
  currentIndex: number,
  items: MenuItemProps[],
  direction: 'next' | 'prev'
): number => {
  const itemCount = items.length;
  if (itemCount === 0) return -1;

  let nextIndex =
    direction === 'next'
      ? (currentIndex + 1) % itemCount
      : (currentIndex - 1 + itemCount) % itemCount;

  // Skip separators and labels
  let loopGuard = 0;
  const maxLoops = items.length;

  while (
    nextIndex >= 0 &&
    nextIndex < itemCount &&
    !isInteractiveItem(items[nextIndex]) &&
    loopGuard < maxLoops
  ) {
    loopGuard++;
    nextIndex =
      direction === 'next' ? (nextIndex + 1) % itemCount : (nextIndex - 1 + itemCount) % itemCount;
  }

  return loopGuard < maxLoops ? nextIndex : -1;
};

// Helper function to modify item for multi-select
export const prepareItemForMultiSelect = (item: MenuItemProps, type: MenuType): MenuItemProps => {
  if (type !== MenuType.MULTI_SELECT) return item;

  // Create a copy of the item to modify
  const modifiedItem = { ...item };

  // For label items, don't display checkbox or any other elements
  if (modifiedItem.type === MenuItemType.LABEL) {
    modifiedItem.hasSlotR1 = false;
    modifiedItem.slotR1 = null;
  } else if (modifiedItem.type !== MenuItemType.SEPARATOR) {
    // Remove any icons that might appear as checks
    modifiedItem.slotR1 = null;

    // Remove any check icons from slotR2 as well
    modifiedItem.slotR2 = null;
    modifiedItem.hasSlotR2 = false;

    // Always set hasSlotR1 to true for multi-select to ensure checkbox renders
    modifiedItem.hasSlotR1 = true;
  }

  return modifiedItem;
};

// Handle keyboard navigation logic
export const handleKeyboardNavigation = (
  e: KeyboardEvent,
  highlightedIndex: number,
  filteredItems: MenuItemProps[],
  setHighlightedIndex: (index: number) => void,
  onItemClick?: (item: MenuItemProps) => void,
  toggleSelection?: (itemId?: string) => void,
  closeMenu?: () => void,
  type?: MenuType,
  menuRef?: React.RefObject<HTMLDivElement> | undefined
): void => {
  switch (e.key) {
    case 'ArrowDown':
    case 'ArrowUp': {
      e.preventDefault();
      const direction = e.key === 'ArrowDown' ? 'next' : 'prev';
      const nextIndex = findNextValidItemIndex(highlightedIndex, filteredItems, direction);

      if (nextIndex >= 0) {
        setHighlightedIndex(nextIndex);

        if (menuRef?.current) {
          const targetElement = menuRef.current.querySelector(
            `[data-index="${nextIndex}"]`
          ) as HTMLElement;
          if (targetElement) {
            targetElement.scrollIntoView({ block: 'nearest' });
          }
        }
      }
      break;
    }
    case 'Enter': {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filteredItems.length) {
        const item = filteredItems[highlightedIndex];
        if (isInteractiveItem(item)) {
          if (type === MenuType.MULTI_SELECT) {
            toggleSelection?.(item.id);
          } else {
            onItemClick?.(item);
            closeMenu?.();
          }
        }
      }
      break;
    }
    case 'Escape': {
      e.preventDefault();
      closeMenu?.();
      break;
    }
  }
};

// Handle item selection for multi-select menus
export const toggleItemSelection = (
  itemId: string | undefined,
  selectedItems: string[],
  setSelectedItems: (items: string[]) => void,
  onSelectionChange?: (items: string[]) => void
): void => {
  if (!itemId) return;

  // Create a new array to avoid mutation issues
  let newSelectedItems: string[];

  if (selectedItems.includes(itemId)) {
    // Remove if already selected
    newSelectedItems = selectedItems.filter(id => id !== itemId);
  } else {
    // Add if not selected
    newSelectedItems = [...selectedItems, itemId];
  }

  // Update local state
  setSelectedItems(newSelectedItems);

  // Notify parent if callback is provided
  if (onSelectionChange) {
    onSelectionChange(newSelectedItems);
  }
};

// Helper function to check if arrays are equal
export const areArraysEqual = (a: string[], b: string[]): boolean => {
  if (a.length !== b.length) return false;
  return a.every(item => b.includes(item)) && b.every(item => a.includes(item));
};
