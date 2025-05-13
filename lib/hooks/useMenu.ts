import { useState, useEffect, useRef, RefObject, useCallback } from 'react';
import { MenuType, MenuItemProps, MenuContextValue } from '../components/Menu/types';
import { filterMenuItems, handleKeyboardNavigation } from '../components/Menu/utils';
import { useContext } from 'react';
import { MenuContext } from '../components/Menu/context';

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
    searchInputRef,
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
  }, [
    isOpen,
    highlightedIndex,
    filteredItems,
    type,
    onItemClick,
    closeMenu,
    toggleSelection,
    setHighlightedIndex,
    menuRef,
    hasSearch,
    searchInputRef,
  ]);
};

/**
 * Hook for managing menu selection
 */
export const useMenuSelection = (
  controlledSelectedItems: string[] | undefined,
  onSelectionChange?: (selectedItems: string[]) => void
) => {
  // Track selected items internally
  const [selectedItems, setSelectedItems] = useState<string[]>(
    controlledSelectedItems !== undefined ? controlledSelectedItems : []
  );

  // Use a ref to track previous selection to prevent unnecessary updates
  const prevSelectionRef = useRef<string[]>(selectedItems);

  // When controlledSelectedItems changes, update internal state
  useEffect(() => {
    if (controlledSelectedItems !== undefined) {
      // Sort arrays to ensure consistent comparison
      const sortedControlled = [...controlledSelectedItems].sort();
      const sortedCurrent = [...prevSelectionRef.current].sort();

      // Compare stringified versions to check equality
      if (JSON.stringify(sortedControlled) !== JSON.stringify(sortedCurrent)) {
        setSelectedItems(controlledSelectedItems);
        prevSelectionRef.current = controlledSelectedItems;
      }
    }
  }, [controlledSelectedItems]);

  // Handle item selection - memoized to prevent unnecessary re-renders
  const handleToggleSelection = useCallback(
    (itemId?: string) => {
      if (!itemId) return;

      setSelectedItems(prev => {
        let newSelectedItems: string[];

        if (prev.includes(itemId)) {
          newSelectedItems = prev.filter(id => id !== itemId);
        } else {
          newSelectedItems = [...prev, itemId];
        }

        // Only trigger the callback if there was a real change
        const sortedNew = [...newSelectedItems].sort();
        const sortedPrev = [...prevSelectionRef.current].sort();

        if (JSON.stringify(sortedNew) !== JSON.stringify(sortedPrev)) {
          prevSelectionRef.current = newSelectedItems;
          onSelectionChange?.(newSelectedItems);
        }

        return newSelectedItems;
      });
    },
    [onSelectionChange]
  );

  // Memoized function to set selected items directly
  const setSelectedItemsMemoized = useCallback(
    (items: string[]) => {
      const sortedItems = [...items].sort();
      const sortedPrev = [...prevSelectionRef.current].sort();

      if (JSON.stringify(sortedItems) !== JSON.stringify(sortedPrev)) {
        setSelectedItems(items);
        prevSelectionRef.current = items;
        onSelectionChange?.(items);
      }
    },
    [onSelectionChange]
  );

  return {
    selectedItems,
    setSelectedItems: setSelectedItemsMemoized,
    toggleSelection: handleToggleSelection,
  };
};
