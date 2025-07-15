"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Clock, CheckCircle, TrendingUp } from "lucide-react"
import { useJobs } from "@/hooks/use-jobs"

export function JobStats() {
  const { jobs } = useJobs()

  const stats = {
    total: jobs?.length || 0,
    applied: jobs?.filter((job) => job.status === "applied").length || 0,
    interviewing: jobs?.filter((job) => job.status === "interviewing").length || 0,
    offers: jobs?.filter((job) => job.status === "offer").length || 0,
    rejected: jobs?.filter((job) => job.status === "rejected").length || 0,
  }

  const successRate = stats.total > 0 ? ((stats.offers / stats.total) * 100).toFixed(1) : "0"
  const responseRate = stats.total > 0 ? (((stats.interviewing + stats.offers) / stats.total) * 100).toFixed(1) : "0"

  const statCards = [
    {
      title: "Total Applications",
      value: stats.total,
      subtitle: `${stats.applied} pending review`,
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      trend: "+12% this month",
    },
    {
      title: "Active Interviews",
      value: stats.interviewing,
      subtitle: "In progress",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      trend: "+3 this week",
    },
    {
      title: "Job Offers",
      value: stats.offers,
      subtitle: `${successRate}% success rate`,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      trend: "🎉 Great job!",
    },
    {
      title: "Response Rate",
      value: `${responseRate}%`,
      subtitle: "Interview + Offer rate",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      trend: "Above average",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card
          key={stat.title}
          className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{stat.value}</div>
            <p className="text-sm text-muted-foreground mb-2">{stat.subtitle}</p>
            <Badge variant="secondary" className="text-xs">
              {stat.trend}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
