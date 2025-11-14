'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export interface WatermarkProps {
  label?: string
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
  children: React.ReactNode
}

const positionClasses: Record<
  NonNullable<WatermarkProps['position']>,
  string
> = {
  'top-left': 'top-3 left-3',
  'top-right': 'top-3 right-3',
  'bottom-left': 'bottom-3 left-3',
  'bottom-right': 'bottom-3 right-3',
}

export function Watermark({
  label = 'AI generated',
  position = 'bottom-right',
  className,
  children,
}: WatermarkProps) {
  return (
    <div
      className={cn('relative overflow-hidden rounded-xl border', className)}
    >
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-gradient-to-br from-background/40 to-background/10'
      />
      <div className='relative'>{children}</div>
      <Badge
        variant='secondary'
        className={cn(
          'pointer-events-none absolute select-none bg-background/90 px-2 py-1 text-[11px] uppercase tracking-wide shadow-sm backdrop-blur',
          positionClasses[position]
        )}
      >
        {label}
      </Badge>
    </div>
  )
}
