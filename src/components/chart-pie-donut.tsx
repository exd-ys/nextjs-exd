'use client'

import { ChartDateToggle } from '@/components/chart-date-toggle'
import * as React from 'react'
import { Pie, PieChart } from 'recharts'

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

export const description = 'A donut chart'

const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'hsl(var(--chart-1))' },
  { browser: 'safari', visitors: 200, fill: 'hsl(var(--chart-2))' },
  { browser: 'firefox', visitors: 187, fill: 'hsl(var(--chart-3))' },
  { browser: 'edge', visitors: 173, fill: 'hsl(var(--chart-4))' },
  { browser: 'other', visitors: 90, fill: 'hsl(var(--chart-5))' },
]

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig

export function ChartPieDonut() {
  const [timeRange, setTimeRange] = React.useState('90d')
  return (
    <Card className='flex flex-col border-none'>
      <CardHeader className='flex flex-row items-start justify-between gap-4 pb-0'>
        <div className='space-y-1'>
          <CardTitle className='text-lg font-semibold leading-tight'>
            Total Visitors
          </CardTitle>
          <CardDescription>
            <span className='hidden @[540px]/card:block'>
              Total for the last 3 months
            </span>
            <span className='@[540px]/card:hidden'>Last 3 months</span>
          </CardDescription>
        </div>
        <ChartDateToggle timeRange={timeRange} setTimeRange={setTimeRange} />
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square h-[300px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey='visitors'
              nameKey='browser'
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
