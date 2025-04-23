import * as React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { themeConfig } from '../../themeConfig';
import { SearchProps } from './types';

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
const Search = React.forwardRef<
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