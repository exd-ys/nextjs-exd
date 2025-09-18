import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'

import { Card } from '@/components/ui/card'

export function SectionCards() {
  return (
    <div className='grid grid-cols-1 gap-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
      <Card className='p-[24px] rounded-[8px] border-none'>
        <div className='flex gap-4 items-center justify-start w-full'>
          <div className='bg-[#edf3ff] flex items-center justify-center rounded-[8px] p-4'>
            <IconTrendingUp className='text-[#383ad8]' size={20} />
          </div>
          <div className='flex flex-col items-start'>
            <div className="font-['Inter:Semibold',_sans-serif] text-[#363636] text-[18px] font-semibold leading-[1.5]">
              3,456,789
            </div>
            <div className="font-['Inter:Regular',_sans-serif] text-[#868686] text-[14px] font-normal leading-[1.5]">
              Total Sales
            </div>
          </div>
        </div>
      </Card>
      <Card className='p-[24px] rounded-[8px] border-none'>
        <div className='flex gap-4 items-center justify-start w-full'>
          <div className='bg-[#edf3ff] flex items-center justify-center rounded-[8px] p-4'>
            <IconTrendingDown className='text-[#383ad8]' size={20} />
          </div>
          <div className='flex flex-col items-start'>
            <div className="font-['Inter:Semibold',_sans-serif] text-[#363636] text-[18px] font-semibold leading-[1.5]">
              1,234
            </div>
            <div className="font-['Inter:Regular',_sans-serif] text-[#868686] text-[14px] font-normal leading-[1.5]">
              New Customers
            </div>
          </div>
        </div>
      </Card>
      <Card className='p-[24px] rounded-[8px] border-none'>
        <div className='flex gap-4 items-center justify-start w-full'>
          <div className='bg-[#edf3ff] flex items-center justify-center rounded-[8px] p-4'>
            <IconTrendingUp className='text-[#383ad8]' size={20} />
          </div>
          <div className='flex flex-col items-start'>
            <div className="font-['Inter:Semibold',_sans-serif] text-[#363636] text-[18px] font-semibold leading-[1.5]">
              45,678
            </div>
            <div className="font-['Inter:Regular',_sans-serif] text-[#868686] text-[14px] font-normal leading-[1.5]">
              Active Accounts
            </div>
          </div>
        </div>
      </Card>
      <Card className='p-[24px] rounded-[8px] border-none'>
        <div className='flex gap-4 items-center justify-start w-full'>
          <div className='bg-[#edf3ff] flex items-center justify-center rounded-[8px] p-4'>
            <IconTrendingUp className='text-[#383ad8]' size={20} />
          </div>
          <div className='flex flex-col items-start'>
            <div className="font-['Inter:Semibold',_sans-serif] text-[#363636] text-[18px] font-semibold leading-[1.5]">
              4.5%
            </div>
            <div className="font-['Inter:Regular',_sans-serif] text-[#868686] text-[14px] font-normal leading-[1.5]">
              Growth Rate
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
