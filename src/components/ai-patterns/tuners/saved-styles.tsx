'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Bookmark, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

/**
 * Saved Styles - Allow users to define their own style presets for re-use.
 * Based on the Shape of AI Tuners pattern.
 */
export interface SavedStyle {
  id: string
  name: string
  description?: string
  settings: Record<string, unknown>
}

export interface SavedStylesProps {
  styles: SavedStyle[]
  onSave?: (style: Omit<SavedStyle, 'id'>) => void
  onDelete?: (id: string) => void
  onSelect?: (style: SavedStyle) => void
  className?: string
}

export function SavedStyles({
  styles,
  onSave,
  onDelete,
  onSelect,
  className,
}: SavedStylesProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [newStyle, setNewStyle] = useState({
    name: '',
    description: '',
    settings: '',
  })

  const handleSave = () => {
    if (!newStyle.name || !onSave) return

    try {
      const settings = newStyle.settings ? JSON.parse(newStyle.settings) : {}
      onSave({
        name: newStyle.name,
        description: newStyle.description,
        settings,
      })
      setNewStyle({ name: '', description: '', settings: '' })
      setIsSheetOpen(false)
    } catch (e) {
      alert('Invalid JSON in settings. Please check your format.')
    }
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <Bookmark className='h-5 w-5' />
              Saved Styles
            </CardTitle>
            <CardDescription>
              Create and manage your own style presets
            </CardDescription>
          </div>
          {onSave && (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant='outline' size='sm'>
                  <Plus className='h-4 w-4 mr-2' />
                  New Style
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Create New Style</SheetTitle>
                  <SheetDescription>
                    Define a custom style preset for reuse
                  </SheetDescription>
                </SheetHeader>
                <div className='mt-6 space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='style-name'>Name</Label>
                    <Input
                      id='style-name'
                      placeholder='e.g., Professional Business'
                      value={newStyle.name}
                      onChange={(e) =>
                        setNewStyle({ ...newStyle, name: e.target.value })
                      }
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='style-description'>Description</Label>
                    <Textarea
                      id='style-description'
                      placeholder='Describe this style...'
                      value={newStyle.description}
                      onChange={(e) =>
                        setNewStyle({
                          ...newStyle,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='style-settings'>Settings (JSON)</Label>
                    <Textarea
                      id='style-settings'
                      placeholder='{"tone": "professional", "length": "medium"}'
                      value={newStyle.settings}
                      onChange={(e) =>
                        setNewStyle({ ...newStyle, settings: e.target.value })
                      }
                      className='font-mono text-sm'
                    />
                  </div>
                  <Button onClick={handleSave} className='w-full'>
                    Save Style
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {styles.length === 0 ? (
          <p className='text-sm text-muted-foreground text-center py-8'>
            No saved styles yet. Create one to get started!
          </p>
        ) : (
          <div className='space-y-2'>
            {styles.map((style) => (
              <Card key={style.id}>
                <CardContent className='flex items-center justify-between p-4'>
                  <div
                    className='flex-1 cursor-pointer'
                    onClick={() => onSelect?.(style)}
                  >
                    <div className='flex items-center gap-2 mb-1'>
                      <p className='font-medium'>{style.name}</p>
                      <Badge variant='secondary'>Saved</Badge>
                    </div>
                    {style.description && (
                      <p className='text-sm text-muted-foreground'>
                        {style.description}
                      </p>
                    )}
                    <p className='text-xs text-muted-foreground mt-1'>
                      {Object.keys(style.settings).length} setting
                      {Object.keys(style.settings).length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  {onDelete && (
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8'
                      onClick={() => onDelete(style.id)}
                    >
                      <Trash2 className='h-4 w-4' />
                      <span className='sr-only'>Delete</span>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
