"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, TrendingDown, Target, Calendar, Award, Zap } from "lucide-react"
import { useJobsContext } from "@/contexts/jobs-context"
import { useGoalsContext } from "@/contexts/goals-context"

// Utility: Get last 6 months labels
function getLast6Months() {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.toLocaleString('default', { month: 'short' }));
  }
  return months;
}

import type { Job } from "@/types/job";

// Utility: Calculate average response time (in days)
function getAvgResponseTime(jobs: Job[]): string {
  const responded = jobs.filter((j: Job) => j.responseDate && j.appliedDate);
  if (responded.length === 0) return '--';
  const total = responded.reduce((sum: number, j: Job) => {
    const responseDate = j.responseDate instanceof Date ? j.responseDate : new Date(j.responseDate as any);
    const appliedDate = j.appliedDate instanceof Date ? j.appliedDate : new Date(j.appliedDate as any);
    return sum + (responseDate.getTime() - appliedDate.getTime());
  }, 0);
  return (total / responded.length / (1000 * 60 * 60 * 24)).toFixed(1) + ' days';
}

// Utility: Calculate interview rate
function getInterviewRate(jobs: Job[]): string {
  if (!jobs.length) return '--';
  const interviewed = jobs.filter((j: Job) => j.status === 'interviewing' || j.status === 'offer');
  return Math.round((interviewed.length / jobs.length) * 100) + '%';
}

// Utility: Calculate offer rate
function getOfferRate(jobs: Job[]): string {
  if (!jobs.length) return '--';
  const offers = jobs.filter((j: Job) => j.status === 'offer');
  return Math.round((offers.length / jobs.length) * 100) + '%';
}

// Utility: Status distribution
function getStatusDistribution(jobs: Job[]) {
  const statusMap = {
    Applied: { name: 'Applied', value: 0, color: '#3b82f6' },
    Interviewing: { name: 'Interviewing', value: 0, color: '#eab308' },
    Offers: { name: 'Offers', value: 0, color: '#22c55e' },
    Rejected: { name: 'Rejected', value: 0, color: '#ef4444' },
  };
  jobs.forEach((j: Job) => {
    if (j.status === 'applied') statusMap.Applied.value++;
    else if (j.status === 'interviewing') statusMap.Interviewing.value++;
    else if (j.status === 'offer') statusMap.Offers.value++;
    else if (j.status === 'rejected') statusMap.Rejected.value++;
  });
  return Object.values(statusMap);
}

// Utility: Application trends (last 6 months)
function getApplicationTrends(jobs: Job[]) {
  const months = getLast6Months();
  const trends = months.map((month, idx) => {
    // Get the year/month for this slot
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - idx));
    const year = d.getFullYear();
    const m = d.getMonth();
    // Filter jobs for this month
    const jobsInMonth = jobs.filter((j: Job) => {
      const applied = j.appliedDate instanceof Date ? j.appliedDate : new Date(j.appliedDate as any);
      return applied.getMonth() === m && applied.getFullYear() === year;
    });
    return {
      month,
      applications: jobsInMonth.length,
      interviews: jobsInMonth.filter((j: Job) => j.status === 'interviewing' || j.status === 'offer').length,
      offers: jobsInMonth.filter((j: Job) => j.status === 'offer').length,
    };
  });
  return trends;
}

// Utility: Company type analysis (example based on job.companyType)
function getCompanyTypes(jobs: Job[]) {
  // You may need to adjust this if your job objects have a different structure
  const types = ['Startup', 'Mid-size', 'Enterprise', 'Agency'];
  return types.map(type => {
    const jobsOfType = jobs.filter((j: Job) => (j as any).companyType === type);
    return {
      type,
      count: jobsOfType.length,
      avgResponse: getAvgResponseTime(jobsOfType),
    };
  });
}

export function AnalyticsDashboard() {
  const { jobs = [] } = useJobsContext();
  const { getCurrentMonthGoal, calculateMonthlyProgress } = useGoalsContext();

  // Calculate current month applications
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const jobsThisMonth = jobs.filter(job => {
    const jobDate = new Date(job.appliedDate);
    return jobDate.getMonth() === currentMonth && jobDate.getFullYear() === currentYear;
  }).length;

  const currentGoal = getCurrentMonthGoal();
  const progress = calculateMonthlyProgress(jobsThisMonth);

  // Analytics derived from jobs
  const avgResponseTime = getAvgResponseTime(jobs);
  const interviewRate = getInterviewRate(jobs);
  const offerRate = getOfferRate(jobs);
  const statusDistribution = getStatusDistribution(jobs);
  const applicationTrends = getApplicationTrends(jobs);
  const companyTypes = getCompanyTypes(jobs);

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
            <div className="text-2xl font-bold">{avgResponseTime}</div>
            {/* You can add a trend indicator here if you calculate it */}
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interviewRate}</div>
            {/* You can add a trend indicator here if you calculate it */}
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offer Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offerRate}</div>
            {/* You can add a trend indicator here if you calculate it */}
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Goal</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {currentGoal ? (
              <>
                <div className="text-2xl font-bold">{Math.min(progress.percentage, 100)}%</div>
                <div className="flex items-center text-xs text-purple-600">
                  <Target className="h-3 w-3 mr-1" />
                  {jobsThisMonth}/{currentGoal.target} applications
                </div>
                {progress.percentage >= 100 && (
                  <div className="mt-1 text-xs text-green-600 font-medium">🎉 Goal achieved!</div>
                )}
                {progress.remaining > 0 && progress.percentage < 100 && (
                  <div className="mt-1 text-xs text-orange-600">{progress.remaining} more to go</div>
                )}
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-muted-foreground">--</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Target className="h-3 w-3 mr-1" />
                  No goal set
                </div>
              </>
            )}
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
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
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
