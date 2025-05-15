import { useState, useRef } from 'react';
import { Plus, Check } from 'lucide-react';
import { cn } from '../../utils';

interface ColumnManagerProps<T> {
  columns: Array<{
    field: keyof T;
    header: string;
    isVisible?: boolean;
    canHide?: boolean;
  }>;
  visibleColumns: Array<{
    field: keyof T;
    header: string;
  }>;
  onColumnChange: (columns: Array<any>) => void;
}

export function ColumnManager<T>({ columns, visibleColumns, onColumnChange }: ColumnManagerProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const toggleColumnVisibility = (field: keyof T) => {
    const isCurrentlyVisible = visibleColumns.some(col => col.field === field);
    
    if (isCurrentlyVisible) {
      // Don't allow hiding all columns - at least one must remain visible
      if (visibleColumns.length <= 1) return;
      
      // Remove column from visible list
      const newVisibleColumns = visibleColumns.filter(col => col.field !== field);
      onColumnChange(newVisibleColumns);
    } else {
      // Add column to visible list
      const columnToAdd = columns.find(col => col.field === field);
      if (columnToAdd) {
        onColumnChange([...visibleColumns, columnToAdd]);
      }
    }
  };
  
  // Find columns that can be shown/hidden
  const managableColumns = columns.filter(col => col.canHide !== false);
  
  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-md border-jp-gray-200 hover:bg-jp-gray-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Manage columns"
      >
        <Plus size={16} />
        <span>Columns</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 divide-y divide-jp-gray-100">
            <div className="px-3 py-2 font-medium text-sm text-jp-gray-700">
              Manage Columns
            </div>
            <div className="max-h-60 overflow-y-auto py-1">
              {managableColumns.map(column => {
                const isVisible = visibleColumns.some(col => col.field === column.field);
                return (
                  <div
                    key={String(column.field)}
                    className={cn(
                      "px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-jp-gray-50",
                      isVisible ? "text-jp-gray-700" : "text-jp-gray-500"
                    )}
                    onClick={() => toggleColumnVisibility(column.field)}
                  >
                    <span className="text-sm">{column.header}</span>
                    {isVisible && <Check size={16} className="text-jp-primary-600" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 