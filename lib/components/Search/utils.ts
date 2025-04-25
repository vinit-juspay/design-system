import { themeConfig } from '../../themeConfig';

/**
 * Filter items based on search query
 * 
 * @param items - Items to filter (Menu or Select items)
 * @param query - Search query
 * @returns Filtered items
 */
export const filterItems = (
  items: any[], 
  query: string
): any[] => {
  if (!query) return items;
  
  const lowerCaseQuery = query.toLowerCase();
  
  // First, pre-process the items to handle groups and submenus
  const processedItems = items.map(item => {
    // For groups in Select component
    if ('label' in item && 'items' in item) {
      const filteredGroupItems = item.items.filter((groupItem: any) => {
        const itemText = String(
          // Handle Menu items
          groupItem.content || 
          // Handle Select items
          groupItem.text || 
          groupItem.value
        ).toLowerCase();
        
        return itemText.includes(lowerCaseQuery);
      });
      
      // If some items in the group match, return the group with only filtered items
      if (filteredGroupItems.length > 0) {
        return {
          ...item,
          items: filteredGroupItems
        };
      }
      
      // If the group label matches, keep the group with all items
      const labelText = String(item.label).toLowerCase();
      if (labelText.includes(lowerCaseQuery)) {
        return item;
      }
      
      // No match, mark for removal
      return null;
    }
    
    // For submenu items in Menu component
    if ('hasSubmenu' in item && item.hasSubmenu && item.submenuItems) {
      const filteredSubItems = filterItems(item.submenuItems, query);
      
      // If there are filtered subitems, keep the parent with filtered subitems
      if (filteredSubItems.length > 0) {
        return {
          ...item,
          submenuItems: filteredSubItems
        };
      }
      
      // Otherwise check if the parent's content matches
      const itemText = String(item.content).toLowerCase();
      if (itemText.includes(lowerCaseQuery)) {
        return item;
      }
      
      // No match, mark for removal
      return null;
    }
    
    // Keep labels with filtering by the label text
    if ('isLabel' in item && item.isLabel) {
      const labelText = String(item.content).toLowerCase();
      return labelText.includes(lowerCaseQuery) ? item : null;
    }
    
    // Skip separators when searching
    if ('isSeparator' in item && item.isSeparator) {
      return null;
    }
    
    // For standard items
    const itemText = String(
      // Handle Menu items
      item.content || 
      // Handle Select items
      item.text || 
      item.value
    ).toLowerCase();
    
    return itemText.includes(lowerCaseQuery) ? item : null;
  });
  
  // Filter out null items (those that didn't match the search query)
  return processedItems.filter(item => item !== null);
}; 