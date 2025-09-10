'use client'

import firebase_app from '@/_shared/lib/firebase/config'
import { AppSidebar } from '@/components/app-sidebar'
import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { DataTable } from '@/components/data-table'
import { SectionCards } from '@/components/section-cards'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import data from './data.json'

export default function Page() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarSide, setSidebarSide] = useState<'left' | 'right' | 'top'>(
    'left'
  )

  useEffect(() => {
    // Check if Firebase is configured and available
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !firebase_app) {
      // For development/demo purposes, show dashboard without auth
      setIsLoading(false)
      return
    }

    try {
      const auth = getAuth(firebase_app)

      // Check if user is authenticated
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, show dashboard
          setIsLoading(false)
        } else {
          // User is not signed in, redirect to login
          router.push('/')
        }
      })

      // Cleanup subscription on unmount
      return () => unsubscribe()
    } catch (error) {
      console.warn('Firebase auth not available:', error)
      // Show dashboard anyway for demo purposes
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
          <p className='mt-4 text-gray-600'>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant='sidebar' side='left' />
      <SidebarInset>
        {/* Show SiteHeader for left and right sidebars, hide for top bar */}
        {sidebarSide !== 'top' && <SiteHeader />}
        <div className='flex flex-1 flex-col'>
          {/* Sidebar Position Controls for testing purposes */}
          {/* <div className='flex gap-2 p-4 border-b bg-gray-50'>
            <span className='text-sm font-medium self-center'>
              Sidebar Position:
            </span>
            <Button
              variant={sidebarSide === 'left' ? 'default' : 'outline'}
              size='sm'
              onClick={() => setSidebarSide('left')}
            >
              Left
            </Button>
            <Button
              variant={sidebarSide === 'right' ? 'default' : 'outline'}
              size='sm'
              onClick={() => setSidebarSide('right')}
            >
              Right
            </Button>
            <Button
              variant={sidebarSide === 'top' ? 'default' : 'outline'}
              size='sm'
              onClick={() => setSidebarSide('top')}
            >
              Top
            </Button>
          </div> */}
          <div className='@container/main flex flex-1 flex-col gap-2'>
            <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
              <SectionCards />
              <div className='px-4 lg:px-6'>
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
