'use client'

import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export interface MemoryItem {
  id: string
  title: string
  description: string
  isStored: boolean
}

export interface MemoryProps {
  items: MemoryItem[]
  onUpdate?: (items: MemoryItem[]) => void
  className?: string
}

export function Memory({ items, onUpdate, className }: MemoryProps) {
  const [localItems, setLocalItems] = useState(items)

  const handleToggle = (itemId: string, isStored: boolean) => {
    setLocalItems((prev) => {
      const updated = prev.map((item) =>
        item.id === itemId ? { ...item, isStored } : item
      )
      onUpdate?.(updated)
      return updated
    })
  }

  return (
    <Card className={cn('w-full max-w-xl', className)}>
      <CardHeader>
        <CardTitle>Memory controls</CardTitle>
        <CardDescription>
          Decide what the assistant can remember from this conversation.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        {localItems.map((item) => (
          <div
            key={item.id}
            className='flex items-start gap-3 rounded-lg border p-3'
          >
            <Checkbox
              id={item.id}
              checked={item.isStored}
              onCheckedChange={(checked) =>
                handleToggle(item.id, Boolean(checked))
              }
              aria-label={item.title}
            />
            <div className='space-y-1'>
              <Label htmlFor={item.id} className='text-sm font-medium'>
                {item.title}
              </Label>
              <p className='text-sm text-muted-foreground'>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
