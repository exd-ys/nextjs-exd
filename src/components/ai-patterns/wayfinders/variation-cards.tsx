'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { PatternLearnMore } from './pattern-learn-more'

/**
 * VariationCards - A small grid of alternative output cards ("Variations").
 * Uses shadcn Card components.
 */
export interface VariationItem {
  id: string
  title: string
  text: string
}

export interface VariationCardsProps {
  items: VariationItem[]
  onSelect?: (item: VariationItem) => void
  className?: string
  showLearnMore?: boolean
}

export function VariationCards({
  items,
  onSelect,
  className,
  showLearnMore = true,
}: VariationCardsProps) {
  return (
    <div className='space-y-3'>
      {showLearnMore && (
        <div className='flex justify-end'>
          <PatternLearnMore pattern='variation-cards' />
        </div>
      )}
      <div
        className={cn(
          'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3',
          className
        )}
      >
        {items.map((item) => (
          <Card
            key={item.id}
            className={cn(
              'cursor-pointer transition-all hover:shadow-md',
              onSelect && 'hover:border-primary'
            )}
            onClick={() => onSelect?.(item)}
          >
            <CardHeader>
              <CardTitle className='text-base'>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className='text-sm'>{item.text}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
