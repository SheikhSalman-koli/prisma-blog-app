import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"

// This is sample data.
const data = {

  navMain: [
     {
          title: "Write-blog",
          url: "/dashboard/write-blog",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <SidebarGroupLabel>
          <Link href='/'>Home</Link>
        </SidebarGroupLabel>
        {data.navMain.map((item) => (
          <SidebarMenu
            key={item.title}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={item.url}>{item.title}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
