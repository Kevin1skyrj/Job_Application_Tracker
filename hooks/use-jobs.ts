"use client"

import { useState, useEffect } from "react"
import type { Job } from "@/types/job"
import { useToast } from "@/hooks/use-toast"
// API service ready for when backend is implemented
// import { useAuth } from "@clerk/nextjs"
// import { apiService } from "@/lib/api"

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
  // const { getToken, isSignedIn } = useAuth() // TODO: Enable when backend is ready
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  // const [isOnline, setIsOnline] = useState(true) // TODO: Enable when backend is ready

  // Load jobs on mount
  useEffect(() => {
    loadJobs()
  }, []) // Removed isSignedIn dependency for demo mode

  // Save jobs whenever they change (for demo persistence)
  useEffect(() => {
    if (!isLoading && jobs.length > 0) {
      saveJobsToStorage(jobs)
    }
  }, [jobs, isLoading])

  const loadJobs = async () => {
    setIsLoading(true)
    
    try {
      // For now, just use localStorage/mock data until backend is ready
      const cachedJobs = loadJobsFromStorage()
      setJobs(cachedJobs)
      
      /* 
      TODO: Enable when backend is ready
      
      if (!isSignedIn) {
        const cachedJobs = loadJobsFromStorage()
        setJobs(cachedJobs)
        setIsLoading(false)
        return
      }

      const token = await getToken()
      if (!token) {
        throw new Error('No authentication token')
      }

      const apiJobs = await apiService.getJobs(token)
      setJobs(apiJobs)
      saveJobsToStorage(apiJobs)
      */
      
    } catch (error) {
      console.error('Failed to load jobs:', error)
      const cachedJobs = loadJobsFromStorage()
      setJobs(cachedJobs)
    } finally {
      setIsLoading(false)
    }
  }

  const addJob = async (jobData: Omit<Job, "_id" | "createdAt" | "updatedAt">) => {
    try {
      // For now, work with localStorage until backend is ready
      const newJob: Job = {
        ...jobData,
        _id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      setJobs(prev => [...prev, newJob])

      toast({
        title: "Job Added",
        description: `Added ${newJob.title} at ${newJob.company}`,
      })

      return newJob

      /*
      TODO: Enable when backend is ready
      
      if (!isSignedIn) {
        throw new Error('Not authenticated')
      }

      const token = await getToken()
      if (!token) {
        throw new Error('No authentication token')
      }

      // Optimistic update
      const tempJob: Job = {
        ...jobData,
        _id: `temp-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setJobs(prev => [...prev, tempJob])

      if (isOnline) {
        const newJob = await apiService.createJob(jobData as JobFormData, token)
        
        // Replace temp job with real job
        setJobs(prev => prev.map(job => 
          job._id === tempJob._id ? newJob : job
        ))
        saveJobsToStorage([...jobs.filter(j => j._id !== tempJob._id), newJob])
      }
      */
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add job application",
        variant: "destructive",
      })
      throw error
    }
  }

  const updateJob = async (jobId: string, updates: Partial<Job>) => {
    try {
      // For now, work with localStorage until backend is ready
      const updatedJob = {
        ...updates,
        updatedAt: new Date(),
      }

      setJobs(prev =>
        prev.map(job =>
          job._id === jobId ? { ...job, ...updatedJob } : job
        )
      )

      toast({
        title: "Job Updated",
        description: "Job application updated successfully",
      })

      return updatedJob as Job

      /*
      TODO: Enable when backend is ready
      
      if (!isSignedIn) {
        throw new Error('Not authenticated')
      }

      const token = await getToken()
      if (!token) {
        throw new Error('No authentication token')
      }

      // Optimistic update
      const updatedJob = {
        ...updates,
        updatedAt: new Date(),
      }

      setJobs(prev =>
        prev.map(job =>
          job._id === jobId ? { ...job, ...updatedJob } : job
        )
      )

      if (isOnline) {
        await apiService.updateJob(jobId, updates, token)
      }
      */

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update job application",
        variant: "destructive",
      })
      throw error
    }
  }

  const deleteJob = async (jobId: string) => {
    try {
      // For now, work with localStorage until backend is ready
      setJobs(prev => prev.filter(job => job._id !== jobId))

      toast({
        title: "Job Deleted",
        description: "Job application deleted successfully",
      })

      /*
      TODO: Enable when backend is ready
      
      if (!isSignedIn) {
        throw new Error('Not authenticated')
      }

      const token = await getToken()
      if (!token) {
        throw new Error('No authentication token')
      }

      // Optimistic update
      const deletedJob = jobs.find(job => job._id === jobId)
      setJobs(prev => prev.filter(job => job._id !== jobId))

      if (isOnline) {
        await apiService.deleteJob(jobId, token)
      }
      */

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete job application",
        variant: "destructive",
      })
      throw error
    }
  }

  // Get jobs by status
  const getJobsByStatus = (status: Job["status"]) => {
    return jobs.filter(job => job.status === status)
  }

  // Get job statistics
  const getJobStats = () => {
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
  }

  return {
    jobs,
    isLoading,
    addJob,
    updateJob,
    deleteJob,
    getJobsByStatus,
    getJobStats,
    refreshJobs: loadJobs,
  }
}
