'use client'

import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

type StepStatus = 'pending' | 'in-progress' | 'ready'

export interface ActionPlanStep {
  id: string
  title: string
  description: string
  status?: StepStatus
  estimateMinutes?: number
}

export interface ActionPlanProps {
  steps: ActionPlanStep[]
  onApprove?: (stepIds: string[]) => void
  onCancel?: () => void
  isExecuting?: boolean
  className?: string
}

const statusCopy: Record<StepStatus, string> = {
  pending: 'Pending',
  'in-progress': 'In progress',
  ready: 'Ready',
}

export function ActionPlan({
  steps,
  onApprove,
  onCancel,
  isExecuting,
  className,
}: ActionPlanProps) {
  const [selectedStepIds, setSelectedStepIds] = useState<string[]>(() =>
    steps.map((step) => step.id)
  )

  useEffect(() => {
    setSelectedStepIds(steps.map((step) => step.id))
  }, [steps])

  const totalMinutes = useMemo(
    () =>
      steps
        .filter((step) => selectedStepIds.includes(step.id))
        .reduce((acc, step) => acc + (step.estimateMinutes ?? 0), 0),
    [steps, selectedStepIds]
  )

  const handleToggle = (stepId: string, checked: boolean) => {
    setSelectedStepIds((prev) =>
      checked ? [...prev, stepId] : prev.filter((id) => id !== stepId)
    )
  }

  return (
    <Card className={cn('w-full max-w-xl', className)}>
      <CardHeader>
        <CardTitle>Action plan</CardTitle>
        <CardDescription>
          Review the proposed steps before allowing the assistant to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {steps.map((step, index) => {
          const status = step.status ?? 'pending'
          const isChecked = selectedStepIds.includes(step.id)

          return (
            <div
              key={step.id}
              className={cn(
                'rounded-lg border p-4 transition',
                !isChecked && 'opacity-60'
              )}
            >
              <div className='flex items-start gap-3'>
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) =>
                    handleToggle(step.id, Boolean(checked))
                  }
                  aria-label={`Include step ${index + 1}`}
                />
                <div className='flex-1 space-y-1'>
                  <div className='flex items-center justify-between gap-3'>
                    <div>
                      <p className='text-sm font-medium'>
                        Step {index + 1}: {step.title}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {step.description}
                      </p>
                    </div>
                    <span className='text-xs text-muted-foreground'>
                      {statusCopy[status]}
                    </span>
                  </div>
                  {typeof step.estimateMinutes === 'number' && (
                    <p className='text-xs text-muted-foreground'>
                      ≈ {step.estimateMinutes} min
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        <Separator />
        <div className='flex items-center justify-between text-sm text-muted-foreground'>
          <span>{selectedStepIds.length} steps selected</span>
          {totalMinutes > 0 && (
            <span>Estimated time: {totalMinutes} minutes</span>
          )}
        </div>
      </CardContent>
      <CardFooter className='flex flex-col gap-2 sm:flex-row sm:justify-end'>
        <Button
          variant='outline'
          onClick={onCancel}
          className='w-full sm:w-auto'
        >
          Cancel
        </Button>
        <Button
          onClick={() => onApprove?.(selectedStepIds)}
          disabled={selectedStepIds.length === 0 || isExecuting}
          className='w-full sm:w-auto'
        >
          {isExecuting ? 'Executing…' : 'Approve plan'}
        </Button>
      </CardFooter>
    </Card>
  )
}
