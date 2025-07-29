"use client"

import React, { createContext, useContext, ReactNode } from "react"
import { useJobs } from "@/hooks/use-jobs"
import type { Job } from "@/types/job"

interface JobsContextType {
  jobs: Job[]
  isLoading: boolean
  addJob: (jobData: Omit<Job, "_id" | "createdAt" | "updatedAt">) => Promise<Job>
  updateJob: (jobId: string, updates: Partial<Job>) => Promise<Job>
  deleteJob: (jobId: string) => Promise<void>
  getJobsByStatus: (status: Job["status"]) => Job[]
  getJobStats: () => {
    total: number
    applied: number
    interviewing: number
    offers: number
    rejected: number
  }
  refreshJobs: () => Promise<void>
}

const JobsContext = createContext<JobsContextType | undefined>(undefined)

interface JobsProviderProps {
  children: ReactNode
}

export function JobsProvider({ children }: JobsProviderProps) {
  const jobsData = useJobs()

  return (
    <JobsContext.Provider value={jobsData}>
      {children}
    </JobsContext.Provider>
  )
}

export function useJobsContext() {
  const context = useContext(JobsContext)
  if (context === undefined) {
    throw new Error('useJobsContext must be used within a JobsProvider')
  }
  return context
}
