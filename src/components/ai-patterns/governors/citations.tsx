'use client'

import { useMemo } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface GovernorCitation {
  id: string
  title: string
  summary: string
  url?: string
  confidence?: number
}

export interface CitationsProps {
  response: string
  citations: GovernorCitation[]
  onOpenSource?: (citation: GovernorCitation) => void
  className?: string
}

export function Citations({
  response,
  citations,
  onOpenSource,
  className,
}: CitationsProps) {
  const confidenceAverage = useMemo(() => {
    const values = citations
      .map((citation) => citation.confidence)
      .filter((value): value is number => typeof value === 'number')
    if (!values.length) return undefined
    return values.reduce((acc, value) => acc + value, 0) / values.length
  }, [citations])

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle>AI response with citations</CardTitle>
        <CardDescription>
          Inspect the evidence backing the model’s statements before accepting
          them.
        </CardDescription>
        {typeof confidenceAverage === 'number' && (
          <Badge variant='secondary'>
            Average confidence: {(confidenceAverage * 100).toFixed(0)}%
          </Badge>
        )}
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='rounded-lg border bg-muted/40 p-4 text-sm leading-6'>
          {response}
        </div>
        <Accordion type='single' collapsible className='w-full space-y-2'>
          {citations.map((citation, index) => (
            <AccordionItem key={citation.id} value={citation.id}>
              <AccordionTrigger className='text-left text-sm font-medium'>
                <span className='flex items-center gap-2'>
                  <Badge variant='outline'>{index + 1}</Badge>
                  {citation.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className='space-y-3 text-sm'>
                <p className='text-muted-foreground'>{citation.summary}</p>
                <div className='flex items-center justify-between'>
                  {typeof citation.confidence === 'number' && (
                    <span className='text-xs text-muted-foreground'>
                      Confidence {(citation.confidence * 100).toFixed(0)}%
                    </span>
                  )}
                  {citation.url && (
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => onOpenSource?.(citation)}
                    >
                      View source
                    </Button>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
