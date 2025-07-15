import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in">
      <div>
        <h1 className="text-4xl font-bold gradient-text">Analytics & Insights</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Deep dive into your job search performance</p>
      </div>

      <AnalyticsDashboard />
    </div>
  )
}
