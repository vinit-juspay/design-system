import { forwardRef, useState, useMemo } from 'react';
import { ChevronDown, ChevronUp} from 'lucide-react';
import { DataTableProps, SortDirection, SortConfig, ColumnDefinition } from './types';
import {
  getDataTableContainerClassNames,
  getDataTableHeaderClassNames,
  getDataTableTitleClassNames,
  getDataTableDescriptionClassNames,
  getTableClassNames,
  getTableHeadClassNames,
  getTableHeaderCellClassNames,
  getTableBodyClassNames,
  getTableRowClassNames,
  getTableCellClassNames,
  getSortIconClassNames,
  filterData,
  sortData,
} from './utils';
import { ColumnManager } from './ColumnManager';
import { DataTableFilters } from './DataTableFilters';
import { DataTablePagination } from './DataTablePagination';

function DataTableComponent<T extends Record<string, any>>(
  {
    data,
    columns: initialColumns,
    idField,
    title,
    description,
    isStriped = false,
    isHoverable = true,
    defaultSort,
    enableFiltering = true,
    enableColumnManager = true,
    showToolbar = true,
    pagination = {
      currentPage: 1,
      pageSize: 10,
      totalRows: 0,
      pageSizeOptions: [10, 20, 50, 100],
    },
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onFilterChange,
    className,
  }: DataTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(defaultSort || null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [visibleColumns, setVisibleColumns] = useState<ColumnDefinition<T>[]>(() => {
    return initialColumns.filter(col => col.isVisible !== false);
  });
  const [currentPage, setCurrentPage] = useState<number>(pagination?.currentPage || 1);
  const [pageSize, setPageSize] = useState<number>(pagination?.pageSize || 10);
  
  const totalRows = pagination?.totalRows || data.length;
  
  const processedData = useMemo(() => {
    let result = [...data];
    
    if (enableFiltering && Object.keys(filters).length > 0) {
      result = filterData(result, filters);
    }
    
    if (sortConfig && sortConfig.field) {
      result = sortData(result, sortConfig);
    }
    
    return result;
  }, [data, filters, sortConfig, enableFiltering]);
  
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return processedData.slice(startIndex, startIndex + pageSize);
  }, [processedData, currentPage, pageSize]);
  
  // Handle sort toggle
  const handleSort = (field: keyof T) => {
    const direction = sortConfig?.field === field
      ? sortConfig.direction === SortDirection.ASCENDING
        ? SortDirection.DESCENDING
        : SortDirection.ASCENDING
      : SortDirection.ASCENDING;
      
    const newSortConfig = { field, direction };
    setSortConfig(newSortConfig);
    
    if (onSortChange) {
      onSortChange(newSortConfig);
    }
  };
  
  // Handle filter change
  const handleFilterChange = (filterValues: Record<string, any>) => {
    setFilters(filterValues);
    setCurrentPage(1);
    
    if (onFilterChange) {
      onFilterChange(filterValues);
    }
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    if (onPageChange) {
      onPageChange(page);
    }
  };
  

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
    
    if (onPageSizeChange) {
      onPageSizeChange(size);
    }
  };
  
  const handleColumnVisibilityChange = (updatedColumns: ColumnDefinition<T>[]) => {
    setVisibleColumns(updatedColumns);
  };
  
  return (
    <div ref={ref} className={getDataTableContainerClassNames(className)}>
      {(title || description || showToolbar) && (
        <div className={getDataTableHeaderClassNames()}>
          <div className="flex flex-col">
            {title && <h2 className={getDataTableTitleClassNames()}>{title}</h2>}
            {description && <p className={getDataTableDescriptionClassNames()}>{description}</p>}
          </div>
          
          {showToolbar && (
            <div className="flex justify-between items-center mt-4">
              {enableFiltering && (
                <DataTableFilters 
                  columns={initialColumns} 
                  filters={filters} 
                  onFilterChange={handleFilterChange}
                />
              )}
              
              {enableColumnManager && (
                <ColumnManager
                  columns={initialColumns}
                  visibleColumns={visibleColumns}
                  onColumnChange={handleColumnVisibilityChange}
                />
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className={getTableClassNames(isStriped, isHoverable)}>
          <thead className={getTableHeadClassNames()}>
            <tr>
              {visibleColumns.map((column) => (
                <th 
                  key={String(column.field)} 
                  className={getTableHeaderCellClassNames(
                    !!column.isSortable,
                    column.className
                  )}
                  style={column.width ? { width: column.width } : undefined}
                  onClick={() => column.isSortable && handleSort(column.field)}
                >
                  <div className="flex items-center justify-between">
                    <span>{column.header}</span>
                    {column.isSortable && (
                      <span className={getSortIconClassNames(
                        sortConfig?.field === column.field ? sortConfig.direction : SortDirection.NONE
                      )}>
                        {sortConfig?.field === column.field && sortConfig.direction === SortDirection.ASCENDING ? (
                          <ChevronUp size={16} />
                        ) : sortConfig?.field === column.field && sortConfig.direction === SortDirection.DESCENDING ? (
                          <ChevronDown size={16} />
                        ) : (
                          <div className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={getTableBodyClassNames()}>
            {currentData.length > 0 ? (
              currentData.map((row, rowIndex) => (
                <tr 
                  key={String(row[idField])} 
                  className={getTableRowClassNames(isStriped, rowIndex % 2 === 1)}
                >
                  {visibleColumns.map((column) => (
                    <td 
                      key={`${row[idField]}-${String(column.field)}`} 
                      className={getTableCellClassNames(column.className)}
                    >
                      {column.renderCell 
                        ? column.renderCell(row[column.field], row)
                        : row[column.field] != null ? String(row[column.field]) : ''}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={visibleColumns.length} 
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <DataTablePagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalRows={totalRows}
          pageSizeOptions={pagination.pageSizeOptions}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}

const DataTable = forwardRef(DataTableComponent) as <T extends Record<string, any>>(
  props: DataTableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

export default DataTable; 