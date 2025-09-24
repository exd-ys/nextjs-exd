'use client'

import firebase_app from '@/_shared/lib/firebase/config'
import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { ChartBarMultiple } from '@/components/chart-bar-multiple'
import { ChartPieDonut } from '@/components/chart-pie-donut'
import { SectionCards } from '@/components/section-cards'
import DataTableColumnsVisibilityDemo from '@/components/table-11'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

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
      <div className='flex items-center justify-center min-h-screen bg-background'>
        <div className='text-center space-y-4'>
          <div className='animate-spin rounded-full h-16 w-16 border-2 border-primary border-t-transparent mx-auto'></div>
          <p className='text-sm font-medium text-muted-foreground'>
            Loading dashboard...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-1 flex-col p-6'>
      <div className='flex flex-col gap-6'>
        <SectionCards />
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='min-w-0'>
            <ChartAreaInteractive variant='single' />
          </div>
          <div className='min-w-0'>
            <ChartAreaInteractive variant='double' />
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='min-w-0'>
            <ChartBarMultiple />
          </div>
          <div className='min-w-0'>
            <ChartPieDonut />
          </div>
        </div>

        <DataTableColumnsVisibilityDemo />
      </div>
    </div>
  )
}
