"use client"

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'

interface DashboardGuardProps {
  children: ReactNode
}

export function DashboardGuard({ children }: DashboardGuardProps) {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <img 
            src="/logo/logoJobflow.png" 
            alt="JobFlow Logo" 
            className="h-16 w-auto object-contain mx-auto mb-4 animate-pulse" 
          />
          <div className="text-xl font-semibold gradient-text mb-2">Loading...</div>
          <div className="text-gray-600 dark:text-gray-400">Please wait</div>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    return null // Will redirect via useEffect
  }

  return <>{children}</>
}
