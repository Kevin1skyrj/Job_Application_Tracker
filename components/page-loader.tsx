"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300) // Short delay to show the loader

    return () => clearTimeout(timer)
  }, [pathname])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated Logo/Icon */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-2 w-12 h-12 border-4 border-transparent border-t-primary/60 rounded-full animate-spin animation-delay-150" />
          <div className="absolute inset-4 w-8 h-8 border-4 border-transparent border-t-primary/40 rounded-full animate-spin animation-delay-300" />
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground animate-pulse">
            Loading...
          </h3>
          <p className="text-sm text-muted-foreground">
            Please wait while we prepare your page
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full animate-loading-progress" />
        </div>
      </div>
    </div>
  )
}

// Alternative minimal loader
export function MinimalLoader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-gradient-to-r from-primary via-primary/80 to-primary animate-loading-bar shadow-sm" />
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" />
    </div>
  )
}

// Skeleton loader for page content
export function PageSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-muted rounded w-48" />
        <div className="h-10 bg-muted rounded w-32" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 bg-card rounded-lg border space-y-3">
            <div className="h-4 bg-muted rounded w-20" />
            <div className="h-8 bg-muted rounded w-12" />
            <div className="h-3 bg-muted rounded w-16" />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="h-6 bg-muted rounded w-24" />
            <div className="space-y-3">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="p-4 bg-card rounded-lg border space-y-2">
                  <div className="h-4 bg-muted rounded w-32" />
                  <div className="h-3 bg-muted rounded w-24" />
                  <div className="h-3 bg-muted rounded w-20" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
