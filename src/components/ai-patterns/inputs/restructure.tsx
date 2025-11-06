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
import { Layout } from 'lucide-react'
import { useState } from 'react'

/**
 * Restructure - Use existing content as the starting point for prompting.
 * Based on the Shape of AI Inputs pattern.
 */
export interface StructureOption {
  id: string
  label: string
  description: string
}

export interface RestructureProps {
  content: string
  structureOptions: StructureOption[]
  onRestructure?: (content: string, structureId: string) => void
  className?: string
}

export function Restructure({
  content,
  structureOptions,
  onRestructure,
  className,
}: RestructureProps) {
  const [originalContent, setOriginalContent] = useState(content)
  const [selectedStructure, setSelectedStructure] = useState<string>('')
  const [restructuredContent, setRestructuredContent] = useState('')
  const [isRestructuring, setIsRestructuring] = useState(false)

  const handleRestructure = () => {
    if (!originalContent.trim() || !selectedStructure || !onRestructure) return

    setIsRestructuring(true)
    setTimeout(() => {
      const restructured = `[Restructured as ${structureOptions.find(
        (s) => s.id === selectedStructure
      )
        ?.label}]:\n\n${originalContent}\n\n[Content has been reorganized according to the selected structure while maintaining the original information.]`
      setRestructuredContent(restructured)
      onRestructure(originalContent, selectedStructure)
      setIsRestructuring(false)
    }, 1500)
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Layout className='h-5 w-5' />
          Restructure
        </CardTitle>
        <CardDescription>
          Use existing content as the starting point for prompting
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='restructure-content'>Original Content</Label>
          <Textarea
            id='restructure-content'
            value={originalContent}
            onChange={(e) => setOriginalContent(e.target.value)}
            placeholder='Enter content to restructure...'
            className='min-h-32'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='restructure-structure'>Structure</Label>
          <Select
            value={selectedStructure}
            onValueChange={setSelectedStructure}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select a structure...' />
            </SelectTrigger>
            <SelectContent>
              {structureOptions.map((option) => (
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

        {onRestructure && (
          <Button
            onClick={handleRestructure}
            disabled={
              !originalContent.trim() || !selectedStructure || isRestructuring
            }
            className='w-full'
          >
            {isRestructuring ? 'Restructuring...' : 'Restructure'}
          </Button>
        )}

        {restructuredContent && (
          <div className='space-y-2 pt-2 border-t'>
            <Label>Restructured Content</Label>
            <Textarea
              value={restructuredContent}
              readOnly
              className='min-h-32 bg-muted'
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
