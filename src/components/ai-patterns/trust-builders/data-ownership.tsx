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
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export interface DataCategory {
  id: string
  name: string
  description: string
  retained: boolean
}

export interface DataOwnershipProps {
  categories: DataCategory[]
  onToggleCategory?: (categoryId: string, retained: boolean) => void
  onDownload?: () => void
  onDelete?: () => void
  className?: string
}

export function DataOwnership({
  categories,
  onToggleCategory,
  onDownload,
  onDelete,
  className,
}: DataOwnershipProps) {
  const [localCategories, setLocalCategories] = useState(categories)

  const handleToggle = (categoryId: string, retained: boolean) => {
    setLocalCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId ? { ...category, retained } : category
      )
    )
    onToggleCategory?.(categoryId, retained)
  }

  return (
    <Card className={cn('w-full max-w-xl', className)}>
      <CardHeader>
        <CardTitle>Data ownership</CardTitle>
        <CardDescription>
          Control how the assistant stores and uses your information across
          sessions.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {localCategories.map((category) => (
          <div
            key={category.id}
            className='flex items-start justify-between gap-4 rounded-lg border p-4'
          >
            <div>
              <p className='text-sm font-medium'>{category.name}</p>
              <p className='text-sm text-muted-foreground'>
                {category.description}
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <Switch
                id={category.id}
                checked={category.retained}
                onCheckedChange={(checked) =>
                  handleToggle(category.id, Boolean(checked))
                }
                aria-label={`Retain ${category.name}`}
              />
              <span className='text-xs text-muted-foreground'>
                {category.retained ? 'Retained' : 'Forget after session'}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className='flex flex-col gap-2 sm:flex-row sm:justify-end'>
        <Button variant='outline' onClick={onDownload}>
          Download my data
        </Button>
        <Button variant='destructive' onClick={onDelete}>
          Delete stored data
        </Button>
      </CardFooter>
    </Card>
  )
}
