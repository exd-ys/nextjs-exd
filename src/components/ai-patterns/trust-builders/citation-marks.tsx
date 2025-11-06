'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

/**
 * CitationMarks - Inline numbered badges with hover popovers showing reference snippets ("Citations").
 * Part of the Trust Builders category - gives users confidence in AI results.
 * Uses shadcn Popover and Button components.
 */
export interface Citation {
  id: string
  title: string
  snippet?: string
  href?: string
}

export interface CitationMarksProps {
  citations: Citation[]
  className?: string
}

export function CitationMarks({ citations, className }: CitationMarksProps) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      {citations.map((citation, index) => (
        <Popover key={citation.id}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='h-5 min-w-5 rounded-full px-1.5 text-xs font-medium'
            >
              {index + 1}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-80' align='start'>
            <div className='space-y-2'>
              <h4 className='font-semibold text-sm'>{citation.title}</h4>
              {citation.snippet && (
                <p className='text-sm text-muted-foreground'>
                  {citation.snippet}
                </p>
              )}
              {citation.href && (
                <a
                  href={citation.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs text-primary hover:underline'
                >
                  View source →
                </a>
              )}
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </span>
  )
}
