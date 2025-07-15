"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, SortAsc } from "lucide-react"
import { AddJobDialog } from "@/components/add-job-dialog"
import { JobCard } from "@/components/job-card"
import { useJobs } from "@/hooks/use-jobs"
import type { Job } from "@/types/job"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const columns = [
  {
    id: "applied",
    title: "Applied",
    color: "bg-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-700 dark:text-blue-300",
  },
  {
    id: "interviewing",
    title: "Interviewing",
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    textColor: "text-yellow-700 dark:text-yellow-300",
  },
  {
    id: "offer",
    title: "Offer",
    color: "bg-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    textColor: "text-green-700 dark:text-green-300",
  },
  {
    id: "rejected",
    title: "Rejected",
    color: "bg-red-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    textColor: "text-red-700 dark:text-red-300",
  },
]

export function JobBoard() {
  const { jobs, updateJob, isLoading } = useJobs()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])

  useEffect(() => {
    if (jobs) {
      let filtered = jobs.filter(
        (job) =>
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )

      // Sort jobs
      filtered = filtered.sort((a, b) => {
        if (sortBy === "date") {
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
        } else if (sortBy === "company") {
          return a.company.localeCompare(b.company)
        } else if (sortBy === "title") {
          return a.title.localeCompare(b.title)
        }
        return 0
      })

      setFilteredJobs(filtered)
    }
  }, [jobs, searchTerm, sortBy])

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return

    const jobId = result.draggableId
    const newStatus = result.destination.droppableId as Job["status"]

    await updateJob(jobId, { status: newStatus })
  }

  const getJobsByStatus = (status: string) => {
    return filteredJobs?.filter((job) => job.status === status) || []
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <Card key={column.id} className="h-96 shadow-lg border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${column.color}`} />
                  <CardTitle className="text-sm font-semibold">{column.title}</CardTitle>
                </div>
                <Badge variant="secondary" className="animate-pulse">
                  0
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-muted rounded-xl" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4 w-full sm:w-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search jobs, companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-50 dark:bg-gray-800 border-0"
                />
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-gray-50 dark:bg-gray-800 border-0">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="company">Sort by Company</SelectItem>
                  <SelectItem value="title">Sort by Title</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <AddJobDialog>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Job
              </Button>
            </AddJobDialog>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => {
            const columnJobs = getJobsByStatus(column.id)

            return (
              <Card key={column.id} className={`flex flex-col h-fit min-h-96 shadow-lg border-0 ${column.bgColor}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${column.color} shadow-lg`} />
                      <CardTitle className={`text-sm font-bold ${column.textColor}`}>{column.title}</CardTitle>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${column.textColor} bg-white/50 dark:bg-gray-800/50 font-semibold`}
                    >
                      {columnJobs.length}
                    </Badge>
                  </div>
                </CardHeader>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <CardContent
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 space-y-4 transition-all duration-200 ${
                        snapshot.isDraggingOver ? "bg-white/50 dark:bg-gray-800/50 rounded-lg" : ""
                      }`}
                    >
                      {columnJobs.map((job, index) => (
                        <Draggable key={job._id} draggableId={job._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`transition-all duration-200 ${
                                snapshot.isDragging ? "rotate-3 scale-105 shadow-2xl z-50" : "hover:scale-102"
                              }`}
                            >
                              <JobCard job={job} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {columnJobs.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/50 dark:bg-gray-800/50 flex items-center justify-center">
                            <Plus className="h-8 w-8" />
                          </div>
                          <p className="text-sm font-medium">No jobs in {column.title.toLowerCase()}</p>
                          <p className="text-xs mt-1">Drag jobs here or add new ones</p>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Droppable>
              </Card>
            )
          })}
        </div>
      </DragDropContext>
    </div>
  )
}
