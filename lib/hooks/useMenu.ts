import { useState, useEffect, useRef, RefObject } from 'react';
import { 
  MenuType, 
  MenuItemProps, 
  MenuContextValue 
} from '../components/Menuv2/types';
import { 
  filterMenuItems, 
  handleKeyboardNavigation, 
  toggleItemSelection 
} from '../components/Menuv2/utils';
import { useContext } from 'react';
import { MenuContext } from '../components/Menuv2/context';

/**
 * Hook for accessing menu context
 */
export const useMenu = (): MenuContextValue => {
  const context = useContext(MenuContext);
  
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  
  return context;
};

/**
 * Hook for managing menu search functionality
 */
export const useMenuSearch = (
  items: MenuItemProps[],
  controlledSearchTerm?: string,
  onSearch?: (searchTerm: string) => void,
  onSearchTermChange?: (searchTerm: string) => void
) => {
  const [searchTerm, setSearchTerm] = useState(
    controlledSearchTerm !== undefined ? controlledSearchTerm : ''
  );
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Reset highlighted index when search term changes
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  // Filter menu items based on search term
  const filteredItems = filterMenuItems(items, searchTerm);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
    onSearchTermChange?.(value);
    
    // Reset highlighted index when search term changes
    setHighlightedIndex(-1);
  };
  
  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
    highlightedIndex,
    setHighlightedIndex,
    handleSearchChange,
    searchInputRef
  };
};

/**
 * Hook for managing menu keyboard navigation
 */
export const useMenuKeyboardNavigation = (
  isOpen: boolean,
  highlightedIndex: number,
  filteredItems: MenuItemProps[],
  setHighlightedIndex: (index: number) => void,
  onItemClick?: (item: MenuItemProps) => void,
  toggleSelection?: (itemId?: string) => void,
  closeMenu?: () => void,
  type?: MenuType,
  menuRef?: React.RefObject<HTMLDivElement>,
  hasSearch?: boolean,
  searchInputRef?: RefObject<HTMLInputElement>
) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyboardNavigation(
        e, 
        highlightedIndex, 
        filteredItems, 
        setHighlightedIndex,
        onItemClick,
        toggleSelection,
        closeMenu,
        type,
        menuRef
      );
    };

    // Focus on search input if available, otherwise on the menu
    if (hasSearch && searchInputRef?.current) {
      searchInputRef.current.focus();
    } else if (menuRef?.current) {
      menuRef.current.focus();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, highlightedIndex, filteredItems, type, onItemClick, 
      closeMenu, toggleSelection, setHighlightedIndex, menuRef, 
      hasSearch, searchInputRef]);
};

/**
 * Hook for managing menu selection
 */
export const useMenuSelection = (
  controlledSelectedItems: string[] | undefined,
  onSelectionChange?: (selectedItems: string[]) => void
) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    controlledSelectedItems !== undefined ? controlledSelectedItems : []
  );
  
  // Update selectedItems when controlledSelectedItems changes
  useEffect(() => {
    if (controlledSelectedItems !== undefined) {
      setSelectedItems(controlledSelectedItems);
    }
  }, [controlledSelectedItems]);
  
  // Handle item selection
  const handleToggleSelection = (itemId?: string) => {
    toggleItemSelection(itemId, selectedItems, setSelectedItems, onSelectionChange);
  };
  
  return {
    selectedItems,
    setSelectedItems,
    toggleSelection: handleToggleSelection
  };
}; 