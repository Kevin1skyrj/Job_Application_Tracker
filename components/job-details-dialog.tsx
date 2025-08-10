"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import {
  Building2,
  MapPin,
  IndianRupee,
  Calendar,
  Clock,
  ExternalLink,
  Globe,
  Edit,
  Trash2,
  FileText,
  Briefcase,
  Star,
  TrendingUp,
  Phone,
  Mail,
  User,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Timer,
} from "lucide-react"
import type { Job } from "@/types/job"
import { formatDistanceToNow, format } from "date-fns"
import { EditJobDialog } from "@/components/edit-job-dialog"
import { useJobsContext } from "@/contexts/jobs-context"

interface JobDetailsDialogProps {
  job: Job | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function JobDetailsDialog({ job, open, onOpenChange }: JobDetailsDialogProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const { deleteJob, updateJob } = useJobsContext()

  if (!job) return null

  const handleDelete = async () => {
    await deleteJob(job._id)
    onOpenChange(false)
  }

  const handleStatusChange = async (newStatus: Job["status"]) => {
    await updateJob(job._id, { ...job, status: newStatus })
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "applied":
        return {
          color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
          icon: CheckCircle2,
          description: "Application submitted successfully"
        }
      case "interviewing":
        return {
          color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
          icon: Timer,
          description: "Interview process in progress"
        }
      case "offer":
        return {
          color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
          icon: Star,
          description: "Offer received! 🎉"
        }
      case "rejected":
        return {
          color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
          icon: XCircle,
          description: "Application was not successful"
        }
      default:
        return {
          color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
          icon: AlertCircle,
          description: "Status unknown"
        }
    }
  }

  const statusConfig = getStatusConfig(job.status)
  const StatusIcon = statusConfig.icon

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-[#f3f5f4] to-[#d9d8d6] dark:from-[#33322d] dark:to-[#000000]">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {job.title}
                  </DialogTitle>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                    {job.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowEditDialog(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Job Application</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this job application? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </DialogHeader>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mx-6 mt-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>

                <div className="p-6 space-y-6">
                  <TabsContent value="overview" className="space-y-6 mt-0">
                    {/* Status Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <StatusIcon className="h-5 w-5" />
                          Application Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <Badge className={`text-sm font-medium ${statusConfig.color}`}>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {statusConfig.description}
                          </span>
                        </div>
                        
                        {/* Quick Status Change */}
                        <div className="grid grid-cols-4 gap-2">
                          {["applied", "interviewing", "offer", "rejected"].map((status) => (
                            <Button
                              key={status}
                              variant={job.status === status ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleStatusChange(status as Job["status"])}
                              className="text-xs"
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Key Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5" />
                            Job Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Position</span>
                            <span className="font-medium">{job.title}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Company</span>
                            <span className="font-medium">{job.company}</span>
                          </div>
                          {job.location && (
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Location</span>
                              <span className="font-medium">{job.location}</span>
                            </div>
                          )}
                          {job.salary && (
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Salary</span>
                              <div className="flex items-center gap-1 font-medium text-green-600">
                                <IndianRupee className="h-4 w-4" />
                                {job.salary}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Application Timeline
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Applied Date</span>
                            <span className="font-medium">{format(new Date(job.appliedDate), "MMM dd, yyyy")}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Time Since</span>
                            <span className="font-medium">{formatDistanceToNow(new Date(job.appliedDate), { addSuffix: true })}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Last Updated</span>
                            <span className="font-medium">{formatDistanceToNow(new Date(job.updatedAt), { addSuffix: true })}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Quick Actions */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {job.jobUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(job.jobUrl, "_blank")}
                              className="flex items-center gap-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Job Posting
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`https://www.google.com/search?q=${job.company}`, "_blank")}
                            className="flex items-center gap-2"
                          >
                            <Globe className="h-4 w-4" />
                            Company Info
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`https://www.linkedin.com/company/${job.company.toLowerCase().replace(/\s+/g, '-')}`, "_blank")}
                            className="flex items-center gap-2"
                          >
                            <User className="h-4 w-4" />
                            LinkedIn
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowEditDialog(true)}
                            className="flex items-center gap-2"
                          >
                            <Edit className="h-4 w-4" />
                            Edit Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="details" className="space-y-6 mt-0">
                    {/* Notes Section */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Notes & Comments
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {job.notes ? (
                          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{job.notes}</p>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No notes added yet</p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowEditDialog(true)}
                              className="mt-2"
                            >
                              Add Notes
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Additional Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Application Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Application ID</label>
                            <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">{job._id}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Created</label>
                            <p className="text-sm">{format(new Date(job.createdAt), "PPpp")}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="timeline" className="space-y-6 mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          Application Timeline
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Application Submitted</p>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(job.appliedDate), "PPpp")}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Last Updated</p>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(job.updatedAt), "PPpp")}
                              </p>
                            </div>
                          </div>

                          {job.status === "interviewing" && (
                            <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                              <div>
                                <p className="font-medium">Interview Stage</p>
                                <p className="text-sm text-muted-foreground">Application is currently under review</p>
                              </div>
                            </div>
                          )}

                          {job.status === "offer" && (
                            <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              <div>
                                <p className="font-medium">Offer Received 🎉</p>
                                <p className="text-sm text-muted-foreground">Congratulations on your job offer!</p>
                              </div>
                            </div>
                          )}

                          {job.status === "rejected" && (
                            <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                              <div>
                                <p className="font-medium">Application Declined</p>
                                <p className="text-sm text-muted-foreground">Keep going! The right opportunity is out there.</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EditJobDialog 
        job={job} 
        open={showEditDialog} 
        onOpenChange={setShowEditDialog} 
      />
    </>
  )
}
