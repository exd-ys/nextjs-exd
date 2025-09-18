'use client'
import { Card, CardContent } from '@/components/ui/card'
import { IconUserCheck, IconUserPlus, IconUsers } from '@tabler/icons-react'
import AdminUserTableWithFilters from './AdminUserTableWithFilters'

export default function AdminPage() {
  return (
    <div className='flex flex-col gap-6'>
      <div
        className='grid grid-cols-1 gap-4 lg:grid-cols-3 w-full md:gap-6'
        data-node-id='256:11410'
      >
        {/* Card 1: Total users */}
        <Card className='flex-1 min-w-[220px] p-0 rounded-[8px] !bg-white'>
          <CardContent className='flex flex-row items-center justify-between p-6 gap-4 !bg-white'>
            <div className='flex flex-col items-start gap-1 w-full'>
              <div className='flex items-start justify-between w-full gap-2'>
                <span className='text-[#868686] text-[16px] font-normal leading-[1.5] font-sans'>
                  Total users
                </span>
                <div className='bg-[#f4f4f4] rounded-[8px] flex items-center justify-center w-[36px] h-[36px]'>
                  <IconUsers
                    className='text-[#767676]'
                    size={20}
                    aria-label='Total users'
                  />
                </div>
              </div>
              <span className='text-[#363636] text-[24px] font-semibold leading-[1.0] font-sans'>
                5
              </span>
              <span className='text-[#363636] text-[14px] font-normal leading-[1.5] font-sans'>
                +2 from last month
              </span>
            </div>
          </CardContent>
        </Card>
        {/* Card 2: Active users */}
        <Card className='flex-1 min-w-[220px] p-0 rounded-[8px] !bg-white'>
          <CardContent className='flex flex-row items-center justify-between p-6 gap-4 !bg-white'>
            <div className='flex flex-col items-start gap-1 w-full'>
              <div className='flex items-start justify-between w-full gap-2'>
                <span className='text-[#868686] text-[16px] font-normal leading-[1.5] font-sans'>
                  Active users
                </span>
                <div className='bg-[#edfcf5] rounded-[8px] flex items-center justify-center w-[36px] h-[36px]'>
                  <IconUserCheck
                    className='text-[#28c700]'
                    size={20}
                    aria-label='Active users'
                  />
                </div>
              </div>

              <span className='text-[#363636] text-[24px] font-semibold leading-[1.0] font-sans'>
                3
              </span>
              <span className='text-[#363636] text-[14px] font-normal leading-[1.5] font-sans'>
                60% of total
              </span>
            </div>
          </CardContent>
        </Card>
        {/* Card 3: New this month */}
        <Card className='flex-1 min-w-[220px] p-0 rounded-[8px] !bg-white'>
          <CardContent className='flex flex-row items-center justify-between p-6 gap-4 !bg-white'>
            <div className='flex flex-col items-start gap-1 w-full'>
              <div className='flex items-start justify-between w-full gap-2'>
                <span className='text-[#868686] text-[16px] font-normal leading-[1.5] font-sans'>
                  New this month
                </span>
                <div className='bg-[#edf3ff] rounded-[8px] flex items-center justify-center w-[36px] h-[36px]'>
                  <IconUserPlus
                    className='text-[#383ad8]'
                    size={20}
                    aria-label='New this month'
                  />
                </div>
              </div>

              <span className='text-[#363636] text-[24px] font-semibold leading-[1.0] font-sans'>
                2
              </span>
              <span className='text-[#363636] text-[14px] font-normal leading-[1.5] font-sans'>
                +25% from last month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management Table Section */}
      <div className='w-full'>
        <div className='flex flex-col gap-4 bg-card rounded-[8px] p-8'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4'>
            <div>
              <h2 className='text-[#363636] text-[24px] font-semibold font-sans leading-normal'>
                User Management
              </h2>
              <p className='text-[#868686] text-[14px] font-normal font-sans leading-[1.5]'>
                Manage users, roles, and permissions
              </p>
            </div>
            <button className='bg-[#383ad8] text-[#ffffff] rounded-[6px] px-4 h-[42px] font-semibold text-[14px] font-sans hover:bg-[#2e2fa8] transition-colors'>
              Create new user
            </button>
          </div>
          <AdminUserTableWithFilters />
        </div>
      </div>
    </div>
  )
}
