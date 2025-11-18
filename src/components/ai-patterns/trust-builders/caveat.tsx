'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { AlertTriangle } from 'lucide-react'

export interface CaveatItem {
  id: string
  label: string
  description: string
}

export interface CaveatProps {
  title?: string
  description?: string
  caveats: CaveatItem[]
  severity?: 'low' | 'medium' | 'high'
  className?: string
}

const severityCopy: Record<NonNullable<CaveatProps['severity']>, string> = {
  low: 'Low impact',
  medium: 'Needs attention',
  high: 'Critical',
}

export function Caveat({
  title = 'Model caveats',
  description = 'Before you proceed, review the current limitations and risks.',
  caveats,
  severity = 'medium',
  className,
}: CaveatProps) {
  return (
    <Alert className={cn('space-y-4', className)}>
      <div className='flex items-center gap-3'>
        <AlertTriangle className='h-5 w-5 text-amber-500' aria-hidden='true' />
        <div>
          <AlertTitle className='flex items-center gap-2'>
            {title}
            <Badge
              variant={severity === 'high' ? 'destructive' : 'secondary'}
              className='uppercase'
            >
              {severityCopy[severity]}
            </Badge>
          </AlertTitle>
          <AlertDescription className='text-sm text-muted-foreground'>
            {description}
          </AlertDescription>
        </div>
      </div>
      <Separator />
      <ul className='space-y-3 text-sm'>
        {caveats.map((caveat) => (
          <li key={caveat.id} className='space-y-1'>
            <p className='font-medium text-foreground'>{caveat.label}</p>
            <p className='text-muted-foreground'>{caveat.description}</p>
          </li>
        ))}
      </ul>
    </Alert>
  )
}
