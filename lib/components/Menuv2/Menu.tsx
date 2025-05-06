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
  ...props
}, ref) => {
  // State
  const [selectedItems, setSelectedItems] = useState<string[]>(controlledSelectedItems || []);
  const [searchTerm, setSearchTerm] = useState('');
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
          const itemCount = filteredItems.filter(item => item.type !== MenuItemType.SEPARATOR).length;
          if (itemCount === 0) return;
          
          let nextIndex = highlightedIndex + 1;
          // Skip separators and labels
          while (
            nextIndex < filteredItems.length && 
            (filteredItems[nextIndex].type === MenuItemType.SEPARATOR || 
             filteredItems[nextIndex].type === MenuItemType.LABEL)
          ) {
            nextIndex++;
          }
          
          if (nextIndex >= filteredItems.length) {
            nextIndex = 0;
          }
          
          setHighlightedIndex(nextIndex);
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          const itemCount = filteredItems.filter(item => item.type !== MenuItemType.SEPARATOR).length;
          if (itemCount === 0) return;
          
          let prevIndex = highlightedIndex - 1;
          // Skip separators and labels
          while (
            prevIndex >= 0 && 
            (filteredItems[prevIndex].type === MenuItemType.SEPARATOR || 
             filteredItems[prevIndex].type === MenuItemType.LABEL)
          ) {
            prevIndex--;
          }
          
          if (prevIndex < 0) {
            prevIndex = filteredItems.length - 1;
            // Skip separators and labels from the end
            while (
              prevIndex >= 0 && 
              (filteredItems[prevIndex].type === MenuItemType.SEPARATOR || 
               filteredItems[prevIndex].type === MenuItemType.LABEL)
            ) {
              prevIndex--;
            }
          }
          
          setHighlightedIndex(prevIndex);
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < filteredItems.length) {
            const item = filteredItems[highlightedIndex];
            if (item.type !== MenuItemType.SEPARATOR && item.type !== MenuItemType.LABEL) {
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
                <Search size={16} className="text-gray-400" />
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
              // For multi-select menu, remove any check icons in slotR1 if they exist
              const modifiedItem = {...item};
              if (type === MenuType.MULTI_SELECT) {
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
              }
              
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