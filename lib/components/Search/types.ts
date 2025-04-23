

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