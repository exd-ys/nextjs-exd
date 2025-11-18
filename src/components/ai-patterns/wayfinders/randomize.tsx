'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Shuffle } from 'lucide-react'
import { PatternLearnMore } from './pattern-learn-more'

/**
 * Randomize - Kickstarts the prompting experience with a low bar and fun results.
 * Based on the Shape of AI Wayfinders pattern.
 */
export interface RandomizeProps {
  onRandomize: () => void
  label?: string
  className?: string
  wrapperClassName?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  showLearnMore?: boolean
}

export function Randomize({
  onRandomize,
  label = 'Randomize',
  className,
  wrapperClassName,
  variant = 'outline',
  size = 'default',
  showLearnMore = true,
}: RandomizeProps) {
  return (
    <div className={cn('flex items-center gap-2', wrapperClassName)}>
      <Button
        variant={variant}
        size={size}
        onClick={onRandomize}
        className={cn('gap-2', className)}
      >
        <Shuffle className='h-4 w-4' />
        {label}
      </Button>
      {showLearnMore && <PatternLearnMore pattern='randomize' />}
    </div>
  )
}
