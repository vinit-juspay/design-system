import { cn } from '../../utils';
import { themeConfig } from '../../themeConfig';

/**
 * Generates the appropriate class names for a menu
 * These classes will be applied to the main menu container
 * 
 * @returns {string} Combined Tailwind CSS class names for the menu
 */
export const getMenuClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.baseStyles;
};

/**
 * Generates the appropriate class names for menu items
 * 
 * @param {boolean} disabled - Whether the item is disabled
 * @returns {string} Combined Tailwind CSS class names for the menu item
 */
export const getMenuItemClassNames = (disabled: boolean = false): string => {
  const theme = themeConfig.euler.menu;
  
  return cn(theme.item.baseStyles, {
    'data-[disabled]': disabled
  });
};

/**
 * Generates the appropriate class names for label items
 * 
 * @returns {string} Combined Tailwind CSS class names for the label
 */
export const getLabelClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.label.baseStyles;
};

/**
 * Generates the appropriate class names for separator items
 * 
 * @returns {string} Combined Tailwind CSS class names for the separator
 */
export const getSeparatorClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.separator.baseStyles;
};

/**
 * Generates the appropriate class names for checkbox and radio items
 * 
 * @returns {string} Combined Tailwind CSS class names for the item
 */
export const getCheckClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.checkbox.baseStyles;
};

/**
 * Generates the appropriate class names for icons in menu items
 * 
 * @returns {string} Combined Tailwind CSS class names for the icon
 */
export const getIconClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.item.icon;
};

/**
 * Generates the appropriate class names for the search container
 * 
 * @returns {string} Combined Tailwind CSS class names for the search container
 */
export const getSearchContainerClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.search.baseStyles;
};

/**
 * Generates the appropriate class names for the search input
 * 
 * @returns {string} Combined Tailwind CSS class names for the search input
 */
export const getSearchInputClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.search.input;
};

/**
 * Filter menu items based on search query
 * 
 * @param items - Menu items to filter
 * @param query - Search query
 * @returns Filtered menu items
 */
export const filterMenuItems = (
  items: any[], 
  query: string
): any[] => {
  if (!query) return items;
  
  const lowerCaseQuery = query.toLowerCase();
  
  return items.filter(item => {
    // Keep separators
    if ('isSeparator' in item && item.isSeparator) {
      return false; // Hide separators when searching
    }
    
    // Keep labels with filtering by the label text
    if ('isLabel' in item && item.isLabel) {
      const labelText = String(item.content).toLowerCase();
      return labelText.includes(lowerCaseQuery);
    }
    
    // For submenu items, recursively filter submenu
    if ('hasSubmenu' in item && item.hasSubmenu && item.submenuItems) {
      const filteredSubItems = filterMenuItems(item.submenuItems, query);
      
      // If there are filtered subitems, keep the parent
      if (filteredSubItems.length > 0) {
        return {
          ...item,
          submenuItems: filteredSubItems
        };
      }
      
      // Otherwise check if the parent's content matches
      const itemText = String(item.content).toLowerCase();
      return itemText.includes(lowerCaseQuery);
    }
    
    // For standard items, check if content includes the query
    const itemText = String(item.content).toLowerCase();
    return itemText.includes(lowerCaseQuery);
  });
};

/**
 * Filter select items based on search query
 * This is a utility function for the Select component to use the Menu search functionality
 * 
 * @param items - Select items to filter
 * @param query - Search query
 * @returns Filtered select items
 */
export const filterSelectItems = (
  items: any[],
  query: string
): any[] => {
  if (!query) return items;
  
  const lowerCaseQuery = query.toLowerCase();
  
  const filteredItems = items.filter(item => {
    // Keep separators
    if ('isSeparator' in item && item.isSeparator) {
      return false; // Hide separators when searching
    }
    
    // Handle group items
    if ('label' in item && 'items' in item) {
      // Filter the items in the group
      const filteredGroupItems = filterSelectItems(item.items, query);
      
      // If there are filtered items, keep the group
      if (filteredGroupItems.length > 0) {
        // Store the filtered items for later use
        item._filteredItems = filteredGroupItems;
        return true;
      }
      
      // If the group label matches, keep the group with all items
      const labelText = String(item.label).toLowerCase();
      return labelText.includes(lowerCaseQuery);
    }
    
    // For standard select items
    const itemText = String(item.text || item.value).toLowerCase();
    return itemText.includes(lowerCaseQuery);
  });
  
  // Process the filtered items to replace group items with their filtered versions
  return filteredItems.map(item => {
    if ('label' in item && 'items' in item && item._filteredItems) {
      return {
        ...item,
        items: item._filteredItems,
        _filteredItems: undefined
      };
    }
    return item;
  });
}; 