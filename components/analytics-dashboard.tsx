"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, TrendingDown, Target, Calendar, Award, Zap } from "lucide-react"

// Mock data - replace with real data from your backend
const applicationTrends = [
  { month: "Jan", applications: 12, interviews: 3, offers: 1 },
  { month: "Feb", applications: 18, interviews: 5, offers: 2 },
  { month: "Mar", applications: 15, interviews: 4, offers: 1 },
  { month: "Apr", applications: 22, interviews: 7, offers: 3 },
  { month: "May", applications: 28, interviews: 9, offers: 2 },
  { month: "Jun", applications: 25, interviews: 8, offers: 4 },
]

const statusDistribution = [
  { name: "Applied", value: 45, color: "#3b82f6" },
  { name: "Interviewing", value: 12, color: "#eab308" },
  { name: "Offers", value: 8, color: "#22c55e" },
  { name: "Rejected", value: 23, color: "#ef4444" },
]

const companyTypes = [
  { type: "Startup", count: 25, avgResponse: "3 days" },
  { type: "Mid-size", count: 18, avgResponse: "5 days" },
  { type: "Enterprise", count: 12, avgResponse: "7 days" },
  { type: "Agency", count: 8, avgResponse: "4 days" },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 days</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              12% faster than last month
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              8% higher than average
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offer Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18%</div>
            <div className="flex items-center text-xs text-blue-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              Industry average: 15%
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Goal</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <div className="flex items-center text-xs text-purple-600">
              <Target className="h-3 w-3 mr-1" />
              17/20 applications
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Application Trends */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Application Trends</CardTitle>
            <CardDescription>Your job search activity over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                applications: { label: "Applications", color: "hsl(var(--chart-1))" },
                interviews: { label: "Interviews", color: "hsl(var(--chart-2))" },
                offers: { label: "Offers", color: "hsl(var(--chart-3))" },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={applicationTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="applications" stroke="var(--color-applications)" strokeWidth={3} />
                  <Line type="monotone" dataKey="interviews" stroke="var(--color-interviews)" strokeWidth={3} />
                  <Line type="monotone" dataKey="offers" stroke="var(--color-offers)" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>Current distribution of your applications</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                applied: { label: "Applied", color: "#3b82f6" },
                interviewing: { label: "Interviewing", color: "#eab308" },
                offers: { label: "Offers", color: "#22c55e" },
                rejected: { label: "Rejected", color: "#ef4444" },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Company Analysis */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle>Company Type Analysis</CardTitle>
          <CardDescription>Performance breakdown by company size</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyTypes.map((company, index) => (
              <div key={company.type} className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                <h3 className="font-semibold text-lg mb-2">{company.type}</h3>
                <div className="text-2xl font-bold text-blue-600 mb-1">{company.count}</div>
                <p className="text-sm text-muted-foreground mb-2">Applications</p>
                <Badge variant="outline">{company.avgResponse} avg response</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle>Insights & Recommendations</CardTitle>
          <CardDescription>Personalized tips to improve your job search</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">Strong Performance</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Your interview rate is 8% above industry average. Keep applying to similar roles!
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Target className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100">Optimization Tip</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Consider following up on applications after 5 days to improve response rates.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Award className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-green-900 dark:text-green-100">Success Pattern</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  You have the highest success rate with mid-size companies. Focus more on this segment.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
