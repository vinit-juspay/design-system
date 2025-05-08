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
  filterMenuItems
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
  while (
    nextIndex >= 0 && 
    nextIndex < itemCount && 
    !isInteractiveItem(items[nextIndex])
  ) {
    nextIndex = direction === 'next'
      ? (nextIndex + 1) % itemCount
      : (nextIndex - 1 + itemCount) % itemCount;
  }
  
  return nextIndex;
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
  // State
  const [selectedItems, setSelectedItems] = useState<string[]>(controlledSelectedItems !== undefined ? controlledSelectedItems : []);
  const [searchTerm, setSearchTerm] = useState(controlledSearchTerm !== undefined ? controlledSearchTerm : '');

  useEffect(() => {
    onContextChange?.({
      selectedItems,
      searchTerm,
      setSearchTerm: (term: string) => {
        setSearchTerm(term);
        onSearchTermChange?.(term);
      }
    });
  }, [selectedItems, searchTerm, onContextChange, onSearchTermChange]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
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
        case 'ArrowDown': {
          e.preventDefault();
          const nextIndex = findNextValidItemIndex(highlightedIndex, filteredItems, 'next');
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
        case 'ArrowUp': {
          e.preventDefault();
          const prevIndex = findNextValidItemIndex(highlightedIndex, filteredItems, 'prev');
          if (prevIndex >= 0) {
            setHighlightedIndex(prevIndex);
            
            if (menuRef.current) {
              const targetElement = menuRef.current.querySelector(`[data-index="${prevIndex}"]`) as HTMLElement;
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
  }, [isOpen, highlightedIndex, filteredItems, type]);

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
    } else {
      // Remove any icons that might appear as checks
      if (modifiedItem.slotR1) {
        modifiedItem.slotR1 = null;
      }
      
      // Remove any check icons from slotR2 as well
      if (modifiedItem.slotR2) {
        modifiedItem.slotR2 = null;
        modifiedItem.hasSlotR2 = false;
      }
      
      // Always set hasSlotR1 to true for multi-select to ensure checkbox renders
      modifiedItem.hasSlotR1 = true;
    }
    
    return modifiedItem;
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
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  onSearch?.(e.target.value);
                }}
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
              
              return (
                <MenuItem
                  key={`${item.id || index}`}
                  {...modifiedItem}
                  state={highlightedIndex === index ? MenuItemState.HOVER : item.state}
                  isMultiSelect={type === MenuType.MULTI_SELECT && modifiedItem.type !== MenuItemType.LABEL}
                  isSelected={type === MenuType.MULTI_SELECT ? selectedItems.includes(item.id || '') : false}
                  onClick={() => {
                    if (type === MenuType.MULTI_SELECT) {
                      toggleSelection(item.id);
                    } else {
                      onItemClick?.(item);
                      closeMenu();
                    }
                  }}
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
