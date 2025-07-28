import { useAuth } from '@clerk/nextjs'
import type { Job, JobFormData } from '@/types/job'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

class ApiService {
  private getAuthHeaders(token: string) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    token: string
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getAuthHeaders(token),
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      // Check if it's a network error (backend not running)
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Backend server is not running. Using offline mode.')
      }
      console.error('API Request failed:', error)
      throw error
    }
  }

  // Job CRUD operations
  async getJobs(token: string): Promise<Job[]> {
    return this.request<Job[]>('/jobs', { method: 'GET' }, token)
  }

  async createJob(jobData: JobFormData, token: string): Promise<Job> {
    return this.request<Job>(
      '/jobs',
      {
        method: 'POST',
        body: JSON.stringify(jobData),
      },
      token
    )
  }

  async updateJob(jobId: string, updates: Partial<Job>, token: string): Promise<Job> {
    return this.request<Job>(
      `/jobs/${jobId}`,
      {
        method: 'PUT',
        body: JSON.stringify(updates),
      },
      token
    )
  }

  async deleteJob(jobId: string, token: string): Promise<void> {
    return this.request<void>(
      `/jobs/${jobId}`,
      { method: 'DELETE' },
      token
    )
  }

  async getJobStats(token: string): Promise<{
    total: number
    applied: number
    interviewing: number
    offers: number
    rejected: number
  }> {
    return this.request<any>('/jobs/stats', { method: 'GET' }, token)
  }
}

export const apiService = new ApiService()
