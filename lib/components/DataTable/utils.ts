import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { SortDirection } from './types';

export const getDataTableContainerClassNames = (className?: string): string => {
  const theme = themeConfig.euler.dataTable;
  return cn(theme.container, className);
};

export const getDataTableHeaderClassNames = (): string => {
  const theme = themeConfig.euler.dataTable;
  return theme.header.container;
};

export const getDataTableTitleClassNames = (): string => {
  const theme = themeConfig.euler.dataTable;
  return theme.header.title;
};

export const getDataTableDescriptionClassNames = (): string => {
  const theme = themeConfig.euler.dataTable;
  return theme.header.description;
};

export const getDataTableFiltersContainerClassNames = (): string => {
  const theme = themeConfig.euler.dataTable;
  
  return theme.filters.container;
};

export const getTableClassNames = (
  isStriped: boolean,
  isHoverable: boolean,
  className?: string
): string => {
  const theme = themeConfig.euler.dataTable;
  
  return cn(
    theme.table.base,
    isStriped && theme.table.striped,
    isHoverable && theme.table.hoverable,
    className
  );
};

export const getTableHeadClassNames = (): string => {
  const theme = themeConfig.euler.dataTable;
  return theme.thead.base;
};

export const getTableHeaderCellClassNames = (
  isSortable: boolean,
  className?: string
): string => {
  const theme = themeConfig.euler.dataTable;
  
  return cn(
    theme.th.base,
    isSortable && theme.th.sortable,
    className
  );
};

export const getTableBodyClassNames = (): string => {
  const theme = themeConfig.euler.dataTable;
  return theme.tbody;
};

export const getTableRowClassNames = (
  isStriped: boolean,
  isOdd: boolean
): string => {
  const theme = themeConfig.euler.dataTable;
  
  return cn(
    theme.tr.base,
    isStriped && isOdd && theme.tr.striped
  );
};

export const getTableCellClassNames = (className?: string): string => {
  const theme = themeConfig.euler.dataTable;
  return cn(theme.td.base, className);
};

export const getPaginationContainerClassNames = (): string => {
  const theme = themeConfig.euler.dataTable;
  return theme.pagination.container;
};

export const getPaginationTextClassNames = (): string => {
  const theme = themeConfig.euler.dataTable;
  return theme.pagination.text;
};

export const getPaginationButtonClassNames = (isDisabled?: boolean): string => {
  const theme = themeConfig.euler.dataTable;
  
  return cn(
    theme.pagination.button.base,
    isDisabled ? theme.pagination.button.disabled : theme.pagination.button.enabled
  );
};

export const getSortIconClassNames = (direction: SortDirection): string => {
  const theme = themeConfig.euler.dataTable;
  
  return cn(
    theme.sortIcon.base,
    direction !== SortDirection.NONE && theme.sortIcon.active,
    direction === SortDirection.ASCENDING && theme.sortIcon.asc,
    direction === SortDirection.DESCENDING && theme.sortIcon.desc
  );
};

// Client-side filter function
export function filterData<T extends Record<string, any>>(
  data: T[],
  filters: Record<string, any>
): T[] {
  if (!filters || Object.keys(filters).length === 0) {
    return data;
  }

  return data.filter(item => {
    return Object.keys(filters).every(key => {
      const filterValue = filters[key];
      const itemValue = item[key];
      
      // Skip empty filters
      if (!filterValue) return true;
      
      // Array filter values
      if (Array.isArray(filterValue) && filterValue.length > 0) {
        // Empty filter array means no filtering
        if (filterValue.length === 0) return true;
        return filterValue.includes(itemValue);
      }
      
      // String filter (case insensitive)
      if (typeof itemValue === 'string' && typeof filterValue === 'string') {
        return itemValue.toLowerCase().includes(filterValue.toLowerCase());
      }
      
      // Number filter
      if (typeof itemValue === 'number' && typeof filterValue === 'number') {
        return itemValue === filterValue;
      }
      
      // Boolean filter
      if (typeof itemValue === 'boolean') {
        return itemValue === filterValue;
      }
      
      // Date filter
      if (itemValue instanceof Date && filterValue instanceof Date) {
        return itemValue.getTime() === filterValue.getTime();
      }
      
      // Default: equality
      return itemValue === filterValue;
    });
  });
}

// Client-side sort function
export function sortData<T extends Record<string, any>>(
  data: T[],
  sortConfig: { field: keyof T, direction: SortDirection } | null
): T[] {
  if (!sortConfig || sortConfig.direction === SortDirection.NONE) {
    return data;
  }
  
  return [...data].sort((a, b) => {
    const aValue = a[sortConfig.field];
    const bValue = b[sortConfig.field];
    
    // Handle strings
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === SortDirection.ASCENDING
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    // Handle numbers
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === SortDirection.ASCENDING
        ? aValue - bValue
        : bValue - aValue;
    }
    
    if (aValue instanceof Date && bValue instanceof Date) {
      return sortConfig.direction === SortDirection.ASCENDING
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }
    
    // Default: use string comparison
    const strA = String(aValue);
    const strB = String(bValue);
    
    return sortConfig.direction === SortDirection.ASCENDING
      ? strA.localeCompare(strB)
      : strB.localeCompare(strA);
  });
}

// Format functions
export const formatCurrency = (amount: number, currency = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}; 