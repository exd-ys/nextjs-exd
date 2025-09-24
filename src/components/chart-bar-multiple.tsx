'use client'

import { ChartDateToggle } from '@/components/chart-date-toggle'
import * as React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'A multiple bar chart'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig

export function ChartBarMultiple() {
  const [timeRange, setTimeRange] = React.useState('90d')
  return (
    <Card>
      <CardHeader className='flex flex-row items-start justify-between gap-4 pb-0'>
        <div className='space-y-1'>
          <CardTitle>Bar Chart</CardTitle>
          <CardDescription>
            <span className='hidden sm:block'>Total for the last 3 months</span>
            <span className='sm:hidden'>Last 3 months</span>
          </CardDescription>
        </div>
        <ChartDateToggle timeRange={timeRange} setTimeRange={setTimeRange} />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-80 w-full'>
          <BarChart
            width={undefined}
            height={undefined}
            data={chartData}
            style={{ width: '100%', height: '100%' }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dot' />}
            />
            <Bar dataKey='desktop' fill='var(--chart-1)' radius={4} />
            <Bar dataKey='mobile' fill='var(--chart-3)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
