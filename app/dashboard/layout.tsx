"use client"

import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardGuard } from "@/components/dashboard-guard"
import { JobsProvider } from "@/contexts/jobs-context"
import { GoalsProvider } from "@/contexts/goals-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardGuard>
      <JobsProvider>
        <GoalsProvider>
          <SidebarProvider>
            <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
              <AppSidebar />
              <SidebarInset>
                <DashboardHeader />
                <main className="flex-1 p-3 sm:p-6 overflow-auto">{children}</main>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </GoalsProvider>
      </JobsProvider>
    </DashboardGuard>
  )
}
