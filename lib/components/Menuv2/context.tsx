import { createContext } from 'react';
import { MenuContextValue } from './types';

// Create context for menu state
export const MenuContext = createContext<MenuContextValue>({
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