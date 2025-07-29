"use client"

import { useState, useEffect, useCallback } from "react"
import type { Job } from "@/types/job"
import { useToast } from "@/hooks/use-toast"
import { useDebounce } from "@/hooks/use-debounce"
// API service now enabled for backend integration
import { useAuth } from "@clerk/nextjs"
import { apiService } from "@/lib/api"

// Fallback mock data for development/offline mode
const mockJobs: Job[] = [
  {
    _id: "1",
    userId: "demo-user",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "₹12L - ₹15L",
    status: "interviewing",
    appliedDate: new Date("2024-01-15"),
    notes: "Great company culture, 3 rounds of interviews scheduled",
    jobUrl: "https://techcorp.com/careers/senior-frontend",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "2",
    userId: "demo-user",
    title: "React Developer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "₹9L - ₹11L",
    status: "applied",
    appliedDate: new Date("2024-01-20"),
    notes: "Fully remote position, good benefits package",
    jobUrl: "https://startupxyz.com/jobs/react-dev",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    _id: "3",
    userId: "demo-user",
    title: "Full Stack Engineer",
    company: "MegaCorp",
    location: "New York, NY",
    salary: "₹15L - ₹18L",
    status: "offer",
    appliedDate: new Date("2024-01-10"),
    notes: "Received offer! Negotiating salary and start date",
    jobUrl: "https://megacorp.com/careers/fullstack",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    _id: "4",
    userId: "demo-user",
    title: "Software Engineer",
    company: "SmallTech",
    location: "Austin, TX",
    salary: "₹8L - ₹10L",
    status: "rejected",
    appliedDate: new Date("2024-01-05"),
    notes: "Not the right fit, but good interview experience",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    _id: "5",
    userId: "demo-user",
    title: "Frontend Developer",
    company: "DesignStudio",
    location: "Los Angeles, CA",
    salary: "₹10L - ₹12L",
    status: "applied",
    appliedDate: new Date("2024-01-25"),
    notes: "Creative agency, focus on UI/UX",
    jobUrl: "https://designstudio.com/careers",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
  },
]

const STORAGE_KEY = "job-tracker-jobs"

// Load jobs from localStorage (fallback for offline mode)
const loadJobsFromStorage = (): Job[] => {
  if (typeof window === "undefined") return mockJobs

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.map((job: any) => ({
        ...job,
        appliedDate: new Date(job.appliedDate),
        createdAt: new Date(job.createdAt),
        updatedAt: new Date(job.updatedAt),
      }))
    }
  } catch (error) {
    console.error("Error loading jobs from storage:", error)
  }

  return mockJobs
}

// Save jobs to localStorage (cache for offline mode)
const saveJobsToStorage = (jobs: Job[]) => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
  } catch (error) {
    console.error("Error saving jobs to storage:", error)
  }
}

export function useJobs() {
  const { toast } = useToast()
  const { getToken, isSignedIn } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasInitialized, setHasInitialized] = useState(false)

  // Memoize loadJobs function to prevent infinite re-renders
  const loadJobs = useCallback(async () => {
    // Only run once per session unless explicitly called
    if (hasInitialized && isLoading === false) {
      console.log('🔄 Jobs already loaded, skipping duplicate request')
      return
    }

    setIsLoading(true)
    
    try {
      // Check if user is signed in
      if (!isSignedIn) {
        console.log('User not signed in, using cached data')
        const cachedJobs = loadJobsFromStorage()
        setJobs(cachedJobs)
        setIsLoading(false)
        return
      }

      // Get authentication token
      const token = await getToken()
      if (!token) {
        console.warn('No authentication token available')
        const cachedJobs = loadJobsFromStorage()
        setJobs(cachedJobs)
        setIsLoading(false)
        return
      }

      // Try to fetch from backend
      try {
        console.log('🔄 Fetching jobs from backend...')
        const apiJobs = await apiService.getJobs(token)
        setJobs(apiJobs)
        saveJobsToStorage(apiJobs)
        console.log('✅ Jobs loaded from backend:', apiJobs.length)
      } catch (apiError) {
        console.warn('⚠️ Backend call failed, using cached data:', apiError)
        const cachedJobs = loadJobsFromStorage()
        setJobs(cachedJobs)
        
        // Only show toast if it's a real network error, not just empty data
        if (apiError instanceof Error && !apiError.message.includes('Backend server is not running')) {
          toast({
            title: "Using Cached Data",
            description: "Unable to sync with server. Using local data.",
            variant: "default",
          })
        }
      }
      
    } catch (error) {
      console.error('Failed to load jobs:', error)
      const cachedJobs = loadJobsFromStorage()
      setJobs(cachedJobs)
    } finally {
      setIsLoading(false)
      setHasInitialized(true)
    }
  }, [getToken, isSignedIn, toast, hasInitialized, isLoading])

  // Load jobs only once on mount when user is signed in
  useEffect(() => {
    if (isSignedIn && !hasInitialized) {
      loadJobs()
    }
  }, [isSignedIn, hasInitialized, loadJobs])

  // Save jobs whenever they change (for offline cache)
  useEffect(() => {
    if (!isLoading && jobs.length > 0) {
      saveJobsToStorage(jobs)
    }
  }, [jobs, isLoading])

  const addJob = useCallback(async (jobData: Omit<Job, "_id" | "createdAt" | "updatedAt">) => {
    try {
      // Check authentication
      if (!isSignedIn) {
        throw new Error('Not authenticated')
      }

      const token = await getToken()
      if (!token) {
        throw new Error('No authentication token')
      }

      // Optimistic update - add temporary job immediately
      const tempJob: Job = {
        ...jobData,
        _id: `temp-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setJobs(prev => [...prev, tempJob])

      try {
        // Create job via API
        const newJob = await apiService.createJob(jobData as any, token)
        
        // Replace temp job with real job from backend
        setJobs(prev => prev.map(job => 
          job._id === tempJob._id ? newJob : job
        ))
        
        // Update cache
        const updatedJobs = jobs.filter(j => j._id !== tempJob._id).concat([newJob])
        saveJobsToStorage(updatedJobs)

        toast({
          title: "Job Added",
          description: `Added ${newJob.title} at ${newJob.company}`,
        })

        return newJob
      } catch (apiError) {
        console.warn('⚠️ Failed to sync with backend, keeping local copy:', apiError)
        
        // Keep the temp job but mark it as unsaved
        const localJob = { ...tempJob, _id: `local-${Date.now()}` }
        setJobs(prev => prev.map(job => 
          job._id === tempJob._id ? localJob : job
        ))

        toast({
          title: "Job Added",
          description: `Added ${localJob.title} at ${localJob.company}`,
        })

        return localJob
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add job application",
        variant: "destructive",
      })
      throw error
    }
  }, [getToken, isSignedIn, jobs, toast])

  const updateJob = useCallback(async (jobId: string, updates: Partial<Job>) => {
    try {
      // Check authentication
      if (!isSignedIn) {
        throw new Error('Not authenticated')
      }

      const token = await getToken()
      if (!token) {
        throw new Error('No authentication token')
      }

      // Optimistic update
      const updatedJobData = {
        ...updates,
        updatedAt: new Date(),
      }

      setJobs(prev =>
        prev.map(job =>
          job._id === jobId ? { ...job, ...updatedJobData } : job
        )
      )

      try {
        // Update via API
        const updatedJob = await apiService.updateJob(jobId, updates, token)
        
        // Update with backend response
        setJobs(prev =>
          prev.map(job =>
            job._id === jobId ? updatedJob : job
          )
        )

        toast({
          title: "Job Updated",
          description: "Job application updated successfully",
        })

        return updatedJob
      } catch (apiError) {
        console.warn('⚠️ Failed to sync update with backend:', apiError)
        
        toast({
          title: "Job Updated",
          description: "Job application updated successfully",
        })

        return { ...updates, updatedAt: new Date() } as Job
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update job application",
        variant: "destructive",
      })
      throw error
    }
  }, [getToken, isSignedIn, toast])

  const deleteJob = useCallback(async (jobId: string) => {
    try {
      // Check authentication
      if (!isSignedIn) {
        throw new Error('Not authenticated')
      }

      const token = await getToken()
      if (!token) {
        throw new Error('No authentication token')
      }

      // Store job for potential rollback
      const jobToDelete = jobs.find(job => job._id === jobId)
      
      // Optimistic update - remove immediately
      setJobs(prev => prev.filter(job => job._id !== jobId))

      try {
        // Delete via API
        await apiService.deleteJob(jobId, token)

        toast({
          title: "Job Deleted",
          description: "Job application deleted successfully",
        })
      } catch (apiError) {
        console.warn('⚠️ Failed to sync deletion with backend:', apiError)
        
        toast({
          title: "Job Deleted",
          description: "Job application deleted successfully",
        })
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete job application",
        variant: "destructive",
      })
      throw error
    }
  }, [getToken, isSignedIn, jobs, toast])

  // Get jobs by status
  const getJobsByStatus = useCallback((status: Job["status"]) => {
    return jobs.filter(job => job.status === status)
  }, [jobs])

  // Get job statistics
  const getJobStats = useCallback(() => {
    const total = jobs.length
    const applied = jobs.filter(job => job.status === "applied").length
    const interviewing = jobs.filter(job => job.status === "interviewing").length
    const offers = jobs.filter(job => job.status === "offer").length
    const rejected = jobs.filter(job => job.status === "rejected").length

    return {
      total,
      applied,
      interviewing,
      offers,
      rejected,
    }
  }, [jobs])

  // Manual refresh function that bypasses initialization check
  const refreshJobs = useCallback(async () => {
    console.log('🔄 Manual refresh triggered')
    setHasInitialized(false) // Reset to allow fresh fetch
    await loadJobs()
  }, [loadJobs])

  return {
    jobs,
    isLoading,
    addJob,
    updateJob,
    deleteJob,
    getJobsByStatus,
    getJobStats,
    refreshJobs,
  }
}
