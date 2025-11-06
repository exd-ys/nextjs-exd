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
import { Repeat } from 'lucide-react'
import { useState } from 'react'

/**
 * Transform - Use AI to change the modality of content.
 * Based on the Shape of AI Inputs pattern.
 */
export interface ModalityOption {
  id: string
  label: string
  from: string
  to: string
  description: string
}

export interface TransformProps {
  content: string
  modalityOptions: ModalityOption[]
  onTransform?: (content: string, modalityId: string) => void
  className?: string
}

export function Transform({
  content,
  modalityOptions,
  onTransform,
  className,
}: TransformProps) {
  const [originalContent, setOriginalContent] = useState(content)
  const [selectedModality, setSelectedModality] = useState<string>('')
  const [transformedContent, setTransformedContent] = useState('')
  const [isTransforming, setIsTransforming] = useState(false)

  const handleTransform = () => {
    if (!originalContent.trim() || !selectedModality || !onTransform) return

    setIsTransforming(true)
    setTimeout(() => {
      const option = modalityOptions.find((m) => m.id === selectedModality)
      const transformed = `[Transformed from ${option?.from} to ${option?.to}]:\n\n${originalContent}\n\n[Content has been transformed while preserving the core meaning and information.]`
      setTransformedContent(transformed)
      onTransform(originalContent, selectedModality)
      setIsTransforming(false)
    }, 1500)
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Repeat className='h-5 w-5' />
          Transform
        </CardTitle>
        <CardDescription>
          Change the modality of content using AI
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='transform-content'>Content</Label>
          <Textarea
            id='transform-content'
            value={originalContent}
            onChange={(e) => setOriginalContent(e.target.value)}
            placeholder='Enter content to transform...'
            className='min-h-32'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='transform-modality'>Modality</Label>
          <Select value={selectedModality} onValueChange={setSelectedModality}>
            <SelectTrigger>
              <SelectValue placeholder='Select transformation...' />
            </SelectTrigger>
            <SelectContent>
              {modalityOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  <div className='flex flex-col'>
                    <span>
                      {option.from} → {option.to}
                    </span>
                    <span className='text-xs text-muted-foreground'>
                      {option.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {onTransform && (
          <Button
            onClick={handleTransform}
            disabled={
              !originalContent.trim() || !selectedModality || isTransforming
            }
            className='w-full'
          >
            {isTransforming ? 'Transforming...' : 'Transform'}
          </Button>
        )}

        {transformedContent && (
          <div className='space-y-2 pt-2 border-t'>
            <Label>Transformed Content</Label>
            <Textarea
              value={transformedContent}
              readOnly
              className='min-h-32 bg-muted'
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
