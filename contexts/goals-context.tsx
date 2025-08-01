"use client"

import React, { createContext, useContext, ReactNode } from "react"
import { useGoals } from "@/hooks/use-goals"
import type { Goal } from "@/hooks/use-goals"

interface GoalsContextType {
  goals: Goal[]
  isLoading: boolean
  getCurrentMonthGoal: () => Goal | null
  setMonthlyGoal: (target: number) => Promise<void>
  removeMonthlyGoal: () => Promise<void>
  calculateMonthlyProgress: (jobsThisMonth: number) => { percentage: number; remaining: number }
  fetchGoals: () => Promise<void>
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined)

interface GoalsProviderProps {
  children: ReactNode
}

export function GoalsProvider({ children }: GoalsProviderProps) {
  const goalsData = useGoals()

  return (
    <GoalsContext.Provider value={goalsData}>
      {children}
    </GoalsContext.Provider>
  )
}

export function useGoalsContext() {
  const context = useContext(GoalsContext)
  if (context === undefined) {
    throw new Error('useGoalsContext must be used within a GoalsProvider')
  }
  return context
}
