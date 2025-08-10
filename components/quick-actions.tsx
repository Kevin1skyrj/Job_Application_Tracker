"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Target, Calendar, Bell } from "lucide-react"
import { AddJobDialog } from "@/components/add-job-dialog"
import { SetGoalDialog } from "@/components/set-goal-dialog"
import { ScheduleDialog } from "@/components/schedule-dialog"
import { RemindersDialog } from "@/components/reminders-dialog"
import { useReminders } from "@/contexts/reminders-context"

export function QuickActions() {
  const { getReminderCount, getHighPriorityCount } = useReminders()
  const reminderCount = getReminderCount()
  const highPriorityCount = getHighPriorityCount()

  return (
    <Card className="shadow-lg border-0">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <AddJobDialog>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Add Job
            </Button>
          </AddJobDialog>

          <SetGoalDialog>
            <Button variant="outline" className="hover:bg-green-50 dark:hover:bg-green-900/20 bg-transparent">
              <Target className="h-4 w-4 mr-2 text-green-600" />
              Set Goal
            </Button>
          </SetGoalDialog>

          <ScheduleDialog>
            <Button variant="outline" className="hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent">
              <Calendar className="h-4 w-4 mr-2 text-purple-600" />
              Schedule
            </Button>
          </ScheduleDialog>

          <div className="flex items-center gap-2 ml-4">
            <RemindersDialog>
              <div className="relative group cursor-pointer">
                <Badge 
                  variant="secondary" 
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-all duration-300 border shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${
                    highPriorityCount > 0 
                      ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200 dark:from-red-900/20 dark:to-red-800/30 dark:text-red-400 dark:border-red-800/50 hover:from-red-100 hover:to-red-200 dark:hover:from-red-900/30 dark:hover:to-red-800/40' 
                      : reminderCount > 0
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200 dark:from-blue-900/20 dark:to-purple-900/20 dark:text-blue-400 dark:border-blue-800/50 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30'
                        : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 border-gray-200 dark:from-gray-800/50 dark:to-gray-700/50 dark:text-gray-400 dark:border-gray-700/50 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800/70 dark:hover:to-gray-700/70'
                  }`}
                >
                  <div className="relative">
                    <Bell className={`h-4 w-4 transition-all duration-300 ${
                      reminderCount > 0 ? 'group-hover:scale-110' : ''
                    }`} />
                    
                    {/* Pulsing dot for high priority */}
                    {highPriorityCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    )}
                  </div>
                  
                  <span className="text-sm">
                    {reminderCount === 0 ? 'No reminders' : `${reminderCount} reminder${reminderCount !== 1 ? 's' : ''}`}
                  </span>
                  
                  {/* High Priority Indicator */}
                  {highPriorityCount > 0 && (
                    <div className="flex items-center">
                      <div className="w-1 h-4 bg-red-500 rounded-full mr-1" />
                      <span className="text-xs font-bold px-1.5 py-0.5 bg-red-500 text-white rounded-full">
                        {highPriorityCount}
                      </span>
                    </div>
                  )}
                </Badge>
                
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm ${
                  highPriorityCount > 0 ? 'bg-red-400' : 'bg-blue-400'
                }`} />
              </div>
            </RemindersDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
