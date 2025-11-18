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

export interface DraftModeProps {
  initialDraft: string
  onPublish?: (finalDraft: string) => void
  isPublishing?: boolean
  className?: string
}

export function DraftMode({
  initialDraft,
  onPublish,
  isPublishing,
  className,
}: DraftModeProps) {
  const [draft, setDraft] = useState(initialDraft)

  return (
    <Card className={cn('w-full max-w-xl', className)}>
      <CardHeader>
        <CardTitle>Draft mode</CardTitle>
        <CardDescription>
          Keep changes in a low-stakes sandbox until you are ready to publish.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        <Textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className='min-h-[180px]'
          aria-label='Edit draft response'
        />
        <p className='text-xs text-muted-foreground'>
          Drafts are private to you. Publish when ready to share broadly.
        </p>
      </CardContent>
      <CardFooter className='flex justify-end gap-2'>
        <Button variant='outline' onClick={() => setDraft(initialDraft)}>
          Revert changes
        </Button>
        <Button onClick={() => onPublish?.(draft)} disabled={isPublishing}>
          {isPublishing ? 'Publishing…' : 'Publish draft'}
        </Button>
      </CardFooter>
    </Card>
  )
}
