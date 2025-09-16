
"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartDateToggle } from "@/components/chart-date-toggle"
import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A multiple bar chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartBarMultiple() {
  const [timeRange, setTimeRange] = React.useState("90d");
  return (
  <Card className="border-none">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-0">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold leading-tight">Total Visitors</CardTitle>
          <CardDescription>
            <span className="hidden @[540px]/card:block">Total for the last 3 months</span>
            <span className="@[540px]/card:hidden">Last 3 months</span>
          </CardDescription>
        </div>
        <ChartDateToggle timeRange={timeRange} setTimeRange={setTimeRange} />
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart width={undefined} height={undefined} data={chartData} style={{ width: '100%', height: '100%' }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="#383ad8" radius={4} />
            <Bar dataKey="mobile" fill="#868686" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
