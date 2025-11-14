'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Bot } from 'lucide-react'

export interface DisclosureProps {
  label?: string
  message?: string
  showIcon?: boolean
  className?: string
}

export function Disclosure({
  label = 'AI-generated content',
  message = 'This response was created by an AI assistant. Review before sharing.',
  showIcon = true,
  className,
}: DisclosureProps) {
  return (
    <div
      role='status'
      aria-live='polite'
      className={cn(
        'flex items-start gap-3 rounded-lg border border-dashed bg-muted/50 p-4 text-sm',
        className
      )}
    >
      <Badge variant='secondary' className='flex items-center gap-1'>
        {showIcon && <Bot className='h-3.5 w-3.5' aria-hidden='true' />}
        {label}
      </Badge>
      <p className='text-muted-foreground'>{message}</p>
    </div>
  )
}
