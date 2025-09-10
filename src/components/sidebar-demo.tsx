'use client'

import { AppSidebar } from '@/components/app-sidebar'
import { Button } from '@/components/ui/button'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { useState } from 'react'

export function SidebarDemo() {
  const [side, setSide] = useState<'left' | 'right' | 'top'>('left')

  return (
    <div className='space-y-4'>
      <div className='flex gap-2'>
        <Button
          variant={side === 'left' ? 'default' : 'outline'}
          onClick={() => setSide('left')}
        >
          Left Sidebar
        </Button>
        <Button
          variant={side === 'right' ? 'default' : 'outline'}
          onClick={() => setSide('right')}
        >
          Right Sidebar
        </Button>
        <Button
          variant={side === 'top' ? 'default' : 'outline'}
          onClick={() => setSide('top')}
        >
          Top Bar
        </Button>
      </div>

      <div className='border rounded-lg overflow-hidden h-96'>
        <SidebarProvider>
          <AppSidebar variant='sidebar' side={side} />
          <SidebarInset>
            <div className='p-6 h-full'>
              <h2 className='text-2xl font-bold mb-4'>
                Sidebar Demo -{' '}
                {side === 'top'
                  ? 'Top Bar'
                  : `${side.charAt(0).toUpperCase() + side.slice(1)} Sidebar`}
              </h2>
              <p className='text-muted-foreground mb-4'>
                This demonstrates the sidebar component with different
                positioning options. The sidebar can be positioned on the left,
                right, or as a top bar.
              </p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='p-4 border rounded-lg'>
                  <h3 className='font-semibold mb-2'>Content Area 1</h3>
                  <p className='text-sm text-muted-foreground'>
                    This content should be properly spaced based on the sidebar
                    position.
                  </p>
                </div>
                <div className='p-4 border rounded-lg'>
                  <h3 className='font-semibold mb-2'>Content Area 2</h3>
                  <p className='text-sm text-muted-foreground'>
                    Notice how the layout adapts to different sidebar positions.
                  </p>
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  )
}
