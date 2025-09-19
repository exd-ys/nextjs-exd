import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'

export type User = {
  name: string
  email: string
  department: string
  created: string
  lastLogin: string
  status: 'Active' | 'Inactive' | 'Suspended'
}

const users: User[] = [
  {
    name: 'Alice Wonder',
    email: 'alice.wonder@email.com',
    department: 'Engineering',
    created: 'Jan 15, 2024',
    lastLogin: 'Jul 22, 2024',
    status: 'Active',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    department: 'Marketing',
    created: 'Feb 10, 2024',
    lastLogin: 'Aug 18, 2024',
    status: 'Active',
  },
  {
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    department: 'Sales',
    created: 'Mar 5, 2024',
    lastLogin: 'Sep 30, 2024',
    status: 'Inactive',
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    department: 'Design',
    created: 'Apr 20, 2024',
    lastLogin: 'Oct 25, 2024',
    status: 'Suspended',
  },
  {
    name: 'Chris Lee',
    email: 'chris.lee@company.com',
    department: 'Product',
    created: 'May 15, 2024',
    lastLogin: 'Nov 22, 2024',
    status: 'Active',
  },
]

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <span className='text-[#363636] text-[14px] font-semibold font-sans whitespace-nowrap'>
        {row.getValue('name')}
      </span>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <span className='text-[#363636] text-[14px] font-normal font-sans whitespace-nowrap'>
        {row.getValue('email')}
      </span>
    ),
  },
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ row }) => (
      <span className='text-[#363636] text-[14px] font-normal font-sans whitespace-nowrap'>
        {row.getValue('department')}
      </span>
    ),
  },
  {
    accessorKey: 'created',
    header: 'Created',
    cell: ({ row }) => (
      <span className='text-[#363636] text-[14px] font-normal font-sans whitespace-nowrap'>
        {row.getValue('created')}
      </span>
    ),
  },
  {
    accessorKey: 'lastLogin',
    header: 'Last Login',
    cell: ({ row }) => (
      <span className='text-[#363636] text-[14px] font-normal font-sans whitespace-nowrap'>
        {row.getValue('lastLogin')}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status')
      if (status === 'Active') {
        return (
          <span className='bg-[#edfcf5] text-[#28c700] px-3 py-1 rounded-full text-xs font-semibold'>
            Active
          </span>
        )
      }
      if (status === 'Inactive') {
        return (
          <span className='bg-[#d9d9d9] text-[#868686] px-3 py-1 rounded-full text-xs font-semibold'>
            Inactive
          </span>
        )
      }
      if (status === 'Suspended') {
        return (
          <span className='bg-[#ffe6e3] text-[#f25d3b] px-3 py-1 rounded-full text-xs font-semibold'>
            Suspended
          </span>
        )
      }
      return null
    },
  },
  {
    id: 'actions',
    header: 'Action(s)',
    cell: ({ row }) => (
      <div className='flex gap-2'>
        <button
          className='p-2 rounded-[6px] border border-[#d9d9d9] bg-white hover:bg-[#f4f4f4] transition-colors'
          title='View'
          aria-label='View'
        >
          <svg width='16' height='16' fill='none' viewBox='0 0 16 16'>
            <path
              d='M8 3C4.5 3 2 8 2 8s2.5 5 6 5 6-5 6-5-2.5-5-6-5Zm0 7.5A2.5 2.5 0 1 1 8 6a2.5 2.5 0 0 1 0 5Z'
              stroke='#767676'
              strokeWidth='1.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <circle cx='8' cy='8.5' r='1.5' fill='#767676' />
          </svg>
        </button>
        <button
          className='p-2 rounded-[6px] border border-[#d9d9d9] bg-white hover:bg-[#f4f4f4] transition-colors'
          title='Edit'
          aria-label='Edit'
        >
          <svg width='16' height='16' fill='none' viewBox='0 0 16 16'>
            <path
              d='M12.8 5.2l-2-2a1 1 0 0 0-1.4 0l-5 5V12h3.8l5-5a1 1 0 0 0 0-1.4Z'
              stroke='#767676'
              strokeWidth='1.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M11 4l1 1'
              stroke='#767676'
              strokeWidth='1.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
        <button
          className='p-2 rounded-[8px] border border-[#f25d3b] bg-white hover:bg-[#ffe6e3] transition-colors'
          title='Delete'
          aria-label='Delete'
        >
          <svg width='16' height='16' fill='none' viewBox='0 0 16 16'>
            <path
              d='M6.5 7v3m3-3v3M2 4h12M3 4v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4'
              stroke='#f25d3b'
              strokeWidth='1.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M6 2h4a1 1 0 0 1 1 1v1H5V3a1 1 0 0 1 1-1Z'
              stroke='#f25d3b'
              strokeWidth='1.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    ),
  },
]

interface AdminUserTableProps {
  search?: string
  department?: string
  status?: string
}

export default function AdminUserTable({
  search = '',
  department = 'All',
  status = 'All',
}: AdminUserTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  // Filter users based on search, department, and status
  const filteredUsers = React.useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        search.trim() === '' ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      const matchesDepartment =
        department === 'All' || user.department === department
      const matchesStatus = status === 'All' || user.status === status
      return matchesSearch && matchesDepartment && matchesStatus
    })
  }, [search, department, status])

  const table = useReactTable({
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  })

  return (
    <div className='w-full bg-[white] rounded-lg'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
