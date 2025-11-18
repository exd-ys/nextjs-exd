'use client'

import { useState } from 'react'

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
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export interface VerificationStep {
  id: string
  label: string
  description?: string
  required?: boolean
}

export interface VerificationProps {
  steps: VerificationStep[]
  onVerify?: (completedSteps: string[]) => void
  className?: string
}

export function Verification({
  steps,
  onVerify,
  className,
}: VerificationProps) {
  const [checkedSteps, setCheckedSteps] = useState<string[]>([])

  const handleToggle = (stepId: string, checked: boolean) => {
    setCheckedSteps((prev) =>
      checked ? [...prev, stepId] : prev.filter((id) => id !== stepId)
    )
  }

  const requiredSteps = steps.filter((step) => step.required)
  const hasCompletedRequired = requiredSteps.every((step) =>
    checkedSteps.includes(step.id)
  )

  return (
    <Card className={cn('w-full max-w-xl', className)}>
      <CardHeader>
        <CardTitle>Verification checklist</CardTitle>
        <CardDescription>
          Confirm the assistant’s decisions before moving ahead.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        {steps.map((step) => (
          <div
            key={step.id}
            className='flex items-start gap-3 rounded-lg border p-3'
          >
            <Checkbox
              id={step.id}
              checked={checkedSteps.includes(step.id)}
              onCheckedChange={(checked) =>
                handleToggle(step.id, Boolean(checked))
              }
              aria-label={step.label}
            />
            <div className='space-y-1'>
              <Label htmlFor={step.id} className='text-sm font-medium'>
                {step.label}
              </Label>
              {step.description && (
                <p className='text-sm text-muted-foreground'>
                  {step.description}
                </p>
              )}
              {step.required && (
                <p className='text-xs text-muted-foreground'>
                  Required before approval
                </p>
              )}
            </div>
          </div>
        ))}
        {steps.length === 0 && (
          <p className='text-sm text-muted-foreground'>
            No verification steps configured yet.
          </p>
        )}
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button
          onClick={() => onVerify?.(checkedSteps)}
          disabled={!hasCompletedRequired || steps.length === 0}
        >
          Approve
        </Button>
      </CardFooter>
    </Card>
  )
}
