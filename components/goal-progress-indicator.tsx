"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useJobsContext } from "@/contexts/jobs-context"
import { useGoals } from "@/hooks/use-goals"
import { SetGoalDialog } from "@/components/set-goal-dialog"
import { Target, TrendingUp, Calendar } from "lucide-react"

export function GoalProgressIndicator() {
  const { jobs } = useJobsContext()
  const { getCurrentMonthGoal, calculateMonthlyProgress } = useGoals()

  // Calculate current month applications
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const jobsThisMonth = jobs?.filter(job => {
    const jobDate = new Date(job.appliedDate)
    return jobDate.getMonth() === currentMonth && jobDate.getFullYear() === currentYear
  }).length || 0

  const currentGoal = getCurrentMonthGoal()
  const progress = calculateMonthlyProgress(jobsThisMonth)
  const currentMonthName = new Date().toLocaleDateString('en-US', { month: 'long' })

  if (!currentGoal) {
    return (
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-dashed">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <Target className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">No goal set for {currentMonthName}</p>
                <p className="text-xs text-gray-500">Set a monthly target to track your progress</p>
              </div>
            </div>
            <SetGoalDialog>
              <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                Set Goal
              </Badge>
            </SetGoalDialog>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800 dark:text-green-200">
                  {currentMonthName} Goal Progress
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  {jobsThisMonth} of {currentGoal.target} applications
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-700 dark:text-green-300">
                {Math.min(progress.percentage, 100)}%
              </div>
              {progress.percentage >= 100 ? (
                <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs">
                  🎉 Achieved!
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-xs">
                  {progress.remaining} to go
                </Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Progress 
              value={Math.min(progress.percentage, 100)} 
              className="h-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Started</span>
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {Math.round((new Date().getDate() / new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()) * 100)}% of month
              </span>
              <span>Target</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
