"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { RemindersDialog } from "@/components/reminders-dialog"
import { useReminders } from "@/hooks/use-reminders"
import { useUser, UserButton } from '@clerk/nextjs'

export function DashboardHeader() {
  const { getReminderCount, getHighPriorityCount } = useReminders()
  const reminderCount = getReminderCount()
  const highPriorityCount = getHighPriorityCount()
  const { user } = useUser()

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
          <RemindersDialog>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative h-10 w-10 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 group"
            >
              <div className="relative">
                <Bell className={`h-5 w-5 transition-all duration-300 ${
                  reminderCount > 0 
                    ? 'text-blue-600 dark:text-blue-400 group-hover:scale-110' 
                    : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                }`} />
                
                {/* Notification Badge */}
                {reminderCount > 0 && (
                  <>
                    {/* Pulsing Ring for High Priority */}
                    {highPriorityCount > 0 && (
                      <div className="absolute -inset-1 rounded-full bg-red-400 opacity-75 animate-ping" />
                    )}
                    
                    {/* Main Badge */}
                    <div className={`absolute -top-2 -right-2 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg border-2 border-white dark:border-gray-900 transition-all duration-300 transform group-hover:scale-110 ${
                      highPriorityCount > 0 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-600'
                    }`}>
                      {reminderCount > 99 ? '99+' : reminderCount}
                    </div>
                    
                    {/* Subtle Glow Effect */}
                    <div className={`absolute -top-2 -right-2 min-w-[18px] h-[18px] rounded-full opacity-30 blur-sm ${
                      highPriorityCount > 0 ? 'bg-red-500' : 'bg-blue-500'
                    }`} />
                  </>
                )}
                
                {/* Success State (No Reminders) */}
                {reminderCount === 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </div>
              
              {/* Tooltip-like Hover Effect */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded-md whitespace-nowrap">
                  {reminderCount === 0 ? 'No reminders' : `${reminderCount} reminder${reminderCount !== 1 ? 's' : ''}`}
                  {highPriorityCount > 0 && (
                    <span className="text-red-300 dark:text-red-600"> • {highPriorityCount} urgent</span>
                  )}
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-gray-900 dark:border-b-gray-100" />
              </div>
            </Button>
          </RemindersDialog>

          <ThemeToggle />

          <Separator orientation="vertical" className="h-6" />

          {/* User Profile */}
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 ring-2 ring-blue-100 dark:ring-blue-900"
              }
            }}
          />
        </div>
      </div>
    </header>
  )
}
