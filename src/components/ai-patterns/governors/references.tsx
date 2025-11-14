'use client'

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

export interface Reference {
  id: string
  title: string
  type: 'document' | 'link' | 'dataset' | 'note'
  description?: string
  url?: string
}

export interface ReferencesProps {
  references: Reference[]
  onOpenReference?: (reference: Reference) => void
  onRemoveReference?: (reference: Reference) => void
  className?: string
}

const typeCopy: Record<Reference['type'], string> = {
  document: 'Document',
  link: 'Link',
  dataset: 'Dataset',
  note: 'Note',
}

export function References({
  references,
  onOpenReference,
  onRemoveReference,
  className,
}: ReferencesProps) {
  return (
    <Card className={cn('w-full max-w-2xl', className)}>
      <CardHeader>
        <CardTitle>References in use</CardTitle>
        <CardDescription>
          Maintain oversight on the external sources guiding the assistant.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        {references.map((reference) => (
          <div
            key={reference.id}
            className='flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between'
          >
            <div className='space-y-1'>
              <div className='flex items-center gap-2'>
                <span className='text-sm font-medium'>{reference.title}</span>
                <Badge variant='outline'>{typeCopy[reference.type]}</Badge>
              </div>
              {reference.description && (
                <p className='text-sm text-muted-foreground'>
                  {reference.description}
                </p>
              )}
            </div>
            <div className='flex flex-wrap gap-2'>
              {reference.url && (
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => onOpenReference?.(reference)}
                >
                  Open
                </Button>
              )}
              <Button
                variant='ghost'
                size='sm'
                onClick={() => onRemoveReference?.(reference)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
        {references.length === 0 && (
          <p className='text-sm text-muted-foreground'>
            No references selected yet.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
