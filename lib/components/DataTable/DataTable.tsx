import { forwardRef, useState, useCallback, useMemo } from "react";
import { 
  DataTableProps, 
  DataTableVariant, 
  DataTableSize, 
  SortDirection,
} from "./types";
import { 
  getDataTableContainerClassNames,
  getDataTableHeaderClassNames,
  getDataTableTitleClassNames,
  getDataTableDescriptionClassNames,
  getDataTableFiltersContainerClassNames,
  getTableClassNames,
  getTableHeadClassNames,
  getTableHeaderCellClassNames,
  getTableBodyClassNames,
  getTableRowClassNames,
  getTableCellClassNames,
  getPaginationContainerClassNames,
  getPaginationTextClassNames,
  getPaginationButtonClassNames,
  getSortIconClassNames
} from "./utils";
import { MenuDropdown } from "../../components/Menu";
import Checkbox from "../../components/Checkbox";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { DropdownType } from "../../components/Menu/types";

const DataTable = forwardRef<HTMLDivElement, DataTableProps<Record<string, unknown>>>(({
  data,
  columns,
  keyField,
  title,
  description,
  size = DataTableSize.MEDIUM,
  variant = DataTableVariant.DEFAULT,
  isStriped = false,
  isHoverable = true,
  pagination,
  filters,
  sortConfig,
  onSortChange,
  onFilterChange,
  className,
}, ref) => {
  // Local state for sort if not controlled externally
  const [localSortConfig, setLocalSortConfig] = useState({
    columnId: "",
    direction: SortDirection.NONE
  });

  // Use either controlled or uncontrolled sort config
  const currentSortConfig = sortConfig || localSortConfig;

  // Handle sort toggle
  const handleSort = useCallback((columnId: string) => {
    const column = columns.find(col => col.id === columnId);
    if (!column?.isSortable) return;

    const newDirection = 
      currentSortConfig.columnId !== columnId ? SortDirection.ASCENDING :
      currentSortConfig.direction === SortDirection.ASCENDING ? SortDirection.DESCENDING :
      currentSortConfig.direction === SortDirection.DESCENDING ? SortDirection.NONE :
      SortDirection.ASCENDING;

    const newSortConfig = {
      columnId: newDirection === SortDirection.NONE ? "" : columnId,
      direction: newDirection
    };

    if (onSortChange) {
      onSortChange(newSortConfig.columnId, newSortConfig.direction);
    } else {
      setLocalSortConfig(newSortConfig);
    }
  }, [columns, currentSortConfig, onSortChange]);

  // Handle filter change
  const handleFilterChange = useCallback((filterId: string, selectedValues: string[]) => {
    if (onFilterChange) {
      onFilterChange(filterId, selectedValues);
    }
  }, [onFilterChange]);

  // Sort data if needed
  const sortedData = useMemo(() => {
    if (currentSortConfig.columnId === "" || currentSortConfig.direction === SortDirection.NONE) {
      return [...data];
    }

    const column = columns.find(col => col.id === currentSortConfig.columnId);
    if (!column) return [...data];

    return [...data].sort((a, b) => {
      const valueA = column.accessor(a);
      const valueB = column.accessor(b);
      
      // For primitive values
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return currentSortConfig.direction === SortDirection.ASCENDING 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      // For numbers
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return currentSortConfig.direction === SortDirection.ASCENDING 
          ? valueA - valueB 
          : valueB - valueA;
      }
      
      // Default to string comparison for complex values
      const strA = String(valueA);
      const strB = String(valueB);
      
      return currentSortConfig.direction === SortDirection.ASCENDING 
        ? strA.localeCompare(strB) 
        : strB.localeCompare(strA);
    });
  }, [data, columns, currentSortConfig]);

  // Apply pagination if configured
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const { currentPage, pageSize } = pagination;
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, pagination]);

  // Calculate pagination details
  const paginationDetails = useMemo(() => {
    if (!pagination) return null;
    
    const { currentPage, pageSize, totalRows } = pagination;
    const startIndex = (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(startIndex + pageSize - 1, totalRows);
    const totalPages = Math.ceil(totalRows / pageSize);
    
    return { startIndex, endIndex, totalPages };
  }, [pagination]);

  // Render sort indicator
  const renderSortIndicator = (columnId: string) => {
    const direction = currentSortConfig.columnId === columnId 
      ? currentSortConfig.direction 
      : SortDirection.NONE;
      
    if (direction === SortDirection.ASCENDING) {
      return <ChevronUp className={getSortIconClassNames(direction)} aria-hidden="true" />;
    } else if (direction === SortDirection.DESCENDING) {
      return <ChevronDown className={getSortIconClassNames(direction)} aria-hidden="true" />;
    } else {
      return <ChevronDown className={getSortIconClassNames(direction)} aria-hidden="true" />;
    }
  };

  return (
    <div ref={ref} className={getDataTableContainerClassNames(className)}>
      {/* Header section with title, description and filters */}
      {(title || description || (filters && filters.length > 0)) && (
        <div className={getDataTableHeaderClassNames()}>
          <div>
            {title && <h3 className={getDataTableTitleClassNames()}>{title}</h3>}
            {description && <p className={getDataTableDescriptionClassNames()}>{description}</p>}
          </div>
          
          {filters && filters.length > 0 && (
            <div className={getDataTableFiltersContainerClassNames()}>
              {filters.map(filter => (
                <MenuDropdown
                  key={filter.id}
                  label={filter.label}
                  type={filter.isMultiSelect ? DropdownType.MULTI_SELECT : DropdownType.SINGLE_SELECT}
                  menuItems={filter.options.map(option => ({
                    id: option.id,
                    label: option.label,
                    value: option.id
                  }))}
                  selectedOption={filter.selectedValues || []}
                  onSelect={(items) => {
                    const values = items.map(item => item.id || '');
                    handleFilterChange(filter.id, values);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className={getTableClassNames(variant, size, isStriped, isHoverable)}>
          <thead className={getTableHeadClassNames(variant)}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={getTableHeaderCellClassNames(
                    variant, 
                    size, 
                    !!column.isSortable,
                    column.className
                  )}
                  style={column.width ? { width: column.width } : undefined}
                  onClick={() => column.isSortable && handleSort(column.id)}
                  role={column.isSortable ? "button" : undefined}
                  tabIndex={column.isSortable ? 0 : undefined}
                  aria-sort={
                    currentSortConfig.columnId === column.id
                      ? currentSortConfig.direction === SortDirection.ASCENDING
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                >
                  <div className="flex items-center justify-between">
                    <span>{column.header}</span>
                    {column.isSortable && renderSortIndicator(column.id)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={getTableBodyClassNames()}>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr 
                  key={String(row[keyField])} 
                  className={getTableRowClassNames(variant, isStriped, rowIndex % 2 === 1)}
                >
                  {columns.map((column) => (
                    <td 
                      key={`${String(row[keyField])}-${column.id}`} 
                      className={getTableCellClassNames(variant, size, column.className)}
                    >
                      {column.isCheckbox ? (
                        <Checkbox
                          id={`checkbox-${String(row[keyField])}-${column.id}`}
                          value={String(row[keyField])}
                          isChecked={Boolean(column.accessor(row))}
                        />
                      ) : (
                        column.accessor(row)
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {pagination && paginationDetails && (
        <div className={getPaginationContainerClassNames()}>
          <div className={getPaginationTextClassNames()}>
            Rows per page:
            <MenuDropdown
              label={String(pagination.pageSize)}
              menuItems={(pagination.pageSizeOptions || [10, 25, 50, 100]).map(size => ({
                id: String(size),
                label: String(size),
                value: String(size)
              }))}
              selectedOption={[String(pagination.pageSize)]}
              onSelect={(items) => {
                if (items.length > 0) {
                  const size = Number(items[0].value);
                  if (!isNaN(size)) {
                    pagination.onPageSizeChange(size);
                  }
                }
              }}
            />
          </div>

          <div className={getPaginationTextClassNames()}>
            {`${paginationDetails.startIndex}-${paginationDetails.endIndex} of ${pagination.totalRows}`}
          </div>

          <div className="flex items-center space-x-2">
            <button
              className={getPaginationButtonClassNames(pagination.currentPage <= 1)}
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              className={getPaginationButtonClassNames(pagination.currentPage >= paginationDetails.totalPages)}
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= paginationDetails.totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

DataTable.displayName = "DataTable";

export default DataTable; 