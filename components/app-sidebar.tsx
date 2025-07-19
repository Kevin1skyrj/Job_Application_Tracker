"use client"

import { Briefcase, Home, Plus, Settings, BarChart3, Target } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AddJobDialog } from "@/components/add-job-dialog"
import { SetGoalDialog } from "@/components/set-goal-dialog"
import { useNavigation } from "@/components/navigation-provider"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
]

const quickActions = [
  {
    title: "Add Job",
    icon: Plus,
    action: "add-job",
  },
  {
    title: "Set Goal",
    icon: Target,
    action: "set-goal",
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { navigateWithLoader, isLoading } = useNavigation()

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas" className="border-r-0 shadow-xl">
      {" "}
      {/* Explicitly set variant and collapsible */}
      <SidebarHeader className="border-b px-6 py-6 bg-white dark:bg-gray-900">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src="/logo/logoJobflow.png" 
              alt="JobFlow Logo" 
              className="h-10 w-auto object-contain" 
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname === item.url}
                    className={`h-11 px-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer ${
                      isLoading ? 'opacity-50 pointer-events-none' : ''
                    }`}
                    onClick={() => navigateWithLoader(item.url)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {quickActions.map((action) => (
                <SidebarMenuItem key={action.title}>
                  {action.action === "add-job" ? (
                    <AddJobDialog>
                      <SidebarMenuButton className="h-11 px-4 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 w-full">
                        <action.icon className="h-5 w-5 mr-3 text-green-600" />
                        <span className="font-medium">{action.title}</span>
                      </SidebarMenuButton>
                    </AddJobDialog>
                  ) : action.action === "set-goal" ? (
                    <SetGoalDialog>
                      <SidebarMenuButton className="h-11 px-4 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 w-full">
                        <action.icon className="h-5 w-5 mr-3 text-purple-600" />
                        <span className="font-medium">{action.title}</span>
                      </SidebarMenuButton>
                    </SetGoalDialog>
                  ) : (
                    <SidebarMenuButton className="h-11 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-all duration-200 w-full">
                      <action.icon className="h-5 w-5 mr-3 text-gray-600" />
                      <span className="font-medium">{action.title}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="w-full h-11 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer"
              onClick={() => navigateWithLoader("/dashboard/settings")}
            >
              <Settings className="h-5 w-5 mr-3" />
              <span className="font-medium">Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
    </Sidebar>
  )
}
