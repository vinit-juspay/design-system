import * as React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { themeConfig } from '../../themeConfig';

export interface SearchProps {
  /**
   * Whether search is enabled
   */
  enabled?: boolean;
  /**
   * Placeholder text for the search input
   */
  placeholder?: string;
  /**
   * Current search query
   */
  searchQuery: string;
  /**
   * Callback for when search query changes
   */
  onSearchChange: (value: string) => void;
  /**
   * Container class names
   */
  containerClassName?: string;
  /**
   * Inner container class names
   */
  innerContainerClassName?: string;
  /**
   * Icon class names
   */
  iconClassName?: string;
  /**
   * Input class names
   */
  inputClassName?: string;
}

/**
 * Search component for filtering items in dropdown components
 * 
 * @component
 * @example
 * // Basic usage
 * <Search
 *   enabled={true}
 *   placeholder="Search..."
 *   searchQuery={searchQuery}
 *   onSearchChange={setSearchQuery}
 * />
 */
export const Search = React.forwardRef<
  HTMLInputElement,
  SearchProps
>(({
  enabled = false,
  placeholder = "Search...",
  searchQuery,
  onSearchChange,
  containerClassName = themeConfig.euler.menu.search.baseStyles,
  innerContainerClassName = themeConfig.euler.menu.search.container,
  iconClassName = themeConfig.euler.menu.search.icon,
  inputClassName = themeConfig.euler.menu.search.input,
}, ref) => {
  // Return null if search is not enabled
  if (!enabled) return null;

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  // Prevent keyboard events from propagating up
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  // Prevent clicks from closing the menu
  const handleSearchInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={containerClassName}>
      <div className={innerContainerClassName}>
        <SearchIcon className={iconClassName} />
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearchChange}
          onClick={handleSearchInputClick}
          onKeyDown={handleSearchKeyDown}
          className={inputClassName}
        />
      </div>
    </div>
  );
});

Search.displayName = 'Search';

export default Search;

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