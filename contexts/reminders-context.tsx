"use client"

import React, { createContext, useContext, ReactNode } from "react"
import { useReminders as useRemindersHook } from "@/hooks/use-reminders"

type RemindersContextType = ReturnType<typeof useRemindersHook>

const RemindersContext = createContext<RemindersContextType | undefined>(undefined)

export function RemindersProvider({ children }: { children: ReactNode }) {
  const remindersData = useRemindersHook()
  return (
    <RemindersContext.Provider value={remindersData}>
      {children}
    </RemindersContext.Provider>
  )
}

export function useReminders() {
  const ctx = useContext(RemindersContext)
  if (!ctx) throw new Error("useReminders must be used within a RemindersProvider")
  return ctx
}
