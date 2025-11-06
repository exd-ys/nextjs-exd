'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Footprints } from 'lucide-react'

/**
 * FootprintsButton - A "Footprints" or trust/audit button that opens a sheet with metadata.
 * Part of the Trust Builders category - gives users confidence that AI results are ethical, accurate, and trustworthy.
 * Uses shadcn Sheet and Button components.
 */
export interface Reviewer {
  name: string
  role: string
  approvedAt: string
}

export interface FootprintsData {
  model: string
  sources: string[]
  safety: {
    level: string
    checks: string[]
  }
  generatedAt: string
  traceId: string
  reviewers?: Reviewer[]
}

export interface FootprintsButtonProps {
  data: FootprintsData
  className?: string
}

export function FootprintsButton({ data, className }: FootprintsButtonProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='sm' className={cn('gap-2', className)}>
          <Footprints className='h-4 w-4' />
          Footprints
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='w-full sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>AI Footprints</SheetTitle>
          <SheetDescription>
            Trust and audit information for this AI-generated content.
          </SheetDescription>
        </SheetHeader>
        <div className='mt-6 space-y-6'>
          <div>
            <h3 className='mb-2 text-sm font-semibold'>Model</h3>
            <p className='text-sm text-muted-foreground'>{data.model}</p>
          </div>

          <div>
            <h3 className='mb-2 text-sm font-semibold'>Sources</h3>
            <ul className='space-y-1'>
              {data.sources.map((source, index) => (
                <li key={index} className='text-sm text-muted-foreground'>
                  • {source}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='mb-2 text-sm font-semibold'>Safety</h3>
            <div className='space-y-1'>
              <p className='text-sm text-muted-foreground'>
                Level: {data.safety.level}
              </p>
              <ul className='space-y-1'>
                {data.safety.checks.map((check, index) => (
                  <li key={index} className='text-sm text-muted-foreground'>
                    ✓ {check}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className='mb-2 text-sm font-semibold'>Metadata</h3>
            <div className='space-y-1 text-sm text-muted-foreground'>
              <p>Generated: {new Date(data.generatedAt).toLocaleString()}</p>
              <p>Trace ID: {data.traceId}</p>
            </div>
          </div>

          {data.reviewers && data.reviewers.length > 0 && (
            <div>
              <h3 className='mb-2 text-sm font-semibold'>Reviewers</h3>
              <div className='space-y-2'>
                {data.reviewers.map((reviewer, index) => (
                  <div key={index} className='text-sm'>
                    <p className='font-medium'>{reviewer.name}</p>
                    <p className='text-muted-foreground'>{reviewer.role}</p>
                    <p className='text-xs text-muted-foreground'>
                      Approved: {new Date(reviewer.approvedAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
