import { cn } from "../../utils";
import { 
  MenuItemType, 
  MenuItemState, 
  MenuItemAction, 
  MenuType,
  MenuItemProps
} from "./types";

// Theme configuration - To be replaced with actual theme config
// This is a placeholder and should be integrated with the design system's theme
const themeConfig = {
  menu: {
    baseStyles: "rounded-md shadow-md overflow-hidden bg-white border border-gray-200 py-1",
    types: {
      [MenuType.DEFAULT]: "w-52",
      [MenuType.MULTI_SELECT]: "w-52",
      [MenuType.CONTEXT_MENU]: "w-52"
    },
    search: {
      container: "p-0 border-b border-gray-100",
      input: "w-full text-[14px] text-gray-600 bg-transparent border-none outline-none focus:ring-0 pl-[22px]"
    },
    searchIcon: "absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400",
    noResults: "p-3 text-sm text-gray-500 text-center"
  },
  menuItem: {
    baseStyles: "flex items-center px-3 py-1.5 text-[#525866] font-['Inter_Display'] text-[14px] font-medium leading-[20px]",
    types: {
      [MenuItemType.DEFAULT]: "cursor-pointer font-[500] text-[#525866]",
      [MenuItemType.MULTI_SELECT]: "cursor-pointer",
      [MenuItemType.ACTION]: "cursor-pointer font-medium",
      [MenuItemType.LABEL]: "font-semibold text-xs text-gray-500 uppercase tracking-wider py-1",
      [MenuItemType.SEPARATOR]: "py-0 my-1 border-b border-gray-200",
      [MenuItemType.SUBMENU]: "cursor-pointer font-[500] text-[#525866] relative"
    },
    states: {
      [MenuItemState.DEFAULT]: "bg-[#FFFFFF]",
      [MenuItemState.HOVER]: "!bg-[#F3F4F6]",
      [MenuItemState.SELECTED]: "bg-blue-50 text-blue-700",
      [MenuItemState.NA]: "pointer-events-none"
    },
    actions: {
      [MenuItemAction.NA]: "",
      [MenuItemAction.DANGER]: "text-red-600",
      [MenuItemAction.PRIMARY]: "text-blue-600"
    },
    actionHover: {
      [MenuItemAction.NA]: "!bg-[#F3F4F6]",
      [MenuItemAction.PRIMARY]: "!bg-blue-50",
      [MenuItemAction.DANGER]: "!bg-red-50"
    },
    disabled: "opacity-50 pointer-events-none",
    shortcut: "ml-auto text-xs text-gray-300",
    slotL: "mr-2 flex-shrink-0",
    slotR1: "ml-auto flex-shrink-0",
    slotR2: "ml-2 flex-shrink-0"
  }
};

// Helper functions for generating class names
export function getMenuClassNames(type: MenuType = MenuType.DEFAULT): string {
  return cn(
    themeConfig.menu.baseStyles,
    themeConfig.menu.types[type]
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
    ? themeConfig.menuItem.actionHover[action] 
    : themeConfig.menuItem.states[state];

  return cn(
    themeConfig.menuItem.baseStyles,
    themeConfig.menuItem.types[type],
    themeConfig.menuItem.actions[action],
    stateClass,
    disabled && themeConfig.menuItem.disabled
  );
}

export function getMenuSearchClassNames(): string {
  return cn(themeConfig.menu.search.container);
}

export function getMenuSearchInputClassNames(): string {
  return cn(themeConfig.menu.search.input);
}

export function getMenuSearchIconClassNames(): string {
  return cn(themeConfig.menu.searchIcon);
}

export function getMenuNoResultsClassNames(): string {
  return cn(themeConfig.menu.noResults);
}

export function getSlotLClassNames(): string {
  return cn(themeConfig.menuItem.slotL);
}

export function getSlotR1ClassNames(): string {
  return cn(themeConfig.menuItem.slotR1);
}

export function getSlotR2ClassNames(): string {
  return cn(themeConfig.menuItem.slotR2);
}

export function getShortcutClassNames(): string {
  return cn(themeConfig.menuItem.shortcut);
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

export function getSubmenuClassNames(): string {
  return cn(
    themeConfig.menu.baseStyles,
    "shadow-lg",  // Add stronger shadow to indicate it's floating
    "min-w-[8rem]", // Ensure minimum width
    "border border-gray-200",
    "mt-0 p-0", // Reset margin and padding
    "rounded-md",
    "z-[1100]" // Ensure high z-index
  );
} 