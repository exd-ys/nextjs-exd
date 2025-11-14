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
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export interface ControlSetting {
  id: string
  label: string
  description: string
  enabled: boolean
}

export interface ControlsProps {
  settings: ControlSetting[]
  onChange?: (settings: ControlSetting[]) => void
  onPause?: () => void
  isPaused?: boolean
  className?: string
}

export function Controls({
  settings,
  onChange,
  onPause,
  isPaused,
  className,
}: ControlsProps) {
  const [localSettings, setLocalSettings] = useState(settings)

  const handleToggle = (settingId: string, enabled: boolean) => {
    setLocalSettings((prev) => {
      const updated = prev.map((item) =>
        item.id === settingId ? { ...item, enabled } : item
      )
      onChange?.(updated)
      return updated
    })
  }

  return (
    <Card className={cn('w-full max-w-lg', className)}>
      <CardHeader>
        <CardTitle>Controls</CardTitle>
        <CardDescription>
          Manage how much autonomy the assistant has during this session.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {localSettings.map((setting) => (
          <div
            key={setting.id}
            className='flex items-start justify-between gap-4 rounded-lg border p-4'
          >
            <div className='space-y-1'>
              <Label htmlFor={setting.id} className='text-sm font-medium'>
                {setting.label}
              </Label>
              <p className='text-sm text-muted-foreground'>
                {setting.description}
              </p>
            </div>
            <Switch
              id={setting.id}
              checked={setting.enabled}
              onCheckedChange={(checked) =>
                handleToggle(setting.id, Boolean(checked))
              }
              aria-label={setting.label}
            />
          </div>
        ))}
      </CardContent>
      <CardFooter className='flex justify-end gap-2'>
        <Button variant='outline' onClick={onPause}>
          {isPaused ? 'Resume assistant' : 'Pause assistant'}
        </Button>
      </CardFooter>
    </Card>
  )
}
