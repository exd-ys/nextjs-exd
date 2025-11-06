'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * FollowUpBar - Get more information from the user when the initial prompt isn't sufficiently clear.
 * Based on the Shape of AI Wayfinders pattern.
 */
export interface FollowUpBarProps {
  items: string[]
  onPick: (item: string) => void
  className?: string
}

export function FollowUpBar({ items, onPick, className }: FollowUpBarProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {items.map((item, index) => (
        <Button
          key={index}
          variant='outline'
          size='sm'
          onClick={() => onPick(item)}
          className='text-xs'
        >
          {item}
        </Button>
      ))}
    </div>
  )
}
