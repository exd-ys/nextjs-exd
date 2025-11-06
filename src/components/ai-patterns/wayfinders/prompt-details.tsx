'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Info } from 'lucide-react'

/**
 * PromptDetails - Shows users what is actually happening behind the scenes.
 * Based on the Shape of AI Wayfinders pattern.
 */
export interface PromptDetail {
  label: string
  value: string | number | boolean
  description?: string
}

export interface PromptDetailsProps {
  details: PromptDetail[]
  title?: string
  description?: string
  className?: string
}

export function PromptDetails({
  details,
  title = 'Prompt Details',
  description = "View what's happening behind the scenes",
  className,
}: PromptDetailsProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='sm' className={cn('gap-2', className)}>
          <Info className='h-4 w-4' />
          {title}
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='w-full sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className='mt-6 space-y-4'>
          {details.map((detail, index) => (
            <Card key={index}>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm'>{detail.label}</CardTitle>
                {detail.description && (
                  <CardDescription className='text-xs'>
                    {detail.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <p className='text-sm font-mono bg-muted p-2 rounded break-all'>
                  {String(detail.value)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
