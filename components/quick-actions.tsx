"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Target, Calendar, Bell } from "lucide-react"
import { AddJobDialog } from "@/components/add-job-dialog"
import { SetGoalDialog } from "@/components/set-goal-dialog"

export function QuickActions() {
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

          <Button variant="outline" className="hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent">
            <Calendar className="h-4 w-4 mr-2 text-purple-600" />
            Schedule
          </Button>

          <div className="flex items-center gap-2 ml-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Bell className="h-3 w-3" />3 reminders
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
