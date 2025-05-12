import { ReactNode } from "react";

export enum DataTableVariant {
  DEFAULT = "default",
  COMPACT = "compact",
  BORDERED = "bordered",
}

export enum DataTableSize {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
}

export enum SortDirection {
  ASCENDING = "asc",
  DESCENDING = "desc",
  NONE = "none",
}

export interface ColumnDefinition<T> {
  /** Unique identifier for the column */
  id: string;
  /** Header text to display */
  header: string;
  /** Function to access the cell value */
  accessor: (row: T) => ReactNode;
  /** Whether column is sortable */
  isSortable?: boolean;
  /** Whether to render a checkbox for this column */
  isCheckbox?: boolean;
  /** Custom classes to apply to the column */
  className?: string;
  /** Width of the column - can be px, %, or any CSS width value */
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

export interface PaginationOptions {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Number of rows per page */
  pageSize: number;
  /** Total number of rows */
  totalRows: number;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Callback when page size changes */
  onPageSizeChange: (pageSize: number) => void;
}

export interface DataTableProps<T> {
  /** Data to display in the table */
  data: T[];
  /** Column definitions */
  columns: ColumnDefinition<T>[];
  /** Unique key field in the data */
  keyField: keyof T;
  /** Optional table title */
  title?: string;
  /** Optional description text */
  description?: string;
  /** Table size variant */
  size?: DataTableSize;
  /** Table display variant */
  variant?: DataTableVariant;
  /** Whether to show striped rows */
  isStriped?: boolean;
  /** Whether to highlight rows on hover */
  isHoverable?: boolean;
  /** Optional pagination configuration */
  pagination?: PaginationOptions;
  /** Optional filter configuration */
  filters?: Filter[];
  /** Current sort configuration */
  sortConfig?: {
    columnId: string;
    direction: SortDirection;
  };
  /** Callback when sort changes */
  onSortChange?: (columnId: string, direction: SortDirection) => void;
  /** Callback when filters change */
  onFilterChange?: (filterId: string, selectedValues: string[]) => void;
  /** Optional additional class name */
  className?: string;
} 