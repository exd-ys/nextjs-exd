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
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
          <p className='mt-4 text-gray-600'>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6 bg-[#EDF3FF]'>
          <SectionCards />
          <div className='flex flex-col md:flex-row gap-6 px-4 lg:px-6'>
            <div className='flex-1 min-w-0'>
              <ChartAreaInteractive variant='single' />
            </div>
            <div className='flex-1 min-w-0'>
              <ChartAreaInteractive variant='double' />
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-6 px-4 lg:px-6'>
            <div className='flex-1 min-w-0'>
              <ChartBarMultiple />
            </div>
            <div className='flex-1 min-w-0'>
              <ChartPieDonut />
            </div>
          </div>
          <div className='bg-white rounded-lg px-4 lg:px-6'>
            <DataTableColumnsVisibilityDemo />
          </div>
        </div>
      </div>
    </div>
  )
}
