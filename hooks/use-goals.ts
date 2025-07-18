"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export interface Goal {
  id: string
  type: "monthly" | "weekly" | "daily"
  target: number
  period: string // e.g., "2024-01" for monthly
  createdAt: Date
  updatedAt: Date
}

const GOALS_STORAGE_KEY = "job-tracker-goals"

// Load goals from localStorage
const loadGoalsFromStorage = (): Goal[] => {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(GOALS_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.map((goal: any) => ({
        ...goal,
        createdAt: new Date(goal.createdAt),
        updatedAt: new Date(goal.updatedAt),
      }))
    }
  } catch (error) {
    console.error("Error loading goals from storage:", error)
  }

  return []
}

// Save goals to localStorage
const saveGoalsToStorage = (goals: Goal[]) => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals))
  } catch (error) {
    console.error("Error saving goals to storage:", error)
  }
}

export function useGoals() {
  const { toast } = useToast()
  const [goals, setGoals] = useState<Goal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load goals on mount
  useEffect(() => {
    const loadedGoals = loadGoalsFromStorage()
    setGoals(loadedGoals)
    setIsLoading(false)
  }, [])

  // Get current month's goal
  const getCurrentMonthGoal = (): Goal | null => {
    const currentMonth = new Date().toISOString().slice(0, 7) // "2024-01"
    return goals.find(goal => goal.type === "monthly" && goal.period === currentMonth) || null
  }

  // Set or update monthly goal
  const setMonthlyGoal = (target: number) => {
    const currentMonth = new Date().toISOString().slice(0, 7)
    const existingGoal = getCurrentMonthGoal()

    if (existingGoal) {
      // Update existing goal
      const updatedGoals = goals.map(goal =>
        goal.id === existingGoal.id
          ? { ...goal, target, updatedAt: new Date() }
          : goal
      )
      setGoals(updatedGoals)
      saveGoalsToStorage(updatedGoals)
      
      toast({
        title: "Goal Updated",
        description: `Monthly goal updated to ${target} applications`,
      })
    } else {
      // Create new goal
      const newGoal: Goal = {
        id: Math.random().toString(36).substr(2, 9),
        type: "monthly",
        target,
        period: currentMonth,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const updatedGoals = [...goals, newGoal]
      setGoals(updatedGoals)
      saveGoalsToStorage(updatedGoals)

      toast({
        title: "Goal Set",
        description: `Monthly goal set to ${target} applications`,
      })
    }
  }

  // Remove monthly goal
  const removeMonthlyGoal = () => {
    const currentGoal = getCurrentMonthGoal()
    if (!currentGoal) return

    const updatedGoals = goals.filter(goal => goal.id !== currentGoal.id)
    setGoals(updatedGoals)
    saveGoalsToStorage(updatedGoals)

    toast({
      title: "Goal Removed",
      description: "Monthly goal has been removed",
      variant: "destructive",
    })
  }

  // Calculate progress for current month
  const calculateMonthlyProgress = (jobsThisMonth: number): { percentage: number; remaining: number } => {
    const currentGoal = getCurrentMonthGoal()
    if (!currentGoal) return { percentage: 0, remaining: 0 }

    const percentage = Math.round((jobsThisMonth / currentGoal.target) * 100)
    const remaining = Math.max(0, currentGoal.target - jobsThisMonth)

    return { percentage, remaining }
  }

  return {
    goals,
    isLoading,
    getCurrentMonthGoal,
    setMonthlyGoal,
    removeMonthlyGoal,
    calculateMonthlyProgress,
  }
}
