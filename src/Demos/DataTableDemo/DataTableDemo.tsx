import { useState } from 'react';
import DataTable from '../../../lib/components/DataTable/DataTable';
import { 
  SortDirection,
  ColumnDefinition 
} from '../../../lib/components/DataTable/types';
import { Avatar } from '../../../lib/main';

const DataTableDemo = () => {
  const data = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: [
      'Jesse Leos', 'Jane Smith', 'Robert Johnson', 'Lisa Brown', 'David Miller',
      'Emma Wilson', 'Michael Clark', 'Sarah Davis', 'James Taylor', 'Anna White'
    ][index % 10],
    joinDate: [
      'August 2014', 'September 2015', 'March 2016', 'November 2017', 'July 2018',
      'January 2019', 'April 2020', 'June 2021', 'October 2022', 'February 2023'
    ][index % 10],
    number: `${300 + index}`,
    gateway: ['Gateway A', 'Gateway B', 'Gateway C'][index % 3],
    contact: [
      'Samantha Smith', 'John Doe', 'Emily White', 'Michael Green', 'Sarah Johnson',
      'Peter Brown', 'Lucy Chen', 'Mark Wilson', 'Rachel Lee', 'Tom Anderson'
    ][index % 10],
    status: index % 3 === 0 ? 'Active' : index % 3 === 1 ? 'Inactive' : 'Pending',
    email: [
      'jesse@example.com', 'jane@example.com', 'robert@example.com',
      'lisa@example.com', 'david@example.com', 'emma@example.com',
      'michael@example.com', 'sarah@example.com', 'james@example.com',
      'anna@example.com'
    ][index % 10],
    role: ['Admin', 'User', 'Manager', 'Editor', 'Viewer'][index % 5]
  }));

  const columns: ColumnDefinition<Record<string, unknown>>[] = [
    { 
      id: 'name',
      field: 'name',
      header: 'Name',
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <Avatar src={`https://randomuser.me/api/portraits/${row.id % 2 ? 'men' : 'women'}/${row.id % 70}.jpg`} />
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
      id: 'email',
      field: 'email',
      header: 'Email',
      accessor: (row) => row.email as string,
      isSortable: true
    },
    { 
      id: 'role',
      field: 'role',
      header: 'Role',
      accessor: (row) => row.role as string,
      isSortable: true
    },
    { 
      id: 'number',
      field: 'number',
      header: 'Number',
      accessor: (row) => row.number as string,
      isSortable: true
    },
    { 
      id: 'gateway',
      field: 'gateway',
      header: 'Gateway',
      accessor: (row) => row.gateway as string,
      isSortable: true
    },
    { 
      id: 'contact',
      field: 'contact',
      header: 'Contact',
      accessor: (row) => row.contact as string
    },
    {
      id: 'status',
      field: 'status',
      header: 'Status',
      accessor: (row) => (
        <span className={`px-2 py-1 rounded text-xs ${
          (row.status as string) === 'Active' ? 'bg-green-100 text-green-800' : 
          (row.status as string) === 'Inactive' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {row.status as string}
        </span>
      ),
      isSortable: true
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    field: '',
    direction: SortDirection.NONE
  });
  const [_filters, setFilters] = useState<Record<string, string[]>>({});

  return (
    <div className="p-4">
      <DataTable
        data={data}
        columns={columns}
        idField="id"
        title="User Management"
        description="Complete overview of system users and their roles"
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
        defaultSort={sortConfig}
        onSortChange={(newSortConfig) => setSortConfig(newSortConfig)}
        onFilterChange={(filters) => {
          setFilters(filters);
        }}
      />
    </div>
  );
};

export default DataTableDemo;