import { cn } from "../../utils";
import { themeConfig } from "../../themeConfig";
import { 
  MenuItemType, 
  MenuItemState, 
  MenuItemAction, 
  MenuType,
  MenuItemProps
} from "./types";

// Helper functions for generating class names
export function getMenuClassNames(type: MenuType = MenuType.DEFAULT): string {
  return cn(
    themeConfig.euler.menuv2.baseStyles,
    themeConfig.euler.menuv2.types[type]
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