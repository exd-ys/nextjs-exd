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
import { Paintbrush } from 'lucide-react'
import { useState } from 'react'

/**
 * Inpainting - Target specific areas of the AI's result to regenerate or remix.
 * Based on the Shape of AI Inputs pattern.
 */
export interface InpaintingArea {
  id: string
  start: number
  end: number
  prompt: string
}

export interface InpaintingProps {
  content: string
  areas?: InpaintingArea[]
  onAreaAdd?: (area: InpaintingArea) => void
  onAreaRemove?: (id: string) => void
  onRegenerate?: (areaId: string, prompt: string) => void
  className?: string
}

export function Inpainting({
  content,
  areas = [],
  onAreaAdd,
  onAreaRemove,
  onRegenerate,
  className,
}: InpaintingProps) {
  const [selectedStart, setSelectedStart] = useState<number | null>(null)
  const [selectedEnd, setSelectedEnd] = useState<number | null>(null)
  const [prompt, setPrompt] = useState('')
  const [isRegenerating, setIsRegenerating] = useState(false)

  const handleSelect = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    if (start !== end) {
      setSelectedStart(start)
      setSelectedEnd(end)
      const selectedText = content.substring(start, end)
      setPrompt(`Regenerate: ${selectedText}`)
    }
  }

  const handleMarkArea = () => {
    if (
      selectedStart === null ||
      selectedEnd === null ||
      !prompt.trim() ||
      !onAreaAdd
    )
      return

    const area: InpaintingArea = {
      id: `area-${Date.now()}`,
      start: selectedStart,
      end: selectedEnd,
      prompt,
    }
    onAreaAdd(area)
    setSelectedStart(null)
    setSelectedEnd(null)
    setPrompt('')
  }

  const handleRegenerate = (areaId: string, areaPrompt: string) => {
    if (!onRegenerate) return
    setIsRegenerating(true)
    setTimeout(() => {
      onRegenerate(areaId, areaPrompt)
      setIsRegenerating(false)
    }, 1000)
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Paintbrush className='h-5 w-5' />
          Inpainting
        </CardTitle>
        <CardDescription>
          Target specific areas to regenerate or remix
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='inpainting-content'>Content</Label>
          <Textarea
            id='inpainting-content'
            value={content}
            readOnly
            onMouseUp={handleSelect}
            className='min-h-32 font-mono text-sm'
          />
          <p className='text-xs text-muted-foreground'>
            Select text to mark an area for regeneration
          </p>
        </div>

        {selectedStart !== null && selectedEnd !== null && (
          <div className='space-y-2 p-3 bg-muted rounded-lg'>
            <Label>Mark Area</Label>
            <Textarea
              placeholder='Enter prompt for this area...'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className='min-h-20'
            />
            <div className='flex gap-2'>
              <Button
                onClick={handleMarkArea}
                disabled={!prompt.trim()}
                size='sm'
              >
                Mark Area
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  setSelectedStart(null)
                  setSelectedEnd(null)
                  setPrompt('')
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {areas.length > 0 && (
          <div className='space-y-2 pt-2 border-t'>
            <Label>Marked Areas</Label>
            <div className='space-y-2'>
              {areas.map((area) => (
                <div key={area.id} className='p-3 border rounded-lg space-y-2'>
                  <div className='flex items-center justify-between'>
                    <p className='text-xs text-muted-foreground'>
                      Position: {area.start}-{area.end}
                    </p>
                    {onAreaRemove && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => onAreaRemove(area.id)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <p className='text-sm'>{area.prompt}</p>
                  {onRegenerate && (
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleRegenerate(area.id, area.prompt)}
                      disabled={isRegenerating}
                    >
                      {isRegenerating ? 'Regenerating...' : 'Regenerate Area'}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
