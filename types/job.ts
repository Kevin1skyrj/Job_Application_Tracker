export interface Job {
  _id: string
  userId: string
  title: string
  company: string
  location?: string
  salary?: string
  status: "applied" | "interviewing" | "offer" | "rejected"
  appliedDate: Date
  notes?: string
  jobUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface JobFormData {
  title: string
  company: string
  location?: string
  salary?: string
  status: Job["status"]
  notes?: string
  jobUrl?: string
  appliedDate: Date
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface JobStats {
  total: number
  applied: number
  interviewing: number
  offers: number
  rejected: number
}

export interface ApiError {
  error: string
  message: string
  statusCode: number
}
