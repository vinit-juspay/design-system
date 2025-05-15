import { useState, useRef } from 'react';
import { Filter, Search } from 'lucide-react';
import { cn } from '../../utils';

interface DataTableFiltersProps<T> {
  columns: Array<{
    field: keyof T;
    header: string;
  }>;
  filters: Record<string, any>;
  onFilterChange: (filters: Record<string, any>) => void;
}

export function DataTableFilters<T>({ 
  columns, 
  filters, 
  onFilterChange 
}: DataTableFiltersProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const filtersRef = useRef<HTMLDivElement>(null);
  
  const handleSearch = () => {
    if (searchTerm.trim()) {
      const searchFields = columns.map(col => col.field);
      const newFilters = { ...filters, search: { term: searchTerm, fields: searchFields } };
      onFilterChange(newFilters);
    } else {
      const { search, ...restFilters } = filters;
      onFilterChange(restFilters);
    }
    setIsOpen(false);
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    onFilterChange({});
    setIsOpen(false);
  };
  
  const activeFilterCount = Object.keys(filters).length;
  
  return (
    <div className="relative" ref={filtersRef}>
      <button
        type="button"
        className={cn(
          "flex items-center gap-1 px-3 py-1.5 text-jp-body-sm border rounded-jp-md border-jp-gray-200 hover:bg-jp-gray-50",
          activeFilterCount > 0 && "border-jp-primary-300 bg-jp-primary-50 text-jp-primary-700"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Filters"
      >
        <Filter size={16} />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="ml-1 bg-jp-primary-100 text-jp-primary-800 text-xs font-jp-500 px-2 py-0.5 rounded-jp-full">
            {activeFilterCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 w-80 origin-top-left rounded-md bg-jp-gray-0 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 divide-y divide-jp-gray-100">
            <div className="px-3 py-2 font-medium text-sm text-jp-gray-700">
              Filters
            </div>
            
            <div className="p-3">
              <label className="block text-sm font-medium text-jp-gray-700 mb-1">
                Search across all columns
              </label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-jp-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-jp-gray-300 rounded-md text-sm focus:outline-none focus:ring-jp-primary-500 focus:border-jp-primary-500"
                    placeholder="Search..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearch();
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSearch}
                  className="px-3 py-2 bg-jp-primary-600 text-jp-gray-0 rounded-md text-sm hover:bg-jp-primary-700"
                >
                  Apply
                </button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="px-3 py-2 flex justify-between">
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-jp-gray-600 hover:text-jp-gray-800"
              >
                Clear filters
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-sm text-jp-primary-600 hover:text-jp-primary-800"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 