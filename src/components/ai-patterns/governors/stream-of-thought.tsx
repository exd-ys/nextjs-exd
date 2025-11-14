'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface StreamOfThoughtProps {
  reasoning: string
  answer: string
  onToggleVisibility?: (isVisible: boolean) => void
  className?: string
}

export function StreamOfThought({
  reasoning,
  answer,
  onToggleVisibility,
  className,
}: StreamOfThoughtProps) {
  const [isVisible, setIsVisible] = useState(false)

  const handleToggle = () => {
    setIsVisible((previous) => {
      const next = !previous
      onToggleVisibility?.(next)
      return next
    })
  }

  return (
    <Card className={cn('w-full max-w-xl', className)}>
      <CardHeader>
        <CardTitle>Stream of thought</CardTitle>
        <CardDescription>
          Reveal the model’s reasoning when you need to audit its conclusions.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='rounded-lg border bg-muted/40 p-4 text-sm'>
          <span className='font-medium text-muted-foreground'>Answer</span>
          <p>{answer}</p>
        </div>
        {isVisible ? (
          <div className='rounded-lg border bg-muted/30 p-4 text-sm leading-6'>
            <span className='font-medium text-muted-foreground'>Reasoning</span>
            <p>{reasoning}</p>
          </div>
        ) : (
          <div className='rounded-lg border border-dashed p-4 text-sm text-muted-foreground'>
            Reasoning hidden. Toggle stream of thought to reveal the model’s
            internal notes.
          </div>
        )}
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button variant='outline' onClick={handleToggle}>
          {isVisible ? 'Hide reasoning' : 'Show reasoning'}
        </Button>
      </CardFooter>
    </Card>
  )
}
