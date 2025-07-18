"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGoals } from "@/hooks/use-goals"
import { Target, TrendingUp, Calendar, Zap } from "lucide-react"

interface SetGoalDialogProps {
  children: React.ReactNode
}

export function SetGoalDialog({ children }: SetGoalDialogProps) {
  const [open, setOpen] = useState(false)
  const [goalTarget, setGoalTarget] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { getCurrentMonthGoal, setMonthlyGoal } = useGoals()

  const currentGoal = getCurrentMonthGoal()
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const target = parseInt(goalTarget)
    
    if (!target || target < 1 || target > 100) {
      return
    }

    setIsLoading(true)

    try {
      setMonthlyGoal(target)
      setGoalTarget("")
      setOpen(false)
    } catch (error) {
      console.error("Error setting goal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const suggestedGoals = [5, 10, 15, 20, 25, 30]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text flex items-center">
            <Target className="h-6 w-6 mr-2 text-green-600" />
            Set Monthly Goal
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Goal Display */}
          {currentGoal && (
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Goal for {currentMonth}</p>
                    <p className="text-2xl font-bold text-green-600">{currentGoal.target} applications</p>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Zap className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Goal Setting Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="goal-target" className="text-sm font-semibold flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Monthly Application Target
              </Label>
              <Input
                id="goal-target"
                type="number"
                min="1"
                max="100"
                value={goalTarget}
                onChange={(e) => setGoalTarget(e.target.value)}
                placeholder="Enter number of applications"
                className="h-12 text-center text-lg font-semibold"
                required
              />
              <p className="text-xs text-muted-foreground">
                Set how many job applications you want to submit in {currentMonth}
              </p>
            </div>

            {/* Quick Goal Suggestions */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Quick Suggestions
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {suggestedGoals.map((goal) => (
                  <Button
                    key={goal}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setGoalTarget(goal.toString())}
                    className={`h-12 text-center ${
                      goalTarget === goal.toString()
                        ? "bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:border-green-600 dark:text-green-400"
                        : "hover:bg-green-50 dark:hover:bg-green-900/20"
                    }`}
                  >
                    <div>
                      <div className="font-bold">{goal}</div>
                      <div className="text-xs opacity-70">apps</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Goal Tips */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">💡 Goal Setting Tips</p>
                    <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Start with 10-15 applications per month for beginners</li>
                      <li>• Active job seekers typically aim for 20-30 per month</li>
                      <li>• Quality over quantity - focus on relevant positions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !goalTarget}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {isLoading ? "Setting..." : currentGoal ? "Update Goal" : "Set Goal"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
