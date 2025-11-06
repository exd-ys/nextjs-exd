'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { RotateCcw } from 'lucide-react'

/**
 * Regenerate - Have the AI reproduce its response to the prompt without
 * additional input.
 * Based on the Shape of AI Inputs pattern.
 */
export interface RegenerateProps {
  onRegenerate: () => void
  isRegenerating?: boolean
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function Regenerate({
  onRegenerate,
  isRegenerating = false,
  className,
  variant = 'outline',
  size = 'default',
}: RegenerateProps) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onRegenerate}
      disabled={isRegenerating}
      className={cn('gap-2', className)}
    >
      <RotateCcw className={cn('h-4 w-4', isRegenerating && 'animate-spin')} />
      {isRegenerating ? 'Regenerating...' : 'Regenerate'}
    </Button>
  )
}
