"use client"

import { SignIn } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [hasRedirected, setHasRedirected] = useState(false)

  useEffect(() => {
    if (isLoaded && isSignedIn && !hasRedirected) {
      setHasRedirected(true)
      const redirectUrl = searchParams.get('redirect_url') || '/dashboard'
      
      // Use replace to avoid back button issues
      setTimeout(() => {
        router.replace(redirectUrl)
      }, 100)
    }
  }, [isLoaded, isSignedIn, router, searchParams, hasRedirected])

  // If user is already signed in, show loading while redirecting
  if (isLoaded && isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <img 
            src="/logo/logoJobflow.png" 
            alt="JobFlow Logo" 
            className="h-16 w-auto object-contain mx-auto mb-4 animate-pulse" 
          />
          <div className="text-xl font-semibold gradient-text mb-2">You're already signed in!</div>
          <div className="text-gray-600 dark:text-gray-400 mb-4">Taking you back...</div>
          <button 
            onClick={() => {
              const redirectUrl = searchParams.get('redirect_url') || '/dashboard'
              router.replace(redirectUrl)
            }}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Go Now
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src="/logo/logoJobflow.png" 
            alt="JobFlow Logo" 
            className="h-16 w-auto object-contain mx-auto mb-4" 
          />
          <h1 className="text-2xl font-bold gradient-text">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to your JobFlow account</p>
        </div>
        <SignIn 
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          afterSignInUrl={searchParams.get('redirect_url') || '/dashboard'}
          redirectUrl={searchParams.get('redirect_url') || '/dashboard'}
        />
      </div>
    </div>
  )
}
