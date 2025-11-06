'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

/**
 * Suggestions - Solves the blank canvas dilemma with clues for how to prompt.
 * Based on the Shape of AI Wayfinders pattern.
 * Previously named WayfinderChips.
 */
export interface SuggestionItem {
  id: string
  label: string
  hint?: string
}

export interface SuggestionsProps {
  items: SuggestionItem[]
  onPick: (item: SuggestionItem) => void
  className?: string
}

export function Suggestions({ items, onPick, className }: SuggestionsProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {items.map((item) => (
        <Badge
          key={item.id}
          variant='outline'
          className='cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground'
          onClick={() => onPick(item)}
        >
          {item.label}
          {item.hint && (
            <span className='ml-1.5 text-xs text-muted-foreground'>
              {item.hint}
            </span>
          )}
        </Badge>
      ))}
    </div>
  )
}

// Legacy export for backwards compatibility
export type WayfinderItem = SuggestionItem
export type WayfinderChipsProps = SuggestionsProps
export const WayfinderChips = Suggestions
