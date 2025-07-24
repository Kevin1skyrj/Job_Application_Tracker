"use client"

import { useAuth } from '@clerk/nextjs'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function useAuthGuard() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Only check auth on dashboard routes
    if (pathname.startsWith('/dashboard')) {
      if (isLoaded && !isSignedIn) {
        console.log('Auth guard: redirecting to sign-in from', pathname)
        router.replace(`/sign-in?redirect_url=${encodeURIComponent(pathname)}`)
      }
    }
  }, [isSignedIn, isLoaded, router, pathname])

  return { isSignedIn, isLoaded }
}
