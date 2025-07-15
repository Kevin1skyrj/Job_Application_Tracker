"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 shadow-sm">
      <div className="flex h-16 items-center px-6">
        <SidebarTrigger className="hover:bg-blue-50 dark:hover:bg-blue-900/20" />
        <Separator orientation="vertical" className="mx-4 h-6" />

        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search jobs, companies..."
              className="pl-10 bg-gray-50 dark:bg-gray-800 border-0 focus:bg-white dark:focus:bg-gray-700 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 ml-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative hover:bg-blue-50 dark:hover:bg-blue-900/20">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 border-2 border-white dark:border-gray-900">
              3
            </Badge>
          </Button>

          <ThemeToggle />

          <Separator orientation="vertical" className="h-6" />

          {/* User Avatar */}
          <Avatar className="h-9 w-9 ring-2 ring-blue-100 dark:ring-blue-900">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
