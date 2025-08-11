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
      <div className="min-h-screen bg-gradient-to-br from-[#f3f5f4] via-[#ffffff] to-[#d9d8d6] dark:from-[#000000] dark:via-[#33322d] dark:to-[#000000] flex items-center justify-center">
        <div className="text-center">
          <div className="relative h-16 w-44 mx-auto mb-4 flex items-center justify-center overflow-visible">
            <img 
              src="/logo/jobflowblacklogo.png" 
              alt="JobFlow Logo" 
              className="absolute h-28 w-auto object-contain animate-pulse dark:hidden transform scale-150" 
            />
            <img 
              src="/logo/jobflowwhitelogo.png" 
              alt="JobFlow Logo" 
              className="absolute h-28 w-auto object-contain animate-pulse hidden dark:block transform scale-150" 
            />
          </div>
          <div className="text-xl font-semibold gradient-text mb-2">You're already signed in!</div>
          <div className="text-gray-600 dark:text-gray-400 mb-4">Taking you back...</div>
          <button 
            onClick={() => {
              const redirectUrl = searchParams.get('redirect_url') || '/dashboard'
              router.replace(redirectUrl)
            }}
            className="px-6 py-2 bg-gradient-to-r from-[#33322d] to-[#6f706b] text-white rounded-lg hover:from-[#000000] hover:to-[#33322d] transition-all"
          >
            Go Now
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f5f4] via-[#ffffff] to-[#d9d8d6] dark:from-[#000000] dark:via-[#33322d] dark:to-[#000000] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="relative h-16 w-44 mx-auto mb-4 flex items-center justify-center overflow-visible">
            <img 
              src="/logo/jobflowblacklogo.png" 
              alt="JobFlow Logo" 
              className="absolute h-28 w-auto object-contain dark:hidden transform scale-150" 
            />
            <img 
              src="/logo/jobflowwhitelogo.png" 
              alt="JobFlow Logo" 
              className="absolute h-28 w-auto object-contain hidden dark:block transform scale-150" 
            />
          </div>
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
