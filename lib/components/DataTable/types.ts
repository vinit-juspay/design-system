import { ReactNode } from "react";

export enum SortDirection {
  ASCENDING = "asc",
  DESCENDING = "desc",
  NONE = "none",
}

export interface ColumnDefinition<T> {
  /** Field key in data object */
  field: keyof T;
  /** Header text to display */
  header: string;
  renderCell?: (value: any, row: T) => ReactNode;
  /** Whether column is sortable */
  isSortable?: boolean;
  /** Whether column is initially visible */
  isVisible?: boolean;
  /** Whether column can be hidden by user */
  canHide?: boolean;
  /** Custom classes to apply to the column */
  className?: string;
  /** Width of the column */
  width?: string;
}

export interface FilterOption {
  /** Unique identifier for the filter option */
  id: string;
  /** Display label for the filter */
  label: string;
  /** Optional nested options */
  options?: FilterOption[];
}

export interface Filter {
  /** Unique identifier for the filter */
  id: string;
  /** Display label for the filter */
  label: string;
  /** Filter options */
  options: FilterOption[];
  /** Currently selected value(s) */
  selectedValues?: string[];
  /** Whether multiple selections are allowed */
  isMultiSelect?: boolean;
}

export interface SortConfig {
  field: string;
  direction: SortDirection;
}

export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  totalRows: number;
  pageSizeOptions: number[];
}

export interface DataTableProps<T extends Record<string, any>> {
  /** Data array from backend */
  data: T[];
  /** Data summary information */
  summary?: {
    count: number;
    sum?: number;
    totalCount: number;
    [key: string]: any;
  };
  /** Column definitions */
  columns: ColumnDefinition<T>[];
  /** Unique identifier field */
  idField: keyof T;
  /** Optional table title */
  title?: string;
  /** Optional description */
  description?: string;
  /** Whether table rows should be striped */
  isStriped?: boolean;
  /** Whether rows should highlight on hover */
  isHoverable?: boolean;
  /** Initial sort configuration */
  defaultSort?: SortConfig;
  /** Whether to use client-side filtering */
  enableFiltering?: boolean;
  /** Whether to enable column management */
  enableColumnManager?: boolean;
  /** Whether to show the table toolbar */
  showToolbar?: boolean;
  /** Pagination configuration */
  pagination?: PaginationConfig;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
  /** Callback when sorting changes */
  onSortChange?: (sortConfig: SortConfig) => void;
  /** Callback when filters change */
  onFilterChange?: (filters: Record<string, any>) => void;
  /** Optional additional class name */
  className?: string;
} 