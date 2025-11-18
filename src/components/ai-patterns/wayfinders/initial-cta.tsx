'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { PatternLearnMore } from './pattern-learn-more'

/**
 * InitialCTA - Large, open-ended input inviting the user to start their first interaction with the AI.
 * Based on the Shape of AI Wayfinders pattern.
 */
export interface InitialCTAProps {
  placeholder?: string
  onSubmit: (value: string) => void
  className?: string
  label?: string
  helperText?: string
  showLearnMore?: boolean
}

export function InitialCTA({
  placeholder = 'Ask me anything...',
  onSubmit,
  className,
  label = 'Get started',
  helperText,
  showLearnMore = true,
}: InitialCTAProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSubmit(value.trim())
      setValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      {label && (
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <h2 className='text-2xl font-semibold'>{label}</h2>
          {helperText && (
            <p className='text-sm text-muted-foreground'>{helperText}</p>
          )}
          {showLearnMore && (
            <PatternLearnMore pattern='initial-cta' className='sm:ml-4' />
          )}
        </div>
      )}
      <div className='flex gap-2'>
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className='min-h-24 resize-none'
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              handleSubmit(e)
            }
          }}
        />
        <Button
          type='submit'
          size='icon'
          className='h-24 shrink-0'
          disabled={!value.trim()}
        >
          <Send className='h-5 w-5' />
          <span className='sr-only'>Submit</span>
        </Button>
      </div>
      <p className='text-xs text-muted-foreground'>
        Press Cmd/Ctrl + Enter to submit
      </p>
    </form>
  )
}
