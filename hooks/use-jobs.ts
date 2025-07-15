"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { Job } from "@/types/job"
import { useToast } from "@/hooks/use-toast"

// Pure frontend mock data - no backend needed
const mockJobs: Job[] = [
  {
    _id: "1",
    userId: "demo-user",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
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
    salary: "$90,000 - $110,000",
    status: "applied",
    appliedDate: new Date("2024-01-20"),
    notes: "Remote-first company, interesting product",
    jobUrl: "https://startupxyz.com/jobs/react-dev",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    _id: "3",
    userId: "demo-user",
    title: "Full Stack Engineer",
    company: "BigTech Corp",
    location: "New York, NY",
    salary: "$140,000 - $180,000",
    status: "offer",
    appliedDate: new Date("2024-01-10"),
    notes: "Received offer! Negotiating salary and benefits",
    jobUrl: "https://bigtech.com/careers/fullstack",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    _id: "4",
    userId: "demo-user",
    title: "Frontend Developer",
    company: "Design Agency",
    location: "Los Angeles, CA",
    salary: "$80,000 - $100,000",
    status: "rejected",
    appliedDate: new Date("2024-01-05"),
    notes: "Not a good fit for their current needs",
    jobUrl: "https://designagency.com/jobs/frontend",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    _id: "5",
    userId: "demo-user",
    title: "Software Engineer",
    company: "FinTech Solutions",
    location: "Austin, TX",
    salary: "$100,000 - $130,000",
    status: "applied",
    appliedDate: new Date("2024-01-22"),
    notes: "Interesting fintech startup, good growth potential",
    jobUrl: "https://fintech.com/careers/software-engineer",
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-22"),
  },
]

// Local storage key for persistence
const STORAGE_KEY = "job-tracker-jobs"

// Load jobs from localStorage or use mock data
const loadJobsFromStorage = (): Job[] => {
  if (typeof window === "undefined") return mockJobs

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Convert date strings back to Date objects
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

// Save jobs to localStorage
const saveJobsToStorage = (jobs: Job[]) => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
  } catch (error) {
    console.error("Error saving jobs to storage:", error)
  }
}

// Initialize with stored or mock data
let currentJobs = loadJobsFromStorage()

// Pure frontend API simulation
const frontendApi = {
  getJobs: async (): Promise<Job[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
    return [...currentJobs]
  },

  addJob: async (jobData: Omit<Job, "_id" | "userId" | "createdAt" | "updatedAt">): Promise<Job> => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const newJob: Job = {
      ...jobData,
      _id: Math.random().toString(36).substr(2, 9),
      userId: "demo-user",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    currentJobs = [...currentJobs, newJob]
    saveJobsToStorage(currentJobs)
    return newJob
  },

  updateJob: async (jobId: string, updates: Partial<Job>): Promise<Job> => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const jobIndex = currentJobs.findIndex((job) => job._id === jobId)
    if (jobIndex === -1) throw new Error("Job not found")

    const updatedJob = {
      ...currentJobs[jobIndex],
      ...updates,
      updatedAt: new Date(),
    }

    currentJobs = [...currentJobs.slice(0, jobIndex), updatedJob, ...currentJobs.slice(jobIndex + 1)]

    saveJobsToStorage(currentJobs)
    return updatedJob
  },

  deleteJob: async (jobId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const jobIndex = currentJobs.findIndex((job) => job._id === jobId)
    if (jobIndex === -1) throw new Error("Job not found")

    currentJobs = currentJobs.filter((job) => job._id !== jobId)
    saveJobsToStorage(currentJobs)
  },
}

export function useJobs() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Fetch jobs
  const {
    data: jobs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: frontendApi.getJobs,
  })

  // Add job mutation
  const addJobMutation = useMutation({
    mutationFn: frontendApi.addJob,
    onSuccess: (newJob) => {
      queryClient.setQueryData(["jobs"], (old: Job[] | undefined) => (old ? [...old, newJob] : [newJob]))
      toast({
        title: "Success",
        description: "Job application added successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add job application",
        variant: "destructive",
      })
    },
  })

  // Update job mutation
  const updateJobMutation = useMutation({
    mutationFn: ({ jobId, updates }: { jobId: string; updates: Partial<Job> }) => frontendApi.updateJob(jobId, updates),
    onSuccess: (updatedJob) => {
      queryClient.setQueryData(["jobs"], (old: Job[] | undefined) =>
        old ? old.map((job) => (job._id === updatedJob._id ? updatedJob : job)) : [],
      )
      toast({
        title: "Success",
        description: "Job application updated successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update job application",
        variant: "destructive",
      })
    },
  })

  // Delete job mutation
  const deleteJobMutation = useMutation({
    mutationFn: frontendApi.deleteJob,
    onSuccess: (_, jobId) => {
      queryClient.setQueryData(["jobs"], (old: Job[] | undefined) =>
        old ? old.filter((job) => job._id !== jobId) : [],
      )
      toast({
        title: "Success",
        description: "Job application deleted successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete job application",
        variant: "destructive",
      })
    },
  })

  return {
    jobs,
    isLoading,
    error,
    addJob: addJobMutation.mutate,
    updateJob: (jobId: string, updates: Partial<Job>) => updateJobMutation.mutate({ jobId, updates }),
    deleteJob: deleteJobMutation.mutate,
    isAddingJob: addJobMutation.isPending,
    isUpdatingJob: updateJobMutation.isPending,
    isDeletingJob: deleteJobMutation.isPending,
  }
}
