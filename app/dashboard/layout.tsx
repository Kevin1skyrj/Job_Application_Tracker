import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar" // Import SidebarInset
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <AppSidebar />
        <SidebarInset>
          {" "}
          {/* Wrap main content with SidebarInset */}
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
