'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { EyeOff } from 'lucide-react'

export interface IncognitoModeProps {
  enabled?: boolean
  onToggle?: (enabled: boolean) => void
  onClearHistory?: () => void
  className?: string
}

export function IncognitoMode({
  enabled = false,
  onToggle,
  onClearHistory,
  className,
}: IncognitoModeProps) {
  const [localEnabled, setLocalEnabled] = useState(enabled)

  const handleToggle = (checked: boolean) => {
    setLocalEnabled(checked)
    onToggle?.(checked)
  }

  return (
    <Card className={cn('w-full max-w-lg', className)}>
      <CardHeader className='flex-row items-center justify-between gap-4'>
        <div className='space-y-1'>
          <CardTitle className='flex items-center gap-2'>
            <EyeOff
              className='h-5 w-5 text-muted-foreground'
              aria-hidden='true'
            />
            Incognito mode
          </CardTitle>
          <CardDescription>
            Interact outside of the assistant&apos;s memory. Data will not be
            saved.
          </CardDescription>
        </div>
        <Switch
          checked={localEnabled}
          onCheckedChange={handleToggle}
          aria-label='Toggle incognito mode'
        />
      </CardHeader>
      <CardContent className='space-y-2 text-sm text-muted-foreground'>
        <p>
          When incognito is on, the assistant forgets the conversation after the
          session ends. Attachments and follow-up prompts won&apos;t be
          retained.
        </p>
        <p>
          You can still export the transcript before leaving if you need a copy.
        </p>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button variant='outline' size='sm' onClick={onClearHistory}>
          Clear session history
        </Button>
      </CardFooter>
    </Card>
  )
}
