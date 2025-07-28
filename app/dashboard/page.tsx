"use client"

import { JobBoard } from "@/components/job-board"
import { JobStats } from "@/components/job-stats"
import { QuickActions } from "@/components/quick-actions"
import { GoalProgressIndicator } from "@/components/goal-progress-indicator"
// import { NetworkStatus } from "@/components/network-status" // Removed for now
import { useUser, useAuth } from '@clerk/nextjs'

export default function DashboardPage() {
  const { user, isLoaded: userLoaded } = useUser()
  const { isSignedIn, isLoaded: authLoaded } = useAuth()

  // Show loading state while authentication is being checked
  if (!authLoaded || !userLoaded) {
    return (
      <div className="space-y-8 animate-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold gradient-text">Loading Dashboard...</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Please wait while we load your data</p>
          </div>
        </div>
      </div>
    )
  }

  // If not signed in, show a message (this shouldn't happen due to middleware)
  if (!isSignedIn) {
    return (
      <div className="space-y-8 animate-in">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold gradient-text mb-2">Access Denied</h1>
            <p className="text-gray-600 dark:text-gray-400">Please sign in to access your dashboard</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Track and manage your job search journey</p>
        </div>
        <QuickActions />
      </div>

      <GoalProgressIndicator />
      <JobStats />
      <JobBoard />
      {/* <NetworkStatus /> */}
    </div>
  )
}
