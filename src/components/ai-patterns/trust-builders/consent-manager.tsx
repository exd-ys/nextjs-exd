'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export interface ConsentItem {
  id: string
  label: string
  description: string
  required?: boolean
  granted?: boolean
}

export interface ConsentManagerProps {
  title?: string
  description?: string
  items: ConsentItem[]
  onSubmit?: (consents: ConsentItem[]) => void
  onCancel?: () => void
  className?: string
}

export function ConsentManager({
  title = 'Request consent',
  description = 'Choose what information the assistant can use. You can change your mind later.',
  items,
  onSubmit,
  onCancel,
  className,
}: ConsentManagerProps) {
  const [localItems, setLocalItems] = useState(items)

  const handleToggle = (itemId: string, granted: boolean) => {
    setLocalItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, granted } : item))
    )
  }

  const requiredMissing = localItems.some(
    (item) => item.required && !item.granted
  )

  return (
    <div
      className={cn(
        'w-full max-w-xl rounded-lg border p-6 shadow-sm',
        className
      )}
    >
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>{title}</h3>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      <Separator className='my-4' />
      <div className='space-y-4'>
        {localItems.map((item) => (
          <div
            key={item.id}
            className='flex items-start gap-3 rounded-md border p-3'
          >
            <Checkbox
              id={item.id}
              checked={item.granted}
              onCheckedChange={(checked) =>
                handleToggle(item.id, Boolean(checked))
              }
              aria-label={item.label}
            />
            <div className='space-y-1'>
              <Label htmlFor={item.id} className='text-sm font-medium'>
                {item.label}{' '}
                {item.required && (
                  <span className='text-xs text-destructive'>(Required)</span>
                )}
              </Label>
              <p className='text-sm text-muted-foreground'>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
        <Button variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={() => onSubmit?.(localItems)}
          disabled={requiredMissing}
        >
          Confirm consent
        </Button>
      </div>
    </div>
  )
}
