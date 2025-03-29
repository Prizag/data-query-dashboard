"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import {
  SidebarProvider,
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Home, History, Settings, HelpCircle, Database } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const queryHistory = useSelector((state: RootState) => state.queries.history)

  return (
    <SidebarProvider defaultOpen={isOpen}>
      <ShadcnSidebar>
        <SidebarHeader className="flex items-center justify-center py-4">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">DataQuery AI</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <Home />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <HelpCircle />
                    <span>Help</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Recent Queries</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {queryHistory.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-muted-foreground">No recent queries</div>
                ) : (
                  queryHistory.map((query, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton>
                        <History className="h-4 w-4" />
                        <span>{query.text}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="text-xs text-muted-foreground">Gen AI Analytics Tool v1.0</div>
        </SidebarFooter>
      </ShadcnSidebar>
    </SidebarProvider>
  )
}

