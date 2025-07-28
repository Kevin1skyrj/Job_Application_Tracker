"use client"

import { useJobs } from "@/hooks/use-jobs"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NetworkStatus() {
  const { isOnline, refreshJobs, isLoading } = useJobs()

  if (isOnline) {
    return null // Don't show anything when online
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2">
          <WifiOff className="h-4 w-4 text-yellow-600" />
          <Badge variant="outline" className="text-yellow-700 border-yellow-300">
            Offline Mode
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshJobs}
            disabled={isLoading}
            className="h-6 px-2"
          >
            {isLoading ? (
              <RefreshCw className="h-3 w-3 animate-spin" />
            ) : (
              <RefreshCw className="h-3 w-3" />
            )}
          </Button>
        </div>
        <p className="text-xs text-yellow-600 mt-1">
          Using cached data. Changes will sync when online.
        </p>
      </div>
    </div>
  )
}
