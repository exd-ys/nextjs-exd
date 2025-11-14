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
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export interface SampleResponseProps {
  prompt: string
  sample: string
  onConfirm?: (feedback: string) => void
  className?: string
}

export function SampleResponse({
  prompt,
  sample,
  onConfirm,
  className,
}: SampleResponseProps) {
  const [feedback, setFeedback] = useState('')

  return (
    <Card className={cn('w-full max-w-2xl', className)}>
      <CardHeader>
        <CardTitle>Sample response</CardTitle>
        <CardDescription>
          Confirm whether the assistant’s approach matches your intent before it
          proceeds.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='rounded-lg border bg-muted/40 p-4 text-sm'>
          <span className='font-medium text-muted-foreground'>Prompt</span>
          <p>{prompt}</p>
        </div>
        <div className='rounded-lg border bg-muted/40 p-4 text-sm'>
          <span className='font-medium text-muted-foreground'>
            Sample output
          </span>
          <p>{sample}</p>
        </div>
        <Textarea
          value={feedback}
          onChange={(event) => setFeedback(event.target.value)}
          placeholder='Share feedback to guide the assistant before it runs.'
          aria-label='Feedback on sample response'
        />
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button onClick={() => onConfirm?.(feedback)}>Looks good</Button>
      </CardFooter>
    </Card>
  )
}
