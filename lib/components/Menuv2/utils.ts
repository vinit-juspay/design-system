import { cn } from "../../utils";
import { themeConfig } from "../../themeConfig";
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
  DropdownSelectionType
} from "./types";

// Generic helper to map enum values to themeConfig keys
export function mapEnumToThemeKey(value: any, mapping: Record<any, string>): string {
  return mapping[value] || Object.values(mapping)[0]; // Default to first value if not found
}

// Maps dropdown size enum to themeConfig size key
export function getSizeKey(size: DropdownSize): 'SMALL' | 'MEDIUM' | 'LARGE' {
  return size === DropdownSize.SMALL 
    ? 'SMALL' 
    : size === DropdownSize.LARGE 
      ? 'LARGE' 
      : 'MEDIUM';
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
  disabled = false
}: {
  type?: MenuItemType;
  state?: MenuItemState;
  action?: MenuItemAction;
  disabled?: boolean;
}): string {
  const stateClass = state === MenuItemState.HOVER 
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

// Search-related classnames
export function getMenuSearchClassNames(): string {
  return cn(themeConfig.euler.menuv2.search.container);
}

export function getMenuSearchInputClassNames(): string {
  return cn(themeConfig.euler.menuv2.search.input);
}

export function getMenuSearchIconClassNames(): string {
  return cn(themeConfig.euler.menuv2.search.icon);
}

export function getMenuNoResultsClassNames(): string {
  return cn(themeConfig.euler.menuv2.search.noResults);
}

// Consolidated slot class getters
export const menuItemSlotClasses = {
  slotL: () => cn(themeConfig.euler.menuv2.menuItem.slots.slotL),
  slotR1: () => cn(themeConfig.euler.menuv2.menuItem.slots.slotR1),
  slotR2: () => cn(themeConfig.euler.menuv2.menuItem.slots.slotR2),
  shortcut: () => cn(themeConfig.euler.menuv2.menuItem.shortcut),
  submenu: () => cn(themeConfig.euler.menuv2.menuItem.submenu.container)
};

// For backward compatibility
export const getSlotLClassNames = menuItemSlotClasses.slotL;
export const getSlotR1ClassNames = menuItemSlotClasses.slotR1;
export const getSlotR2ClassNames = menuItemSlotClasses.slotR2;
export const getShortcutClassNames = menuItemSlotClasses.shortcut;
export const getSubmenuClassNames = menuItemSlotClasses.submenu;

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

  return (
    currentRect.top >= menuRect.top &&
    currentRect.bottom <= menuRect.bottom
  );
};

export const handleHighlightOption = (
  event: React.KeyboardEvent<HTMLDivElement> | React.KeyboardEvent<HTMLInputElement>,
  currentIndex: number,
  totalItems: number,
  setHighlightedIndex: (index: number) => void,
  menuElement: HTMLElement | null
) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    const newIndex = (currentIndex + 1) % totalItems;
    setHighlightedIndex(newIndex);

    if (menuElement) {
      const targetElement = menuElement.querySelector(`[data-index="${newIndex}"]`) as HTMLElement;
      if (targetElement && !isNodeInRange(targetElement, menuElement)) {
        targetElement.scrollIntoView({ block: "nearest" });
      }
    }
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    const newIndex = (currentIndex - 1 + totalItems) % totalItems;
    setHighlightedIndex(newIndex);

    if (menuElement) {
      const targetElement = menuElement.querySelector(`[data-index="${newIndex}"]`) as HTMLElement;
      if (targetElement && !isNodeInRange(targetElement, menuElement)) {
        targetElement.scrollIntoView({ block: "nearest" });
      }
    }
  }
};

// Alias for filterMenuItems to maintain backward compatibility
export const getFilteredItems = filterMenuItems;

// ========== Dropdown Utils ==========

// Maps dropdown state to theme key
export function getStateKey(state: DropdownState): 'DEFAULT' | 'HOVER' | 'OPEN' | 'SELECTED' {
  return state === DropdownState.DEFAULT 
    ? 'DEFAULT' 
    : state === DropdownState.HOVER 
      ? 'HOVER' 
      : state === DropdownState.OPEN 
        ? 'OPEN' 
        : 'SELECTED';
}

// Maps dropdown type to theme key
export function getTypeKey(type: DropdownType): 'ICON_ONLY' | 'MULTI_SELECT' | 'SINGLE_SELECT' {
  return type === DropdownType.ICON_ONLY 
    ? 'ICON_ONLY' 
    : type === DropdownType.MULTI_SELECT 
      ? 'MULTI_SELECT' 
      : 'SINGLE_SELECT';
}

// Maps dropdown subtype to theme key
export function getSubTypeKey(subType: DropdownSubType): 'HAS_CONTAINER' | 'NO_CONTAINER' {
  return subType === DropdownSubType.HAS_CONTAINER 
    ? 'HAS_CONTAINER' 
    : 'NO_CONTAINER';
}

/**
 * Generates the base class names for a dropdown based on its type, state, size, and other properties
 */
export const getDropdownBaseClasses = (
  type: DropdownType,
  subType: DropdownSubType,
  size: DropdownSize,
  state: DropdownState,
  selectionType: DropdownSelectionType,
  disabled: boolean = false,
  className?: string
): string => {
  // Map enum values to themeConfig keys
  const stateKey = getStateKey(state);
  const typeKey = getTypeKey(type);
  const sizeKey = getSizeKey(size);
  const subTypeKey = getSubTypeKey(subType);
        
  // Select the appropriate state classes based on subType
  const stateClasses = subType === DropdownSubType.NO_CONTAINER 
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
): { top: number, left: number, maxHeight: number } => {
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
    left = (rect.right + scrollX) - menuWidth;
  } else if (position === 'top-start') {
    top = rect.top + scrollY - finalOffset - menuHeight;
    maxHeight = rect.top - finalOffset - maxHeightOffset;
  } else if (position === 'top-end') {
    top = rect.top + scrollY - finalOffset - menuHeight;
    left = (rect.right + scrollX) - menuWidth;
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

// Consolidated theme class getters using the shared size mapper
export const getComponentClassBySize = (
  componentPath: string,
  basePath: string,
  size: DropdownSize
): string => {
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
  return cn(
    current.base,
    current.sizes ? current.sizes[sizeKey] : ''
  );
};

// Component-specific class name getters
export const getLeftIconClassNames = (size: DropdownSize = DropdownSize.MEDIUM): string => {
  return getComponentClassBySize('dropdown.leftIcon', 'base', size);
};

export const getChevronIconClassNames = (size: DropdownSize = DropdownSize.MEDIUM): string => {
  return getComponentClassBySize('dropdown.chevron', 'base', size);
};

export const getLabelClassNames = (size: DropdownSize = DropdownSize.MEDIUM): string => {
  return getComponentClassBySize('dropdown.label', 'base', size);
};

export const getSubLabelClassNames = (size: DropdownSize = DropdownSize.MEDIUM): string => {
  return getComponentClassBySize('dropdown.sublabel', 'base', size);
};

export const getHintTextClassNames = (size: DropdownSize = DropdownSize.MEDIUM): string => {
  return getComponentClassBySize('dropdown.hint', 'base', size);
}; 