'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AlertCircle, X } from 'lucide-react'
import { useState } from 'react'
import { PatternLearnMore } from './pattern-learn-more'

/**
 * Nudges - Alerts users to actions they can take to use AI, especially if they are just getting started.
 * Based on the Shape of AI Wayfinders pattern.
 */
export interface Nudge {
  id: string
  message: string
  action?: {
    label: string
    onClick: () => void
  }
  dismissible?: boolean
  variant?: 'default' | 'info' | 'warning'
}

export interface NudgesProps {
  nudges: Nudge[]
  onDismiss?: (nudgeId: string) => void
  className?: string
  showLearnMore?: boolean
}

export function Nudges({
  nudges,
  onDismiss,
  className,
  showLearnMore = true,
}: NudgesProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const handleDismiss = (id: string) => {
    setDismissed((prev) => new Set(prev).add(id))
    onDismiss?.(id)
  }

  const visibleNudges = nudges.filter((nudge) => !dismissed.has(nudge.id))

  if (visibleNudges.length === 0) return null

  return (
    <div className={cn('space-y-2', className)}>
      {showLearnMore && (
        <div className='text-right'>
          <PatternLearnMore pattern='nudges' />
        </div>
      )}
      {visibleNudges.map((nudge) => (
        <div
          key={nudge.id}
          className={cn(
            'flex items-start gap-3 rounded-lg border p-4',
            nudge.variant === 'warning' &&
              'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950',
            nudge.variant === 'info' &&
              'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950',
            !nudge.variant && 'border-border bg-muted/50'
          )}
        >
          <AlertCircle className='h-5 w-5 shrink-0 mt-0.5 text-muted-foreground' />
          <div className='flex-1 space-y-2'>
            <p className='text-sm'>{nudge.message}</p>
            {nudge.action && (
              <Button
                variant='outline'
                size='sm'
                onClick={nudge.action.onClick}
              >
                {nudge.action.label}
              </Button>
            )}
          </div>
          {nudge.dismissible && (
            <Button
              variant='ghost'
              size='icon'
              className='h-6 w-6 shrink-0'
              onClick={() => handleDismiss(nudge.id)}
            >
              <X className='h-4 w-4' />
              <span className='sr-only'>Dismiss</span>
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
