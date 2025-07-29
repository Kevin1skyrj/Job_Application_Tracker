"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Building2,
  Calendar,
  Edit,
  Trash2,
  ExternalLink,
  MapPin,
  IndianRupee,
  Clock,
} from "lucide-react"
import type { Job } from "@/types/job"
import { formatDistanceToNow } from "date-fns"
import { EditJobDialog } from "@/components/edit-job-dialog"
import { JobDetailsDialog } from "@/components/job-details-dialog"
import { useState } from "react"
import { useJobsContext } from "@/contexts/jobs-context"

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const { deleteJob } = useJobsContext()

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this job application?")) {
      await deleteJob(job._id)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "interviewing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "offer":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  return (
    <>
      <Card 
        className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800 border-0 shadow-md hover:-translate-y-1 overflow-hidden"
        onClick={() => setShowDetailsDialog(true)}
      >
        <CardContent className="p-3">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="font-semibold text-sm mb-1 line-clamp-1 text-gray-900 dark:text-white">{job.title}</h3>
              <div className="flex items-center text-muted-foreground text-xs mb-2">
                <Building2 className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="line-clamp-1 font-medium">{job.company}</span>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation()
                  setShowDetailsDialog(true)
                }}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation()
                  setShowEditDialog(true)
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Application
                </DropdownMenuItem>
                {job.jobUrl && (
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation()
                    window.open(job.jobUrl, "_blank")
                  }}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Job Posting
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation()
                  handleDelete()
                }} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Location and Salary */}
          <div className="space-y-1 mb-3">
            {job.location && (
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{job.location}</span>
              </div>
            )}
            {job.salary && (
              <div className="flex items-center text-xs text-green-600 dark:text-green-400 font-medium">
                <IndianRupee className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{job.salary}</span>
              </div>
            )}
          </div>

          {/* Applied Date */}
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Applied {formatDistanceToNow(new Date(job.appliedDate), { addSuffix: true })}</span>
          </div>

          {/* Notes */}
          {job.notes && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-md border-l-2 border-blue-200 dark:border-blue-800">
              {job.notes}
            </p>
          )}

          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <Badge className={`text-xs font-medium ${getStatusColor(job.status)}`}>
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </Badge>

            {job.status === "interviewing" && (
              <div className="flex items-center text-xs text-orange-600 dark:text-orange-400">
                <Clock className="h-3 w-3 mr-1" />
                <span>In Progress</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <JobDetailsDialog job={job} open={showDetailsDialog} onOpenChange={setShowDetailsDialog} />
      <EditJobDialog job={job} open={showEditDialog} onOpenChange={setShowEditDialog} />
    </>
  )
}
