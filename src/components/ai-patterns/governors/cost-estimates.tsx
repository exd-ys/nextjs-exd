'use client'

import { useMemo } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

export interface CostEstimate {
  id: string
  label: string
  tokens: number
  costUsd: number
}

export interface CostEstimatesProps {
  estimates: CostEstimate[]
  currencySymbol?: string
  className?: string
}

export function CostEstimates({
  estimates,
  currencySymbol = '$',
  className,
}: CostEstimatesProps) {
  const totals = useMemo(() => {
    return estimates.reduce(
      (acc, estimate) => {
        acc.tokens += estimate.tokens
        acc.costUsd += estimate.costUsd
        return acc
      },
      { tokens: 0, costUsd: 0 }
    )
  }, [estimates])

  return (
    <Card className={cn('w-full max-w-xl', className)}>
      <CardHeader>
        <CardTitle>Cost estimates</CardTitle>
        <CardDescription>
          Understand the expected resource usage before executing the plan.
        </CardDescription>
      </CardHeader>
      <CardContent className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-1/2'>Operation</TableHead>
              <TableHead>Tokens</TableHead>
              <TableHead className='text-right'>Estimated cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {estimates.map((estimate) => (
              <TableRow key={estimate.id}>
                <TableCell className='font-medium'>{estimate.label}</TableCell>
                <TableCell>{estimate.tokens.toLocaleString()}</TableCell>
                <TableCell className='text-right'>
                  {currencySymbol}
                  {estimate.costUsd.toFixed(4)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className='flex items-center justify-between text-sm text-muted-foreground'>
        <span>Total</span>
        <span>
          {totals.tokens.toLocaleString()} tokens · {currencySymbol}
          {totals.costUsd.toFixed(4)}
        </span>
      </CardFooter>
    </Card>
  )
}
