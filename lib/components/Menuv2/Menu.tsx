import React, { createContext, forwardRef, useContext, useState, useRef, useEffect } from 'react';
import { cn } from '../../utils';
import { themeConfig } from '../../themeConfig';
import {
  MenuProps,
  MenuType,
  MenuContextValue,
  MenuItemProps,
  MenuItemType,
  MenuItemState
} from './types';
import {
  getMenuClassNames,
  getMenuSearchClassNames,
  getMenuSearchInputClassNames,
  getMenuSearchIconClassNames,
  getMenuNoResultsClassNames,
  filterMenuItems,
  handleHighlightOption
} from './utils';
import MenuItem from './MenuItem';
import { Search } from 'lucide-react';

// Create context for menu state
const MenuContext = createContext<MenuContextValue>({
  selectedItems: [],
  toggleSelection: () => {},
  setSelectedItems: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
  filteredItems: [],
  highlightedIndex: -1,
  setHighlightedIndex: () => {},
  closeMenu: () => {}
});

// Helper function to check if item is interactive
const isInteractiveItem = (item: MenuItemProps): boolean => {
  return item.type !== MenuItemType.SEPARATOR && item.type !== MenuItemType.LABEL;
};

// Helper function to find next valid item index
const findNextValidItemIndex = (
  currentIndex: number, 
  items: MenuItemProps[], 
  direction: 'next' | 'prev'
): number => {
  const itemCount = items.length;
  if (itemCount === 0) return -1;
  
  let nextIndex = direction === 'next' 
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
    nextIndex = direction === 'next'
      ? (nextIndex + 1) % itemCount
      : (nextIndex - 1 + itemCount) % itemCount;
  }
  
  return loopGuard < maxLoops ? nextIndex : -1;
};

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
  // State management
  const [selectedItems, setSelectedItems] = useState<string[]>(
    controlledSelectedItems !== undefined ? controlledSelectedItems : []
  );
  const [searchTerm, setSearchTerm] = useState(
    controlledSearchTerm !== undefined ? controlledSearchTerm : ''
  );
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  // Refs
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Sync context value when selectedItems or searchTerm change
  useEffect(() => {
    onContextChange?.({
      selectedItems,
      searchTerm,
      setSearchTerm: (term: string) => {
        setSearchTerm(term);
        onSearchTermChange?.(term);
      },
      toggleSelection,
      setSelectedItems,
      filteredItems,
      highlightedIndex,
      setHighlightedIndex,
      closeMenu
    });
  }, [selectedItems, searchTerm, highlightedIndex, onContextChange, onSearchTermChange]);
  
  // Filter menu items based on search term
  const filteredItems = filterMenuItems(items, searchTerm);

  // Handle item selection for multi-select menus
  const toggleSelection = (itemId?: string) => {
    if (!itemId) return;
    
    let newSelectedItems;
    if (selectedItems.includes(itemId)) {
      newSelectedItems = selectedItems.filter(id => id !== itemId);
    } else {
      newSelectedItems = [...selectedItems, itemId];
    }
    
    setSelectedItems(newSelectedItems);
    onSelectionChange?.(newSelectedItems);
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp': {
          e.preventDefault();
          const direction = e.key === 'ArrowDown' ? 'next' : 'prev';
          const nextIndex = findNextValidItemIndex(highlightedIndex, filteredItems, direction);
          
          if (nextIndex >= 0) {
            setHighlightedIndex(nextIndex);
            
            if (menuRef.current) {
              const targetElement = menuRef.current.querySelector(`[data-index="${nextIndex}"]`) as HTMLElement;
              if (targetElement) {
                targetElement.scrollIntoView({ block: "nearest" });
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
                toggleSelection(item.id);
              } else {
                onItemClick?.(item);
                closeMenu();
              }
            }
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          closeMenu();
          break;
        }
      }
    };

    // Focus on search input if available, otherwise on the menu
    if (hasSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    } else if (menuRef.current) {
      menuRef.current.focus();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, highlightedIndex, filteredItems, type, onItemClick]);

  // Close the menu
  const closeMenu = () => {
    onOpenChange?.(false);
  };
  
  // Helper function to modify item for multi-select
  const prepareItemForMultiSelect = (item: MenuItemProps): MenuItemProps => {
    if (type !== MenuType.MULTI_SELECT) return item;
    
    // Create a copy of the item to modify
    const modifiedItem = {...item};
    
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
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
    onSearchTermChange?.(value);
    
    // Reset highlighted index when search term changes
    setHighlightedIndex(-1);
  };
  
  // Provide context value
  const contextValue: MenuContextValue = {
    selectedItems,
    toggleSelection,
    setSelectedItems,
    searchTerm,
    setSearchTerm,
    filteredItems,
    highlightedIndex,
    setHighlightedIndex,
    closeMenu
  };

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
                ref={searchInputRef}
                type="text"
                className={getMenuSearchInputClassNames()}
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={handleSearchChange}
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
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              const modifiedItem = prepareItemForMultiSelect(item);
              const isSelected = type === MenuType.MULTI_SELECT && 
                item.id !== undefined && 
                selectedItems.includes(item.id);
                
              const handleItemClick = () => {
                if (type === MenuType.MULTI_SELECT) {
                  toggleSelection(item.id);
                } else {
                  onItemClick?.(item);
                  closeMenu();
                }
              };
              
              return (
                <MenuItem
                  key={`${item.id || index}`}
                  {...modifiedItem}
                  state={highlightedIndex === index ? MenuItemState.HOVER : item.state}
                  isMultiSelect={type === MenuType.MULTI_SELECT && modifiedItem.type !== MenuItemType.LABEL}
                  isSelected={isSelected}
                  onClick={handleItemClick}
                  onMouseEnter={() => setHighlightedIndex(index)}
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

Menu.displayName = "Menu";

// Custom hook for accessing menu context
export const useMenu = () => useContext(MenuContext);

export default Menu;
