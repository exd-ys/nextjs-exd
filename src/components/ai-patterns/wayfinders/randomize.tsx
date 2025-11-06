'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Shuffle } from 'lucide-react'

/**
 * Randomize - Kickstarts the prompting experience with a low bar and fun results.
 * Based on the Shape of AI Wayfinders pattern.
 */
export interface RandomizeProps {
  onRandomize: () => void
  label?: string
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function Randomize({
  onRandomize,
  label = 'Randomize',
  className,
  variant = 'outline',
  size = 'default',
}: RandomizeProps) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onRandomize}
      className={cn('gap-2', className)}
    >
      <Shuffle className='h-4 w-4' />
      {label}
    </Button>
  )
}
