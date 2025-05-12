import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { DataTableSize, DataTableVariant, SortDirection } from './types';

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
  variant: DataTableVariant,
  size: DataTableSize,
  isStriped: boolean,
  isHoverable: boolean,
  className?: string
): string => {
  const theme = themeConfig.euler.dataTable;
  
  return cn(
    theme.table.base,
    theme.table.variant[variant],
    theme.table.size[size],
    isStriped && theme.table.striped,
    isHoverable && theme.table.hoverable,
    className
  );
};

export const getTableHeadClassNames = (variant: DataTableVariant): string => {
  const theme = themeConfig.euler.dataTable;
  
  return cn(theme.thead.base, theme.thead.variant[variant]);
};

export const getTableHeaderCellClassNames = (
  variant: DataTableVariant,
  size: DataTableSize,
  isSortable: boolean,
  className?: string
): string => {
  const theme = themeConfig.euler.dataTable;
  
  return cn(
    theme.th.base,
    theme.th.variant[variant],
    theme.th.size[size],
    isSortable && theme.th.sortable,
    className
  );
};

export const getTableBodyClassNames = (): string => {
  const theme = themeConfig.euler.dataTable;
  
  return theme.tbody;
};

export const getTableRowClassNames = (
  variant: DataTableVariant,
  isStriped: boolean,
  isOdd: boolean
): string => {
  const theme = themeConfig.euler.dataTable;
  
  return cn(
    theme.tr.base,
    theme.tr.variant[variant],
    isStriped && isOdd && theme.tr.striped
  );
};

export const getTableCellClassNames = (
  variant: DataTableVariant,
  size: DataTableSize,
  className?: string
): string => {
  const theme = themeConfig.euler.dataTable;
  
  return cn(
    theme.td.base,
    theme.td.variant[variant],
    theme.td.size[size],
    className
  );
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