import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { ChevronDown, ClipboardList, Search } from 'lucide-react'

// Figma design tokens
const SEARCH_PLACEHOLDER = 'Type here to search'
const DROPDOWN_OPTIONS = [
  'All',
  'Engineering',
  'Marketing',
  'Sales',
  'Design',
  'Product',
]

export default function AdminUserTableSearchFilters({
  onSearch,
  onDepartmentChange,
  onStatusChange,
  department = 'All',
  status = 'All',
  search = '',
}: {
  onSearch: (value: string) => void
  onDepartmentChange: (value: string) => void
  onStatusChange: (value: string) => void
  department?: string
  status?: string
  search?: string
}) {
  return (
    <div
      className='flex items-center justify-between gap-4 w-full mb-4'
      data-node-id='943:12215'
    >
      {/* Search Bar */}
      <div
        className='relative flex items-center bg-white h-[42px] w-[300px] rounded-[8px] border border-[#d9d9d9] px-4 transition-colors focus-within:border-[#868686] focus-within:ring-2 focus-within:ring-[#d9d9d9]'
        data-node-id='943:12216'
      >
        <Search className='text-[#d9d9d9] w-5 h-5 mr-2' aria-hidden='true' />
        <Input
          className='border-none ring-0 focus:ring-0 focus:border-none outline-none text-[14px] font-normal font-sans placeholder-[#d9d9d9] p-0 h-[40px] bg-transparent shadow-none'
          style={{ fontFamily: 'Nunito Sans, sans-serif', lineHeight: '19px' }}
          placeholder={SEARCH_PLACEHOLDER}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          data-node-id='I943:12216;121:8480'
        />
      </div>
      {/* Filters */}
      <div className='flex gap-4'>
        {/* Department Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='flex items-center justify-between gap-2 bg-white h-[42px] w-[200px] rounded-[6px] border border-[#d9d9d9] text-[#868686] text-[14px] font-normal font-sans px-4'
              style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.5' }}
              data-node-id='943:12218'
            >
              <div className='flex items-center gap-2'>
                <ClipboardList className='w-[18px] h-[18px] text-[#868686]' />
                <div>{department}</div>
              </div>

              <ChevronDown className='w-[18px] h-[18px] text-[#868686]' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            {DROPDOWN_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => onDepartmentChange(option)}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Status Dropdown (reuse same style) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='flex items-center justify-between gap-2 bg-white h-[42px] w-[200px] rounded-[6px] border border-[#d9d9d9] text-[#868686] text-[14px] font-normal font-sans px-4'
              style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.5' }}
              data-node-id='943:12219'
            >
              <div className='flex items-center gap-2'>
                <ClipboardList className='w-[18px] h-[18px] text-[#868686]' />
                <div>{status}</div>
              </div>
              <ChevronDown className='w-[18px] h-[18px] text-[#868686]' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            {['All', 'Active', 'Inactive', 'Suspended'].map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => onStatusChange(option)}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
