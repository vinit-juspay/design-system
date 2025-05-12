import { useState } from 'react';
import DataTable from '../../../lib/components/DataTable/DataTable';
import { 
  DataTableVariant, 
  DataTableSize, 
  SortDirection,
  ColumnDefinition,
  Filter
} from '../../../lib/components/DataTable/types';

const DataTableDemo = () => {
  // Sample data
  const data = [
    { 
      id: 1, 
      name: 'Jesse Leos', 
      joinDate: 'August 2014', 
      number: '342', 
      gateway: 'Gateway A', 
      contact: 'Samantha Smith', 
      status: 'Active' 
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      joinDate: 'September 2015', 
      number: '567', 
      gateway: 'Gateway B', 
      contact: 'John Doe', 
      status: 'Inactive' 
    },
    { 
      id: 3, 
      name: 'Robert Johnson', 
      joinDate: 'March 2016', 
      number: '789', 
      gateway: 'Gateway A', 
      contact: 'Emily White', 
      status: 'Active' 
    },
    { 
      id: 4, 
      name: 'Lisa Brown', 
      joinDate: 'November 2017', 
      number: '234', 
      gateway: 'Gateway C', 
      contact: 'Michael Green', 
      status: 'Inactive' 
    },
    { 
      id: 5, 
      name: 'David Miller', 
      joinDate: 'July 2018', 
      number: '456', 
      gateway: 'Gateway B', 
      contact: 'Sarah Johnson', 
      status: 'Active' 
    }
  ];

  // Column definitions
  const columns: ColumnDefinition<Record<string, unknown>>[] = [
    { 
      id: 'name', 
      header: 'Name', 
      accessor: (row) => (
        <div className="flex items-center">
          <img 
            src="/api/placeholder/40/40" 
            alt="Profile" 
            className="w-10 h-10 rounded-full mr-3" 
          />
          <div>
            <div className="font-medium text-sm">{row.name as string}</div>
            <div className="text-xs text-gray-500">Joined in {row.joinDate as string}</div>
          </div>
        </div>
      ),
      isSortable: true,
      width: '250px'
    },
    { 
      id: 'number', 
      header: 'Number', 
      accessor: (row) => row.number as string,
      isSortable: true
    },
    { 
      id: 'gateway', 
      header: 'Gateway', 
      accessor: (row) => row.gateway as string,
      isSortable: true
    },
    { 
      id: 'contact', 
      header: 'Contact', 
      accessor: (row) => row.contact as string
    },
    {
      id: 'status',
      header: 'Status',
      accessor: (row) => (
        <span className={`px-2 py-1 rounded text-xs ${
          (row.status as string) === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.status as string}
        </span>
      ),
      isSortable: true
    },
    {
      id: 'actions',
      header: 'Actions',
      accessor: (row) => (
        <button 
          className="text-blue-500 hover:bg-blue-50 px-2 py-1 rounded text-sm"
          onClick={() => console.log(`Send message to ${row.name as string}`)}
        >
          Send Message
        </button>
      )
    }
  ];

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    columnId: '',
    direction: SortDirection.NONE
  });
  
  // State for filters
  const [filters, setFilters] = useState<Record<string, string[]>>({
    gateway: []
  });
  
  // Filter options
  const filterOptions: Filter[] = [
    {
      id: 'gateway',
      label: 'Gateway',
      options: [
        { id: 'Gateway A', label: 'Gateway A' },
        { id: 'Gateway B', label: 'Gateway B' },
        { id: 'Gateway C', label: 'Gateway C' }
      ],
      selectedValues: filters.gateway,
      isMultiSelect: true
    }
  ];

  return (
    <div className="p-4">
      <DataTable
        data={data}
        columns={columns}
        keyField="id"
        title="User Insights"
        description="Overview of all users and their activity"
        size={DataTableSize.MEDIUM}
        variant={DataTableVariant.DEFAULT}
        isStriped
        isHoverable
        pagination={{
          currentPage,
          pageSize,
          totalRows: data.length,
          pageSizeOptions: [5, 10, 25, 50],
          onPageChange: setCurrentPage,
          onPageSizeChange: setPageSize
        }}
        filters={filterOptions}
        sortConfig={sortConfig}
        onSortChange={(columnId, direction) => setSortConfig({ columnId, direction })}
        onFilterChange={(filterId, selectedValues) => {
          setFilters(prev => ({
            ...prev,
            [filterId]: selectedValues
          }));
        }}
      />
    </div>
  );
};

export default DataTableDemo;