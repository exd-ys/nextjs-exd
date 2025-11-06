'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Expand as ExpandIcon } from 'lucide-react'
import { useState } from 'react'

/**
 * Expand - Lengthen the underlying content or add depth and details.
 * Based on the Shape of AI Inputs pattern.
 */
export interface ExpandProps {
  content: string
  onExpand?: (expandedContent: string) => void
  className?: string
}

export function Expand({ content, onExpand, className }: ExpandProps) {
  const [originalContent, setOriginalContent] = useState(content)
  const [expandedContent, setExpandedContent] = useState('')
  const [isExpanding, setIsExpanding] = useState(false)

  const handleExpand = () => {
    if (!originalContent.trim() || !onExpand) return
    setIsExpanding(true)
    // Simulate expansion - in real app, this would call an API
    setTimeout(() => {
      const expanded = `${originalContent}\n\n[Expanded with additional details and depth: This expanded version provides more context, examples, and detailed explanations to enhance understanding and provide a comprehensive view of the topic.]`
      setExpandedContent(expanded)
      onExpand(expanded)
      setIsExpanding(false)
    }, 1500)
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <ExpandIcon className='h-5 w-5' />
          Expand
        </CardTitle>
        <CardDescription>
          Lengthen content or add depth and details
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='expand-original'>Original Content</Label>
          <Textarea
            id='expand-original'
            value={originalContent}
            onChange={(e) => setOriginalContent(e.target.value)}
            placeholder='Enter content to expand...'
            className='min-h-24'
          />
        </div>

        {onExpand && (
          <Button
            onClick={handleExpand}
            disabled={!originalContent.trim() || isExpanding}
            className='w-full'
          >
            {isExpanding ? 'Expanding...' : 'Expand Content'}
          </Button>
        )}

        {expandedContent && (
          <div className='space-y-2 pt-2 border-t'>
            <Label>Expanded Content</Label>
            <Textarea
              value={expandedContent}
              readOnly
              className='min-h-32 bg-muted'
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
