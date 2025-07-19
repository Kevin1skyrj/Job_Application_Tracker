"use client"

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthRedirectPage() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        router.push('/dashboard')
      } else {
        router.push('/sign-in')
      }
    }
  }, [isLoaded, isSignedIn, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <img 
          src="/logo/logoJobflow.png" 
          alt="JobFlow Logo" 
          className="h-16 w-auto object-contain mx-auto mb-4 animate-pulse" 
        />
        <div className="text-xl font-semibold gradient-text mb-2">Redirecting...</div>
        <div className="text-gray-600 dark:text-gray-400">Please wait while we redirect you</div>
      </div>
    </div>
  )
}
