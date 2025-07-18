"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { PageLoader, MinimalLoader } from "@/components/page-loader"

interface NavigationContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  navigateWithLoader: (href: string) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  // Hide initial loading after first render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Handle route changes
  useEffect(() => {
    if (!isInitialLoad) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 800) // Increased timing to show the loader better

      return () => clearTimeout(timer)
    }
  }, [pathname, isInitialLoad])

  const navigateWithLoader = (href: string) => {
    if (href !== pathname) {
      setIsLoading(true)
      router.push(href)
    }
  }

  return (
    <NavigationContext.Provider value={{ isLoading, setIsLoading, navigateWithLoader }}>
      {children}
      {isLoading && <MinimalLoader />}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
