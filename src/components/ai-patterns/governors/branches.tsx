'use client'

import { useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export interface BranchStep {
  id: string
  label: string
  output: string
}

export interface Branch {
  id: string
  title: string
  summary: string
  createdAt: Date
  promptPreview: string
  steps: BranchStep[]
  status?: 'active' | 'archived'
}

export interface BranchesProps {
  branches: Branch[]
  onSelectBranch?: (branch: Branch) => void
  className?: string
}

export function Branches({
  branches,
  onSelectBranch,
  className,
}: BranchesProps) {
  const sortedBranches = useMemo(
    () =>
      [...branches].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      ),
    [branches]
  )

  const [activeBranchId, setActiveBranchId] = useState<string | undefined>(
    sortedBranches[0]?.id
  )

  const activeBranch = sortedBranches.find(
    (branch) => branch.id === activeBranchId
  )

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle>Branches</CardTitle>
        <CardDescription>
          Compare alternative paths without losing traceability to the origin.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeBranchId}
          onValueChange={(value) => {
            setActiveBranchId(value)
            const branch = sortedBranches.find((item) => item.id === value)
            if (branch) {
              onSelectBranch?.(branch)
            }
          }}
          className='space-y-4'
        >
          <TabsList className='w-full justify-start overflow-x-auto'>
            {sortedBranches.map((branch) => (
              <TabsTrigger key={branch.id} value={branch.id}>
                <span className='flex items-center gap-2'>
                  <span>{branch.title}</span>
                  <Badge
                    variant={
                      branch.status === 'archived' ? 'outline' : 'secondary'
                    }
                  >
                    {branch.status === 'archived' ? 'Archived' : 'Active'}
                  </Badge>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          {sortedBranches.map((branch) => (
            <TabsContent key={branch.id} value={branch.id}>
              <div className='space-y-4 rounded-lg border p-4'>
                <div className='flex flex-col gap-1 text-sm text-muted-foreground'>
                  <span className='font-medium text-foreground'>Prompt</span>
                  <span>{branch.promptPreview}</span>
                  <span>
                    Last updated{' '}
                    {branch.createdAt.toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
                <div className='space-y-3'>
                  {branch.steps.map((step, idx) => (
                    <div
                      key={step.id}
                      className='rounded-md border bg-muted/50 p-3 text-sm'
                    >
                      <div className='flex items-center justify-between gap-2'>
                        <span className='font-medium'>
                          {idx + 1}. {step.label}
                        </span>
                        <Badge variant='outline'>Step {idx + 1}</Badge>
                      </div>
                      <p className='mt-2 text-muted-foreground'>
                        {step.output}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        {!activeBranch && (
          <p className='mt-6 text-center text-sm text-muted-foreground'>
            No branches available yet.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
