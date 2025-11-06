'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { MessageSquare } from 'lucide-react'
import { useState } from 'react'

/**
 * Inline Action - Ask or interact with AI contextually based on something
 * already available on the page.
 * Based on the Shape of AI Inputs pattern.
 */
export interface InlineActionProps {
  context: string
  onAction?: (query: string, context: string) => void
  className?: string
}

export function InlineAction({
  context,
  onAction,
  className,
}: InlineActionProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleAction = () => {
    if (!query.trim() || !onAction) return
    setIsProcessing(true)
    setTimeout(() => {
      onAction(query, context)
      setIsProcessing(false)
      setQuery('')
      setIsOpen(false)
    }, 1000)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className={cn(className)}>
          <MessageSquare className='h-4 w-4 mr-2' />
          Ask about this
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-96' align='start'>
        <Card className='border-0 shadow-none'>
          <CardHeader className='p-0 pb-3'>
            <CardTitle className='text-base'>Inline Action</CardTitle>
            <CardDescription className='text-xs'>
              Ask about the selected content
            </CardDescription>
          </CardHeader>
          <CardContent className='p-0 space-y-3'>
            <div className='p-2 bg-muted rounded text-xs text-muted-foreground'>
              Context: {context.substring(0, 100)}
              {context.length > 100 ? '...' : ''}
            </div>
            <Textarea
              placeholder='What would you like to know?'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='min-h-20'
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleAction()
                }
              }}
            />
            <div className='flex gap-2'>
              <Button
                onClick={handleAction}
                disabled={!query.trim() || isProcessing}
                size='sm'
                className='flex-1'
              >
                {isProcessing ? 'Processing...' : 'Ask'}
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
