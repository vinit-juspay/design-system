import { forwardRef, useState, useEffect, useMemo } from 'react';
import { 
  ChevronDown, ChevronUp, Settings, Download 
} from 'lucide-react';
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
  getTableCellClassNames,
  getSortIconClassNames,
  filterData,
  sortData,
} from './utils';
import { DataTableFilters } from './DataTableFilters';
import { DataTablePagination } from './DataTablePagination';
import Button from '../Button/Button';
import { ButtonType } from '../Button/types';
import { MenuDropdown } from '../Menu';
import { DropdownType, DropdownSubType, MenuItemType } from '../Menu/types';

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
  
  // Track selected rows
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [selectAll, setSelectAll] = useState(false);
  
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
  
  // Reset selection when data changes
  useEffect(() => {
    setSelectedRows({});
    setSelectAll(false);
  }, [data]);
  
  // Handle select all
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    const newSelectedRows = { ...selectedRows };
    currentData.forEach(row => {
      newSelectedRows[row[idField]] = newSelectAll;
    });
    setSelectedRows(newSelectedRows);
  };
  
  // Handle individual row selection
  const handleRowSelect = (rowId: string) => {
    const newSelectedRows = { 
      ...selectedRows, 
      [rowId]: !selectedRows[rowId] 
    };
    setSelectedRows(newSelectedRows);
    
    // Check if all rows are selected
    const allSelected = currentData.every(row => newSelectedRows[row[idField]]);
    setSelectAll(allSelected);
  };
  
  // Export selected rows to CSV
  const exportToCSV = () => {
    const selectedData = processedData.filter(row => selectedRows[row[idField]]);
    
    if (selectedData.length === 0) {
      alert('Please select at least one row to export');
      return;
    }
    
    // Create CSV headers
    const headers = visibleColumns.map(col => col.header);
    const fields = visibleColumns.map(col => col.field);
    
    // Create CSV content
    let csvContent = headers.join(',') + '\n';
    selectedData.forEach(row => {
      const rowData = fields.map(field => {
        const value = row[field];
        // Handle comma in values by wrapping in quotes
        return value != null ? `"${String(value).replace(/"/g, '""')}"` : '';
      });
      csvContent += rowData.join(',') + '\n';
    });
    
    // Create and download blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `export-${new Date().toISOString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleSort = (field: keyof T) => {
    const direction = sortConfig?.field === field
      ? sortConfig.direction === SortDirection.ASCENDING
        ? SortDirection.DESCENDING
        : SortDirection.ASCENDING
      : SortDirection.ASCENDING;
      
    const newSortConfig = { field: field.toString(), direction };
    setSortConfig(newSortConfig);
    
    if (onSortChange) {
      onSortChange(newSortConfig);
    }
  };
  
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
  
  // Create column manager menu items
  const getColumnMenuItems = () => {
    return initialColumns.filter(col => col.canHide !== false).map(column => ({
      id: String(column.field),
      text: column.header,
      type: MenuItemType.MULTI_SELECT,
      isSelected: visibleColumns.some(col => col.field === column.field),
      onClick: () => {
        // Toggle column visibility
        const isCurrentlyVisible = visibleColumns.some(col => col.field === column.field);
        let updatedColumns;
        
        if (isCurrentlyVisible) {
          updatedColumns = visibleColumns.filter(col => col.field !== column.field);
        } else {
          // Find the original column to add it back
          const columnToAdd = initialColumns.find(col => col.field === column.field);
          if (columnToAdd) {
            updatedColumns = [...visibleColumns, columnToAdd];
          } else {
            return;
          }
        }
        
        handleColumnVisibilityChange(updatedColumns);
      }
    }));
  };
  
  const hasSelectedRows = Object.values(selectedRows).some(selected => selected);
  
  return (
    <div ref={ref} className={getDataTableContainerClassNames(className)}>
      {(title || description || showToolbar) && (
        <div className={getDataTableHeaderClassNames()}>
          <div className="flex flex-col">
            {title && <h2 className={getDataTableTitleClassNames()}>{title}</h2>}
            {description && <p className={getDataTableDescriptionClassNames()}>{description}</p>}
          </div>
          
          {showToolbar && (
            <div className="flex justify-between items-center mt-4 gap-2">
              {enableFiltering && (
                <DataTableFilters 
                  columns={initialColumns} 
                  filters={filters} 
                  onFilterChange={handleFilterChange}
                />
              )}
              
              {hasSelectedRows && (
                <Button
                  buttonType={ButtonType.SECONDARY}
                  leadingIcon={Download}                  
                  onClick={exportToCSV}
                >
                  Export
                </Button>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className={getTableClassNames(isStriped, isHoverable)}>
          <thead className={getTableHeadClassNames()}>
            <tr>
              <th className={getTableHeaderCellClassNames(false)}>
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
              </th>
              
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
              
              {enableColumnManager && (
                <th className={getTableHeaderCellClassNames(false, "w-10")}>
                  <div className="flex items-center justify-center">
                    <MenuDropdown
                      id="column-manager"
                      type={DropdownType.ICON_ONLY}
                      subType={DropdownSubType.NO_CONTAINER}
                      menuItems={getColumnMenuItems()}
                      leftIcon={<Settings size={16} />}
                    />
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody className={getTableBodyClassNames()}>
            {currentData.length > 0 ? (
              currentData.map((row) => (
                <tr 
                  key={String(row[idField])} 
                >
                  <td className={getTableCellClassNames()}>
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={!!selectedRows[row[idField]]}
                        onChange={() => handleRowSelect(row[idField])}
                        className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                  </td>
                  
                  {/* Data cells */}
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
                  
                  {enableColumnManager && <td className={getTableCellClassNames()}></td>}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={visibleColumns.length + (enableColumnManager ? 2 : 1)} 
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

DataTable.displayName = "DataTable";

export default DataTable; 