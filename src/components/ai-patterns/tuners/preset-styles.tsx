'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Palette } from 'lucide-react'

/**
 * Preset Styles - Provide default options to change the texture, aesthetic, or tone of generative media.
 * Based on the Shape of AI Tuners pattern.
 */
export interface PresetStyle {
  id: string
  name: string
  description?: string
  category?: string
  preview?: string
}

export interface PresetStylesProps {
  styles: PresetStyle[]
  selectedStyle?: string
  onSelect: (styleId: string) => void
  className?: string
}

export function PresetStyles({
  styles,
  selectedStyle,
  onSelect,
  className,
}: PresetStylesProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Palette className='h-5 w-5' />
          Preset Styles
        </CardTitle>
        <p className='text-sm text-muted-foreground'>
          Choose a default style to change texture, aesthetic, or tone
        </p>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
          {styles.map((style) => (
            <div
              key={style.id}
              className={cn(
                'p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md',
                selectedStyle === style.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              )}
              onClick={() => onSelect(style.id)}
            >
              {style.preview && (
                <div className='aspect-square rounded mb-2 bg-muted mb-2 flex items-center justify-center'>
                  <span className='text-xs text-muted-foreground'>Preview</span>
                </div>
              )}
              <div className='space-y-1'>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-medium'>{style.name}</p>
                  {selectedStyle === style.id && (
                    <Badge variant='default' className='h-4 text-xs'>
                      Selected
                    </Badge>
                  )}
                </div>
                {style.category && (
                  <p className='text-xs text-muted-foreground'>
                    {style.category}
                  </p>
                )}
                {style.description && (
                  <p className='text-xs text-muted-foreground line-clamp-2'>
                    {style.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
