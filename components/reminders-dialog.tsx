"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useReminders } from "@/hooks/use-reminders"
import { Bell, Calendar, Clock, CheckCircle, Trash2, AlertTriangle, Phone, Mail, Target, User } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"

interface RemindersDialogProps {
  children: React.ReactNode
}

export function RemindersDialog({ children }: RemindersDialogProps) {
  const [open, setOpen] = useState(false)
  const { 
    getActiveReminders, 
    getOverdueReminders, 
    getUpcomingReminders,
    completeReminder, 
    deleteReminder 
  } = useReminders()

  const activeReminders = getActiveReminders()
  const overdueReminders = getOverdueReminders()
  const upcomingReminders = getUpcomingReminders()

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "interview": return Phone
      case "follow-up": return Mail
      case "deadline": return Target
      default: return Bell
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "interview": return "text-blue-600 bg-blue-100 dark:bg-blue-900/30"
      case "follow-up": return "text-green-600 bg-green-100 dark:bg-green-900/30"
      case "deadline": return "text-red-600 bg-red-100 dark:bg-red-900/30"
      default: return "text-purple-600 bg-purple-100 dark:bg-purple-900/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-red-500 bg-red-50 dark:bg-red-900/10"
      case "medium": return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10"
      default: return "border-l-blue-500 bg-blue-50 dark:bg-blue-900/10"
    }
  }

  const ReminderCard = ({ reminder }: { reminder: any }) => {
    const TypeIcon = getTypeIcon(reminder.type)
    const isOverdue = new Date(reminder.dueDate) < new Date()

    return (
      <Card className={`border-l-4 ${getPriorityColor(reminder.priority)} hover:shadow-md transition-all duration-200`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <div className={`p-1.5 rounded-full ${getTypeColor(reminder.type)}`}>
                  <TypeIcon className="h-3 w-3" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {reminder.type}
                </Badge>
                <Badge variant={reminder.priority === "high" ? "destructive" : reminder.priority === "medium" ? "secondary" : "outline"} className="text-xs">
                  {reminder.priority}
                </Badge>
              </div>
              
              <h4 className="font-semibold text-sm mb-1 line-clamp-1">{reminder.title}</h4>
              {reminder.description && (
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{reminder.description}</p>
              )}
              
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {format(new Date(reminder.dueDate), "MMM dd, yyyy")}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {format(new Date(reminder.dueDate), "HH:mm")}
                </div>
                {isOverdue && (
                  <Badge variant="destructive" className="text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Overdue
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-1 ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => completeReminder(reminder.id)}
                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteReminder(reminder.id)}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text flex items-center">
            <Bell className="h-6 w-6 mr-2 text-blue-600" />
            Reminders ({activeReminders.length})
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {activeReminders.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Bell className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">No active reminders</h3>
                <p className="text-sm text-muted-foreground">
                  Create reminders using the Schedule button to stay on top of your job search tasks.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Overdue Reminders */}
              {overdueReminders.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <h3 className="font-semibold text-red-600">Overdue ({overdueReminders.length})</h3>
                  </div>
                  <div className="space-y-3">
                    {overdueReminders.map((reminder) => (
                      <ReminderCard key={reminder.id} reminder={reminder} />
                    ))}
                  </div>
                  <Separator className="my-4" />
                </div>
              )}

              {/* Upcoming Reminders */}
              {upcomingReminders.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <h3 className="font-semibold text-orange-600">Upcoming (Next 24h)</h3>
                  </div>
                  <div className="space-y-3">
                    {upcomingReminders.map((reminder) => (
                      <ReminderCard key={reminder.id} reminder={reminder} />
                    ))}
                  </div>
                  <Separator className="my-4" />
                </div>
              )}

              {/* All Other Active Reminders */}
              {activeReminders.filter(r => 
                !overdueReminders.includes(r) && !upcomingReminders.includes(r)
              ).length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-600">All Reminders</h3>
                  </div>
                  <div className="space-y-3">
                    {activeReminders
                      .filter(r => !overdueReminders.includes(r) && !upcomingReminders.includes(r))
                      .map((reminder) => (
                        <ReminderCard key={reminder.id} reminder={reminder} />
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
