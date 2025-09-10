'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Login from './(external)/login/Login'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is already authenticated
    // For now, we'll always show the login page
    // In a real app, you'd check for auth tokens here
  }, [])

  return <Login />
}
