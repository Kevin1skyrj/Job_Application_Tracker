"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Bell, Target, MapPin, Phone, Mail, Video } from "lucide-react"

interface ScheduleDialogProps {
  children: React.ReactNode
}

export function ScheduleDialog({ children }: ScheduleDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [scheduleData, setScheduleData] = useState({
    title: "",
    type: "interview" as "interview" | "follow-up" | "deadline" | "reminder",
    date: "",
    time: "",
    description: "",
    location: "",
    reminder: "30" as "15" | "30" | "60" | "120",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Here you would save the schedule item
      // For now, we'll just show a success message
      console.log("Schedule created:", scheduleData)
      
      // Reset form
      setScheduleData({
        title: "",
        type: "interview",
        date: "",
        time: "",
        description: "",
        location: "",
        reminder: "30",
      })
      setOpen(false)
    } catch (error) {
      console.error("Error creating schedule:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const scheduleTypes = [
    { value: "interview", label: "Interview", icon: Phone, color: "text-blue-600" },
    { value: "follow-up", label: "Follow-up", icon: Mail, color: "text-green-600" },
    { value: "deadline", label: "Application Deadline", icon: Target, color: "text-red-600" },
    { value: "reminder", label: "General Reminder", icon: Bell, color: "text-purple-600" },
  ]

  const getCurrentDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const getCurrentTime = () => {
    const now = new Date()
    return now.toTimeString().slice(0, 5)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-purple-600" />
            Schedule Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Type */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Event Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {scheduleTypes.map((type) => (
                <Button
                  key={type.value}
                  type="button"
                  variant="outline"
                  onClick={() => setScheduleData({ ...scheduleData, type: type.value as any })}
                  className={`h-12 justify-start ${
                    scheduleData.type === type.value
                      ? "bg-purple-100 border-purple-500 text-purple-700 dark:bg-purple-900/30 dark:border-purple-600 dark:text-purple-400"
                      : "hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  }`}
                >
                  <type.icon className={`h-4 w-4 mr-2 ${type.color}`} />
                  <span className="text-sm">{type.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold">
              Event Title *
            </Label>
            <Input
              id="title"
              value={scheduleData.title}
              onChange={(e) => setScheduleData({ ...scheduleData, title: e.target.value })}
              placeholder="e.g., Interview with Google, Follow-up with HR"
              className="h-11"
              required
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-semibold flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={scheduleData.date}
                onChange={(e) => setScheduleData({ ...scheduleData, date: e.target.value })}
                min={getCurrentDate()}
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-semibold flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Time *
              </Label>
              <Input
                id="time"
                type="time"
                value={scheduleData.time}
                onChange={(e) => setScheduleData({ ...scheduleData, time: e.target.value })}
                className="h-11"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-semibold flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Location / Meeting Link
            </Label>
            <Input
              id="location"
              value={scheduleData.location}
              onChange={(e) => setScheduleData({ ...scheduleData, location: e.target.value })}
              placeholder="Office address, Zoom link, Google Meet, etc."
              className="h-11"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold">
              Notes & Details
            </Label>
            <Textarea
              id="description"
              value={scheduleData.description}
              onChange={(e) => setScheduleData({ ...scheduleData, description: e.target.value })}
              placeholder="Add any notes, preparation items, or important details..."
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Reminder */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Reminder
            </Label>
            <Select
              value={scheduleData.reminder}
              onValueChange={(value: any) => setScheduleData({ ...scheduleData, reminder: value })}
            >
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes before</SelectItem>
                <SelectItem value="30">30 minutes before</SelectItem>
                <SelectItem value="60">1 hour before</SelectItem>
                <SelectItem value="120">2 hours before</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quick Tips */}
          <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-purple-900 dark:text-purple-100">💡 Scheduling Tips</p>
                  <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
                    <li>• Set reminders for important interviews and deadlines</li>
                    <li>• Block time for application preparation and research</li>
                    <li>• Schedule regular follow-ups with recruiters</li>
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
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isLoading ? "Scheduling..." : "Schedule Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
