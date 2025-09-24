import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronDown, ChevronUp } from 'lucide-react'
// removed duplicate ChevronDown import
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
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        type='button'
        variant='ghost'
        className='flex items-center gap-1 p-0 m-0 h-auto text-foreground text-sm font-semibold whitespace-nowrap hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Name
        <span className='flex flex-col ml-1'>
          <ChevronUp
            className={`size-4 ${
              column.getIsSorted() === 'asc'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          />
          <ChevronDown
            className={`size-4 -mt-1 ${
              column.getIsSorted() === 'desc'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          />
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <span className='text-foreground text-sm font-semibold whitespace-nowrap'>
        {row.getValue('name')}
      </span>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button
        type='button'
        variant='ghost'
        className='flex items-center gap-1 p-0 m-0 h-auto text-foreground text-sm font-medium whitespace-nowrap hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Email
        <span className='flex flex-col ml-1'>
          <ChevronUp
            className={`size-4 ${
              column.getIsSorted() === 'asc'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          />
          <ChevronDown
            className={`size-4 -mt-1 ${
              column.getIsSorted() === 'desc'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          />
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <span className='text-foreground text-sm font-medium whitespace-nowrap'>
        {row.getValue('email')}
      </span>
    ),
  },
  {
    accessorKey: 'department',
    header: ({ column }) => (
      <Button
        type='button'
        variant='ghost'
        className='flex items-center gap-1 p-0 m-0 h-auto text-foreground text-sm font-medium whitespace-nowrap hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Department
        <span className='flex flex-col ml-1'>
          <ChevronUp
            className={`size-4 ${
              column.getIsSorted() === 'asc'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          />
          <ChevronDown
            className={`size-4 -mt-1 ${
              column.getIsSorted() === 'desc'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          />
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <span className='text-foreground text-sm font-medium whitespace-nowrap'>
        {row.getValue('department')}
      </span>
    ),
  },
  {
    accessorKey: 'created',
    header: ({ column }) => (
      <Button
        type='button'
        variant='ghost'
        className='flex items-center gap-1 p-0 m-0 h-auto text-foreground text-sm font-medium whitespace-nowrap hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Created
        <span className='flex flex-col ml-1'>
          <ChevronUp
            className={`size-4 ${
              column.getIsSorted() === 'asc'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          />
          <ChevronDown
            className={`size-4 -mt-1 ${
              column.getIsSorted() === 'desc'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          />
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <span className='text-foreground text-sm font-medium whitespace-nowrap'>
        {row.getValue('created')}
      </span>
    ),
  },
  {
    accessorKey: 'lastLogin',
    header: ({ column }) => (
      <Button
        type='button'
        variant='ghost'
        className='flex items-center gap-1 p-0 m-0 h-auto text-foreground text-sm font-medium whitespace-nowrap hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Last Login
        <span className='flex flex-col ml-1'>
          <ChevronUp
            className={`size-4 ${
              column.getIsSorted() === 'asc'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          />
          <ChevronDown
            className={`size-4 -mt-1 ${
              column.getIsSorted() === 'desc'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          />
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <span className='text-foreground text-sm font-medium whitespace-nowrap'>
        {row.getValue('lastLogin')}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        type='button'
        variant='ghost'
        className='flex items-center gap-1 p-0 m-0 h-auto text-foreground text-sm font-medium whitespace-nowrap hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Status
        <span className='flex flex-col ml-1'>
          <ChevronUp
            className={`size-4 ${
              column.getIsSorted() === 'asc'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          />
          <ChevronDown
            className={`size-4 -mt-1 ${
              column.getIsSorted() === 'desc'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          />
        </span>
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue('status')
      if (status === 'Active') {
        return (
          <span className='bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold'>
            Active
          </span>
        )
      }
      if (status === 'Inactive') {
        return (
          <span className='bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-semibold'>
            Inactive
          </span>
        )
      }
      if (status === 'Suspended') {
        return (
          <span className='bg-destructive/10 text-destructive px-3 py-1 rounded-full text-xs font-semibold'>
            Suspended
          </span>
        )
      }
      return null
    },
  },
  {
    id: 'actions',
    header: () => (
      <span className='text-foreground text-sm font-medium whitespace-nowrap'>
        Action(s)
      </span>
    ),
    cell: ({ row }) => (
      <div className='flex gap-2'>
        <button
          className='p-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors'
          title='View'
          aria-label='View'
        >
          <svg width='16' height='16' fill='none' viewBox='0 0 16 16'>
            <path
              d='M8 3C4.5 3 2 8 2 8s2.5 5 6 5 6-5 6-5-2.5-5-6-5Zm0 7.5A2.5 2.5 0 1 1 8 6a2.5 2.5 0 0 1 0 5Z'
              stroke='currentColor'
              strokeWidth='1.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <circle cx='8' cy='8.5' r='1.5' fill='currentColor' />
          </svg>
        </button>
        <button
          className='p-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors'
          title='Edit'
          aria-label='Edit'
        >
          <svg width='16' height='16' fill='none' viewBox='0 0 16 16'>
            <path
              d='M12.8 5.2l-2-2a1 1 0 0 0-1.4 0l-5 5V12h3.8l5-5a1 1 0 0 0 0-1.4Z'
              stroke='currentColor'
              strokeWidth='1.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M11 4l1 1'
              stroke='currentColor'
              strokeWidth='1.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
        <button
          className='p-2 rounded-lg border border-destructive bg-background hover:bg-destructive/10 transition-colors'
          title='Delete'
          aria-label='Delete'
        >
          <svg width='16' height='16' fill='none' viewBox='0 0 16 16'>
            <path
              d='M6.5 7v3m3-3v3M2 4h12M3 4v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4'
              stroke='currentColor'
              strokeWidth='1.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M6 2h4a1 1 0 0 1 1 1v1H5V3a1 1 0 0 1 1-1Z'
              stroke='currentColor'
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

export interface AdminUserTableStats {
  total: number
  active: number
  newThisMonth: number
  activePercent: number
  newPercent: number
}

interface AdminUserTableProps {
  onStatsChange?: (stats: AdminUserTableStats) => void
}

export default function AdminUserTable({ onStatsChange }: AdminUserTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pageSize, setPageSize] = React.useState(5)
  const [search, setSearch] = React.useState('')
  const [department, setDepartment] = React.useState('All')
  const [status, setStatus] = React.useState('All')

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

  // Calculate stats and call onStatsChange
  React.useEffect(() => {
    if (!onStatsChange) return
    const now = new Date()
    const thisMonth = now.getMonth()
    const thisYear = now.getFullYear()
    // Parse created date for newThisMonth
    const newThisMonth = filteredUsers.filter((u) => {
      const d = new Date(u.created + ' 2024') // fallback year if missing
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear
    }).length
    const active = filteredUsers.filter((u) => u.status === 'Active').length
    const total = filteredUsers.length
    const allTotal = users.filter((user) => {
      const matchesDepartment =
        department === 'All' || user.department === department
      const matchesStatus = status === 'All' || user.status === status
      return matchesDepartment && matchesStatus
    }).length
    onStatsChange({
      total,
      active,
      newThisMonth,
      activePercent: total > 0 ? Math.round((active / total) * 100) : 0,
      newPercent:
        allTotal > 0 ? Math.round((newThisMonth / allTotal) * 100) : 0,
    })
  }, [filteredUsers, onStatsChange, department, status])

  const table = useReactTable({
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: { sorting, columnVisibility, rowSelection },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.email,
    initialState: { pagination: { pageSize } },
  })

  return (
    <div className=''>
      <div className='flex flex-row items-center py-4 gap-2 md:gap-4 justify-between'>
        <div className='flex items-center'>
          <Input
            placeholder='Search users...'
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            className='max-w-xs'
          />
        </div>
        <div className='flex items-center gap-2 md:gap-4'>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className='w-40'>
              <SelectValue placeholder='Department' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='All'>All Departments</SelectItem>
              <SelectItem value='Engineering'>Engineering</SelectItem>
              <SelectItem value='Marketing'>Marketing</SelectItem>
              <SelectItem value='Sales'>Sales</SelectItem>
              <SelectItem value='Design'>Design</SelectItem>
              <SelectItem value='Product'>Product</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className='w-36'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='All'>All Statuses</SelectItem>
              <SelectItem value='Active'>Active</SelectItem>
              <SelectItem value='Inactive'>Inactive</SelectItem>
              <SelectItem value='Suspended'>Suspended</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className='flex flex-row justify-between'
            >
              <Button variant='outline' className='text-sm font-medium w-36'>
                Columns <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize px-8 py-2 text-sm font-medium'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header &&
                    typeof column.columnDef.header === 'string'
                      ? column.columnDef.header
                      : column.id.charAt(0).toUpperCase() + column.id.slice(1)}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='border border-border rounded-md'>
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
                  className='h-24 text-center text-muted-foreground'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className='text-xs text-muted-foreground'
              >
                {table.getFilteredSelectedRowModel().rows.length} of{' '}
                {table.getFilteredRowModel().rows.length} row(s) selected
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-2 py-4'>
        <div className='flex items-center gap-2'>
          <span className='text-sm'>Rows per page:</span>
          <select
            className='border border-border rounded px-2 py-1 text-sm bg-background'
            value={table.getState().pagination.pageSize}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              table.setPageSize(Number(e.target.value))
            }
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span className='text-sm'>
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </span>
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
    </div>
  )
}
