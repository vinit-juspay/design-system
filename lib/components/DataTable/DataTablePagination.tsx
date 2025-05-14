import { useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '../../utils';
import {
  getPaginationContainerClassNames,
  getPaginationButtonClassNames,
} from './utils';
import { MenuDropdown } from '../Menu';
import { DropdownType, DropdownSubType, MenuItemType } from '../Menu/types';

interface DataTablePaginationProps {
  currentPage: number;
  pageSize: number;
  totalRows: number;
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function DataTablePagination({
  currentPage,
  pageSize,
  totalRows,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  
  const pageSizeMenuItems = useMemo(() => {
    return pageSizeOptions.map(size => ({
      id: size.toString(),
      text: size.toString(),
      type: MenuItemType.DEFAULT,
      isSelected: size === pageSize,
    }));
  }, [pageSizeOptions, pageSize]);
  

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      }
      
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }
      
      if (startPage > 2) {
        pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };
  
  const pageNumbers = useMemo(getPageNumbers, [currentPage, totalPages]);
  
  const handlePageSizeChange = (value: any) => {
    
    if (typeof value === 'object' && value !== null) {
      const sizeStr = value.id || value.text || '';
      
      const newSize = parseInt(sizeStr, 10);
      if (!isNaN(newSize)) {
        onPageSizeChange(newSize);
      }
    } 
    else if (typeof value === 'string') {
      const newSize = parseInt(value, 10);
      if (!isNaN(newSize)) {
        onPageSizeChange(newSize);
      }
    }
  };
  
  return (
    <div className={getPaginationContainerClassNames()}>
      <div className="flex items-center">
        <span className="text-body-md font-500 text-gray-600">Rows per page:</span>
        <MenuDropdown
          id="page-size-dropdown"
          type={DropdownType.SINGLE_SELECT}
          subType={DropdownSubType.NO_CONTAINER}
          menuItems={pageSizeMenuItems}
          selectedOption={pageSize.toString()}
          placeholder={pageSize.toString()}
          onSelect={handlePageSizeChange}
          leftIcon={pageSize.toString()}
        />
      </div>
      
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={getPaginationButtonClassNames(currentPage === 1)}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ArrowLeft size={16} />
        </button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => 
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={cn(
                  "min-w-[32px] h-8 px-2 rounded-lg flex items-center justify-center text-body-sm",
                  currentPage === page ? "bg-gray-100 text-gray-700 font-medium" : "text-gray-500 hover:bg-gray-50"
                )}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="text-gray-500 px-1">
                {page}
              </span>
            )
          )}
        </div>
        
        <button
          type="button"
          className={getPaginationButtonClassNames(currentPage === totalPages)}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
} 