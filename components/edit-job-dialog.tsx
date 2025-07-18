"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useJobs } from "@/hooks/use-jobs"
import type { Job } from "@/types/job"
import { Building2, MapPin, IndianRupee, Link, FileText } from "lucide-react"

interface EditJobDialogProps {
  job: Job
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditJobDialog({ job, open, onOpenChange }: EditJobDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { updateJob } = useJobs()

  const [formData, setFormData] = useState({
    title: job.title,
    company: job.company,
    location: job.location || "",
    salary: job.salary || "",
    status: job.status,
    notes: job.notes || "",
    jobUrl: job.jobUrl || "",
  })

  useEffect(() => {
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location || "",
      salary: job.salary || "",
      status: job.status,
      notes: job.notes || "",
      jobUrl: job.jobUrl || "",
    })
  }, [job])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateJob(job._id, formData)
      onOpenChange(false)
    } catch (error) {
      console.error("Error updating job:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">Edit Job Application</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title & Company */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold flex items-center">
                <Building2 className="h-4 w-4 mr-2" />
                Job Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-semibold">
                Company *
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="h-11"
                required
              />
            </div>
          </div>

          {/* Location & Salary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-semibold flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary" className="text-sm font-semibold flex items-center">
                <IndianRupee className="h-4 w-4 mr-2" />
                Salary Range
              </Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="₹8L - ₹12L"
                className="h-11"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-semibold">
              Application Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value: Job["status"]) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applied">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                    Applied
                  </div>
                </SelectItem>
                <SelectItem value="interviewing">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2" />
                    Interviewing
                  </div>
                </SelectItem>
                <SelectItem value="offer">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                    Offer Received
                  </div>
                </SelectItem>
                <SelectItem value="rejected">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                    Rejected
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Job URL */}
          <div className="space-y-2">
            <Label htmlFor="jobUrl" className="text-sm font-semibold flex items-center">
              <Link className="h-4 w-4 mr-2" />
              Job Posting URL
            </Label>
            <Input
              id="jobUrl"
              type="url"
              value={formData.jobUrl}
              onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
              className="h-11"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-semibold flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Notes & Comments
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="px-6">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? "Updating..." : "Update Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
