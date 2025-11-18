'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'
import { PatternLearnMore } from './pattern-learn-more'

/**
 * ExampleGallery - Displays sample generations, prompts, and parameters to educate and inspire users.
 * Based on the Shape of AI Wayfinders pattern.
 */
export interface ExampleItem {
  id: string
  title: string
  prompt: string
  result?: string
  parameters?: Record<string, string | number>
  onSelect?: () => void
}

export interface ExampleGalleryProps {
  examples: ExampleItem[]
  onSelect?: (example: ExampleItem) => void
  className?: string
  wrapperClassName?: string
  showLearnMore?: boolean
}

export function ExampleGallery({
  examples,
  onSelect,
  className,
  wrapperClassName,
  showLearnMore = true,
}: ExampleGalleryProps) {
  return (
    <div className={cn('space-y-3', wrapperClassName)}>
      {showLearnMore && (
        <div className='flex justify-end'>
          <PatternLearnMore pattern='example-gallery' />
        </div>
      )}
      <div
        className={cn(
          'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3',
          className
        )}
      >
        {examples.map((example) => (
          <Card
            key={example.id}
            className={cn(
              'cursor-pointer transition-all hover:shadow-md',
              onSelect && 'hover:border-primary'
            )}
            onClick={() => onSelect?.(example)}
          >
            <CardHeader>
              <CardTitle className='text-base'>{example.title}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div>
                <p className='text-xs font-medium text-muted-foreground'>
                  Prompt:
                </p>
                <p className='text-sm'>{example.prompt}</p>
              </div>
              {example.result && (
                <div>
                  <p className='text-xs font-medium text-muted-foreground'>
                    Result:
                  </p>
                  <p className='text-sm text-muted-foreground line-clamp-2'>
                    {example.result}
                  </p>
                </div>
              )}
              {example.parameters &&
                Object.keys(example.parameters).length > 0 && (
                  <div>
                    <p className='text-xs font-medium text-muted-foreground mb-1'>
                      Parameters:
                    </p>
                    <div className='flex flex-wrap gap-1'>
                      {Object.entries(example.parameters).map(
                        ([key, value]) => (
                          <span
                            key={key}
                            className='text-xs bg-muted px-1.5 py-0.5 rounded'
                          >
                            {key}: {String(value)}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              {onSelect && (
                <Button variant='ghost' size='sm' className='w-full mt-2'>
                  Use this example
                  <ExternalLink className='ml-2 h-3 w-3' />
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
