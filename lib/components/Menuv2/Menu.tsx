import React, { forwardRef, useRef, useEffect } from 'react';
import { cn } from '../../utils';
import { themeConfig } from '../../themeConfig';
import {
  MenuProps,
  MenuType,
  MenuContextValue,
  MenuItemType,
  MenuItemState
} from './types';
import {
  getMenuClassNames,
  getMenuSearchClassNames,
  getMenuSearchInputClassNames,
  getMenuNoResultsClassNames,
  prepareItemForMultiSelect
} from './utils';
import { useMenuSearch, useMenuKeyboardNavigation, useMenuSelection, useMenu as useMenuContext } from '../../hooks/useMenu';
import { MenuContext } from './context';
import MenuItem from './MenuItem';
import { Search } from 'lucide-react';

// Re-export the hook for backward compatibility
export const useMenu = useMenuContext;

const Menu = forwardRef<HTMLDivElement, MenuProps>(({
  children,
  className,
  type = MenuType.DEFAULT,
  hasSearch = false,
  items = [],
  searchPlaceholder = 'Search',
  onItemClick,
  onSearch,
  selectedItems: controlledSelectedItems,
  onSelectionChange,
  isOpen = true,
  onOpenChange,
  searchTerm: controlledSearchTerm,
  onSearchTermChange,
  onContextChange,
  ...props
}, ref) => {
  // Refs
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Use custom hooks for menu functionality
  const selection = useMenuSelection(controlledSelectedItems, onSelectionChange);
  
  const search = useMenuSearch(
    items,
    controlledSearchTerm,
    onSearch,
    onSearchTermChange
  );

  // Close the menu
  const closeMenu = () => {
    onOpenChange?.(false);
  };
  
  // Combine context value
  const contextValue: MenuContextValue = {
    selectedItems: selection.selectedItems,
    toggleSelection: selection.toggleSelection,
    setSelectedItems: selection.setSelectedItems,
    searchTerm: search.searchTerm,
    setSearchTerm: search.setSearchTerm,
    filteredItems: search.filteredItems,
    highlightedIndex: search.highlightedIndex,
    setHighlightedIndex: search.setHighlightedIndex,
    closeMenu
  };
  
  // Set up keyboard navigation
  useMenuKeyboardNavigation(
    isOpen,
    search.highlightedIndex,
    search.filteredItems,
    search.setHighlightedIndex,
    onItemClick,
    selection.toggleSelection,
    closeMenu,
    type,
    menuRef as React.RefObject<HTMLDivElement>,
    hasSearch,
    search.searchInputRef as React.RefObject<HTMLInputElement>
  );
  
  // Sync context value when states change
  useEffect(() => {
    onContextChange?.({
      selectedItems: selection.selectedItems,
      searchTerm: search.searchTerm,
      setSearchTerm: (term: string) => {
        search.setSearchTerm(term);
        onSearchTermChange?.(term);
      },
      toggleSelection: selection.toggleSelection,
      setSelectedItems: selection.setSelectedItems,
      filteredItems: search.filteredItems,
      highlightedIndex: search.highlightedIndex,
      setHighlightedIndex: search.setHighlightedIndex,
      closeMenu
    });
  }, [
    selection.selectedItems, 
    search.searchTerm, 
    search.highlightedIndex, 
    search.filteredItems,
    onContextChange, 
    onSearchTermChange
  ]);

  // If menu is closed, don't render anything
  if (!isOpen) return null;

  return (
    <MenuContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={cn(getMenuClassNames(type), className)}
        role="menu"
        tabIndex={-1}
        aria-orientation="vertical"
        {...props}
      >
        {/* Style tag for submenu animations */}
        <style>{themeConfig.euler.menuv2.animation}</style>
        
        {/* Search Input */}
        {hasSearch && (
          <div className={getMenuSearchClassNames()}>
            <div className={themeConfig.euler.menuv2.search.wrapper}>
              <span className={themeConfig.euler.menuv2.search.icon}>
                <Search size={16} />
              </span>
              <input
                ref={search.searchInputRef}
                type="text"
                className={getMenuSearchInputClassNames()}
                placeholder={searchPlaceholder}
                value={search.searchTerm}
                onChange={search.handleSearchChange}
                role="searchbox"
                aria-label="Search menu items"
              />
            </div>
          </div>
        )}
        
        {/* Menu Items Container with padding - add gap when search is visible */}
        <div ref={menuRef} className={cn(
          themeConfig.euler.menuv2.menuItemContainer.base,
          hasSearch && themeConfig.euler.menuv2.menuItemContainer.withSearch
        )}>
          {search.filteredItems.length > 0 ? (
            search.filteredItems.map((item, index) => {
              const modifiedItem = prepareItemForMultiSelect(item, type);
              const isSelected = type === MenuType.MULTI_SELECT && 
                item.id !== undefined && 
                selection.selectedItems.includes(item.id);
                
              const handleItemClick = () => {
                if (type === MenuType.MULTI_SELECT) {
                  selection.toggleSelection(item.id);
                } else {
                  onItemClick?.(item);
                  closeMenu();
                }
              };
              
              return (
                <MenuItem
                  key={`${item.id || index}`}
                  {...modifiedItem}
                  state={search.highlightedIndex === index ? MenuItemState.HOVER : item.state}
                  isMultiSelect={type === MenuType.MULTI_SELECT && modifiedItem.type !== MenuItemType.LABEL}
                  isSelected={isSelected}
                  onClick={handleItemClick}
                  onMouseEnter={() => search.setHighlightedIndex(index)}
                  data-index={index}
                />
              );
            })
          ) : (
            <div className={getMenuNoResultsClassNames()}>
              No results found
            </div>
          )}
        </div>
      </div>
    </MenuContext.Provider>
  );
});

Menu.displayName = 'Menu';

export default Menu;
