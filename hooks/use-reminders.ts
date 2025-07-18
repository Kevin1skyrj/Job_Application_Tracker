"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export interface Reminder {
  id: string
  title: string
  description?: string
  dueDate: Date
  type: "interview" | "follow-up" | "deadline" | "general"
  isCompleted: boolean
  jobId?: string // Link to specific job application
  priority: "low" | "medium" | "high"
  createdAt: Date
}

const REMINDERS_STORAGE_KEY = "job-tracker-reminders"

// Load reminders from localStorage
const loadRemindersFromStorage = (): Reminder[] => {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(REMINDERS_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.map((reminder: any) => ({
        ...reminder,
        dueDate: new Date(reminder.dueDate),
        createdAt: new Date(reminder.createdAt),
      }))
    }
  } catch (error) {
    console.error("Error loading reminders from storage:", error)
  }

  return []
}

// Save reminders to localStorage
const saveRemindersToStorage = (reminders: Reminder[]) => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(reminders))
  } catch (error) {
    console.error("Error saving reminders to storage:", error)
  }
}

export function useReminders() {
  const { toast } = useToast()
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load reminders on mount
  useEffect(() => {
    const loadedReminders = loadRemindersFromStorage()
    setReminders(loadedReminders)
    setIsLoading(false)
  }, [])

  // Get active (non-completed) reminders
  const getActiveReminders = (): Reminder[] => {
    return reminders.filter(reminder => !reminder.isCompleted)
  }

  // Get overdue reminders
  const getOverdueReminders = (): Reminder[] => {
    const now = new Date()
    return reminders.filter(reminder => 
      !reminder.isCompleted && new Date(reminder.dueDate) < now
    )
  }

  // Get upcoming reminders (next 24 hours)
  const getUpcomingReminders = (): Reminder[] => {
    const now = new Date()
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    return reminders.filter(reminder => 
      !reminder.isCompleted && 
      new Date(reminder.dueDate) >= now && 
      new Date(reminder.dueDate) <= tomorrow
    )
  }

  // Add new reminder
  const addReminder = (reminderData: Omit<Reminder, "id" | "createdAt">) => {
    const newReminder: Reminder = {
      ...reminderData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    }

    const updatedReminders = [...reminders, newReminder]
    setReminders(updatedReminders)
    saveRemindersToStorage(updatedReminders)

    toast({
      title: "Reminder Created",
      description: `Reminder set for ${newReminder.title}`,
    })

    return newReminder
  }

  // Complete/mark reminder as done
  const completeReminder = (reminderId: string) => {
    const updatedReminders = reminders.map(reminder =>
      reminder.id === reminderId
        ? { ...reminder, isCompleted: true }
        : reminder
    )
    setReminders(updatedReminders)
    saveRemindersToStorage(updatedReminders)

    toast({
      title: "Reminder Completed",
      description: "Reminder marked as completed",
    })
  }

  // Delete reminder
  const deleteReminder = (reminderId: string) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== reminderId)
    setReminders(updatedReminders)
    saveRemindersToStorage(updatedReminders)

    toast({
      title: "Reminder Deleted",
      description: "Reminder has been deleted",
    })
  }

  // Get reminder count for badge
  const getReminderCount = (): number => {
    return getActiveReminders().length
  }

  // Get priority count
  const getHighPriorityCount = (): number => {
    return getActiveReminders().filter(r => r.priority === "high").length
  }

  return {
    reminders,
    isLoading,
    getActiveReminders,
    getOverdueReminders,
    getUpcomingReminders,
    addReminder,
    completeReminder,
    deleteReminder,
    getReminderCount,
    getHighPriorityCount,
  }
}
