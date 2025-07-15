import { JobBoard } from "@/components/job-board"
import { JobStats } from "@/components/job-stats"
import { QuickActions } from "@/components/quick-actions"

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Job Applications</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Track and manage your job search journey</p>
        </div>
        <QuickActions />
      </div>

      <JobStats />
      <JobBoard />
    </div>
  )
}
