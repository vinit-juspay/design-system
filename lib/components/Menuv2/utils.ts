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

// Helper functions for generating class names
export function getMenuClassNames(type: MenuType = MenuType.DEFAULT): string {
  return cn(
    themeConfig.euler.menuv2.baseStyles,
    themeConfig.euler.menuv2.types[type],
    "w-auto min-w-[180px] max-w-[320px]" // Added max-width and changed from w-full to w-auto
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

export function getSlotLClassNames(): string {
  return cn(themeConfig.euler.menuv2.menuItem.slots.slotL);
}

export function getSlotR1ClassNames(): string {
  return cn(themeConfig.euler.menuv2.menuItem.slots.slotR1);
}

export function getSlotR2ClassNames(): string {
  return cn(themeConfig.euler.menuv2.menuItem.slots.slotR2);
}

export function getShortcutClassNames(): string {
  return cn(themeConfig.euler.menuv2.menuItem.shortcut);
}

export function getSubmenuClassNames(): string {
  return cn(themeConfig.euler.menuv2.menuItem.submenu.container);
}

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

export const getFilteredItems = (items: MenuItemProps[], searchTerm: string): MenuItemProps[] => {
  if (!searchTerm) return items;

  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return items.filter(item => 
    item.text.toLowerCase().includes(lowerCaseSearchTerm)
  );
};

// ========== Dropdown Utils ==========

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
  const baseClasses = "relative flex items-center transition-colors";
  
  const typeClasses = {
    [DropdownType.ICON_ONLY]: "justify-center",
    [DropdownType.SINGLE_SELECT]: "",
    [DropdownType.MULTI_SELECT]: "",
  };
  
  // Create separate state classes for NO_CONTAINER (borderless) and HAS_CONTAINER
  const stateClassesNoBorder = {
    [DropdownState.DEFAULT]: "bg-white text-gray-700",
    [DropdownState.HOVER]: "bg-gray-50 text-gray-700",
    [DropdownState.OPEN]: "bg-gray-25 text-gray-700",
    [DropdownState.SELECTED]: "bg-white text-gray-700",
  };
  
  const stateClassesWithBorder = {
    [DropdownState.DEFAULT]: "bg-white text-gray-700 border border-gray-200",
    [DropdownState.HOVER]: "bg-gray-50 text-gray-700 border border-gray-200",
    [DropdownState.OPEN]: "bg-gray-25 text-gray-700 border border-gray-200",
    [DropdownState.SELECTED]: "bg-white text-gray-700 border border-gray-200",
  };
  
  const sizeClasses = {
    [DropdownSize.SMALL]: "h-8 px-3.5 py-1.5 text-[14px]",
    [DropdownSize.MEDIUM]: "h-9 px-3.5 py-2 text-[14px]",
    [DropdownSize.LARGE]: "h-10 px-3.5 py-2.5 text-[14px]",
  };

  const subTypeClasses = {
    [DropdownSubType.HAS_CONTAINER]: `rounded-[10px] ${themeConfig.euler.menuv2.shadows.xs}`,
    [DropdownSubType.NO_CONTAINER]: "rounded-[10px]",
  };
  
  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed bg-gray-100" 
    : "cursor-pointer hover:bg-gray-50";

  // Choose state classes based on subType
  const stateClasses = subType === DropdownSubType.NO_CONTAINER ? 
    stateClassesNoBorder : stateClassesWithBorder;

  return cn(
    baseClasses,
    typeClasses[type],
    stateClasses[state],
    sizeClasses[size],
    subTypeClasses[subType],
    disabledClasses,
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

  // Default position is below the trigger element
  let top = rect.bottom + scrollY + offset;
  let left = rect.left + scrollX;
  let maxHeight = window.innerHeight - rect.bottom - offset - 20;

  // Calculate position based on the specified position
  if (position === 'bottom-end') {
    left = (rect.right + scrollX) - 200; // Assuming menu width of 200px
  } else if (position === 'top-start') {
    top = rect.top + scrollY - offset - 200; // Assuming menu height
    maxHeight = rect.top - offset - 20;
  } else if (position === 'top-end') {
    top = rect.top + scrollY - offset - 200; // Assuming menu height
    left = (rect.right + scrollX) - 200; // Assuming menu width of 200px
    maxHeight = rect.top - offset - 20;
  } else if (position === 'left') {
    left = rect.left + scrollX - 200 - offset; // Assuming menu width of 200px
  } else if (position === 'right') {
    left = rect.right + scrollX + offset;
  }

  // Adjust if overflows right side of window
  if (left + 200 > window.innerWidth + scrollX) {
    left = window.innerWidth + scrollX - 200 - 10;
  }

  // Adjust if overflows left side of window
  if (left < scrollX) {
    left = scrollX + 10;
  }

  // If vertical position overflows, flip it
  if (position.startsWith('bottom') && top + 200 > window.innerHeight + scrollY) {
    top = rect.top + scrollY - offset - 200;
    maxHeight = rect.top - offset - 20;
  } else if (position.startsWith('top') && top < scrollY) {
    top = rect.bottom + scrollY + offset;
    maxHeight = window.innerHeight - rect.bottom - offset - 20;
  }

  return { top, left, maxHeight };
};

export const getLeftIconClassNames = (size: DropdownSize = DropdownSize.MEDIUM): string => {
  const baseClasses = "mr-2";
  
  const sizeClasses = {
    [DropdownSize.SMALL]: "w-3 h-3",
    [DropdownSize.MEDIUM]: "w-3.5 h-3.5",
    [DropdownSize.LARGE]: "w-3.5 h-3.5",
  };
  
  return cn(baseClasses, sizeClasses[size]);
};

export const getChevronIconClassNames = (size: DropdownSize = DropdownSize.MEDIUM): string => {
  const baseClasses = "ml-2";
  
  const sizeClasses = {
    [DropdownSize.SMALL]: "w-3.5 h-3.5",
    [DropdownSize.MEDIUM]: "w-4 h-4",
    [DropdownSize.LARGE]: "w-4 h-4",
  };
  
  return cn(baseClasses, sizeClasses[size]);
};

export const getLabelClassNames = (size: DropdownSize = DropdownSize.MEDIUM): string => {
  const baseClasses = "font-medium text-gray-700";
  
  const sizeClasses = {
    [DropdownSize.SMALL]: "text-[12px]",
    [DropdownSize.MEDIUM]: "text-[14px]",
    [DropdownSize.LARGE]: "text-[14px]",
  };
  
  return cn(baseClasses, sizeClasses[size]);
};

export const getSubLabelClassNames = (size: DropdownSize = DropdownSize.MEDIUM): string => {
  const baseClasses = "font-normal text-gray-500";
  
  const sizeClasses = {
    [DropdownSize.SMALL]: "text-[12px]",
    [DropdownSize.MEDIUM]: "text-[14px]",
    [DropdownSize.LARGE]: "text-[14px]",
  };
  
  return cn(baseClasses, sizeClasses[size]);
};

export const getHintTextClassNames = (size: DropdownSize = DropdownSize.MEDIUM): string => {
  const baseClasses = "font-normal text-gray-500 mt-2";
  
  const sizeClasses = {
    [DropdownSize.SMALL]: "text-[12px]",
    [DropdownSize.MEDIUM]: "text-[14px]",
    [DropdownSize.LARGE]: "text-[14px]",
  };
  
  return cn(baseClasses, sizeClasses[size]);
}; 