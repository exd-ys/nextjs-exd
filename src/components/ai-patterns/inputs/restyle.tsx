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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Palette } from 'lucide-react'
import { useState } from 'react'

/**
 * Restyle - Transfer styles without changing the underlying structure of a
 * generation.
 * Based on the Shape of AI Inputs pattern.
 */
export interface StyleOption {
  id: string
  label: string
  description: string
}

export interface RestyleProps {
  content: string
  styleOptions: StyleOption[]
  onRestyle?: (content: string, styleId: string) => void
  className?: string
}

export function Restyle({
  content,
  styleOptions,
  onRestyle,
  className,
}: RestyleProps) {
  const [originalContent, setOriginalContent] = useState(content)
  const [selectedStyle, setSelectedStyle] = useState<string>('')
  const [restyledContent, setRestyledContent] = useState('')
  const [isRestyling, setIsRestyling] = useState(false)

  const handleRestyle = () => {
    if (!originalContent.trim() || !selectedStyle || !onRestyle) return

    setIsRestyling(true)
    setTimeout(() => {
      const restyled = `[Restyled in ${styleOptions.find(
        (s) => s.id === selectedStyle
      )
        ?.label} style]:\n\n${originalContent}\n\n[Content has been restyled while maintaining the original structure and meaning.]`
      setRestyledContent(restyled)
      onRestyle(originalContent, selectedStyle)
      setIsRestyling(false)
    }, 1500)
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Palette className='h-5 w-5' />
          Restyle
        </CardTitle>
        <CardDescription>
          Transfer styles without changing the underlying structure
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='restyle-content'>Original Content</Label>
          <Textarea
            id='restyle-content'
            value={originalContent}
            onChange={(e) => setOriginalContent(e.target.value)}
            placeholder='Enter content to restyle...'
            className='min-h-32'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='restyle-style'>Style</Label>
          <Select value={selectedStyle} onValueChange={setSelectedStyle}>
            <SelectTrigger>
              <SelectValue placeholder='Select a style...' />
            </SelectTrigger>
            <SelectContent>
              {styleOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  <div className='flex flex-col'>
                    <span>{option.label}</span>
                    <span className='text-xs text-muted-foreground'>
                      {option.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {onRestyle && (
          <Button
            onClick={handleRestyle}
            disabled={!originalContent.trim() || !selectedStyle || isRestyling}
            className='w-full'
          >
            {isRestyling ? 'Restyling...' : 'Restyle'}
          </Button>
        )}

        {restyledContent && (
          <div className='space-y-2 pt-2 border-t'>
            <Label>Restyled Content</Label>
            <Textarea
              value={restyledContent}
              readOnly
              className='min-h-32 bg-muted'
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
