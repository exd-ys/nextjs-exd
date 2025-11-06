'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { FileText, Upload, X } from 'lucide-react'
import { useRef, useState } from 'react'

/**
 * Attachments - Give the AI a specific reference to anchor its response.
 * Based on the Shape of AI Tuners pattern.
 */
export interface Attachment {
  id: string
  name: string
  type: string
  size?: number
  url?: string
}

export interface AttachmentsProps {
  attachments: Attachment[]
  onAdd?: (files: File[]) => void
  onRemove?: (id: string) => void
  maxSize?: number
  acceptedTypes?: string[]
  className?: string
}

export function Attachments({
  attachments,
  onAdd,
  onRemove,
  maxSize = 10 * 1024 * 1024, // 10MB default
  acceptedTypes = ['*'],
  className,
}: AttachmentsProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files || !onAdd) return

    const fileArray = Array.from(files).filter((file) => {
      if (file.size > maxSize) {
        alert(
          `File ${file.name} is too large. Maximum size: ${
            maxSize / 1024 / 1024
          }MB`
        )
        return false
      }
      return true
    })

    if (fileArray.length > 0) {
      onAdd(fileArray)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ''
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
          isDragging ? 'border-primary bg-primary/5' : 'border-border'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className='mx-auto h-8 w-8 text-muted-foreground mb-2' />
        <p className='text-sm text-muted-foreground mb-2'>
          Drag and drop files here, or click to select
        </p>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={() => fileInputRef.current?.click()}
        >
          Select Files
        </Button>
        <input
          ref={fileInputRef}
          type='file'
          multiple
          accept={acceptedTypes.join(',')}
          className='hidden'
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>

      {attachments.length > 0 && (
        <div className='space-y-2'>
          {attachments.map((attachment) => (
            <Card key={attachment.id}>
              <CardContent className='flex items-center justify-between p-3'>
                <div className='flex items-center gap-3 flex-1 min-w-0'>
                  <FileText className='h-5 w-5 text-muted-foreground shrink-0' />
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium truncate'>
                      {attachment.name}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {attachment.type}{' '}
                      {attachment.size &&
                        `• ${formatFileSize(attachment.size)}`}
                    </p>
                  </div>
                </div>
                {onRemove && (
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8 shrink-0'
                    onClick={() => onRemove(attachment.id)}
                  >
                    <X className='h-4 w-4' />
                    <span className='sr-only'>Remove</span>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
