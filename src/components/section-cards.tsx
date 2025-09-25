import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'

import { Card } from '@/components/ui/card'

export function SectionCards() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
      <Card>
        <div className='flex gap-3 sm:gap-4 items-center justify-start w-full px-4 sm:px-6'>
          <div className='bg-muted flex items-center justify-center rounded-lg p-3 sm:p-4'>
            <IconTrendingUp className='text-primary w-4 h-4 sm:w-5 sm:h-5' />
          </div>
          <div className='flex flex-col items-start'>
            <div className='text-lg font-semibold leading-[1.5] text-foreground'>
              3,456,789
            </div>
            <div className='text-sm font-normal leading-[1.5] text-muted-foreground'>
              Total Sales
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <div className='flex gap-3 sm:gap-4 items-center justify-start w-full px-4 sm:px-6'>
          <div className='bg-muted flex items-center justify-center rounded-lg p-3 sm:p-4'>
            <IconTrendingDown className='text-primary w-4 h-4 sm:w-5 sm:h-5' />
          </div>
          <div className='flex flex-col items-start'>
            <div className='text-lg font-semibold leading-[1.5] text-foreground'>
              1,234
            </div>
            <div className='text-sm font-normal leading-[1.5] text-muted-foreground'>
              New Customers
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <div className='flex gap-3 sm:gap-4 items-center justify-start w-full px-4 sm:px-6'>
          <div className='bg-muted flex items-center justify-center rounded-lg p-3 sm:p-4'>
            <IconTrendingUp className='text-primary w-4 h-4 sm:w-5 sm:h-5' />
          </div>
          <div className='flex flex-col items-start'>
            <div className='text-lg font-semibold leading-[1.5] text-foreground'>
              45,678
            </div>
            <div className='text-sm font-normal leading-[1.5] text-muted-foreground'>
              Active Accounts
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <div className='flex gap-3 sm:gap-4 items-center justify-start w-full px-4 sm:px-6'>
          <div className='bg-muted flex items-center justify-center rounded-lg p-3 sm:p-4'>
            <IconTrendingUp className='text-primary w-4 h-4 sm:w-5 sm:h-5' />
          </div>
          <div className='flex flex-col items-start'>
            <div className='text-lg font-semibold leading-[1.5] text-foreground'>
              4.5%
            </div>
            <div className='text-sm font-normal leading-[1.5] text-muted-foreground'>
              Growth Rate
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
