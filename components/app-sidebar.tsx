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
import { adminRoutes } from "@/src/routes/adminRoutes"
import { userRoutes } from "@/src/routes/userRoutes"
import { Route } from "@/src/types"


export function AppSidebar({
  user, 
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>
}) {

  let routes: Route[] = []

  switch (user.role) {
    case "admin":
      routes = adminRoutes
      break;
    case "user":
      routes = userRoutes
      break;
  
    default:
      routes = []
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <SidebarGroupLabel>
          <Link href='/'>Home</Link>
        </SidebarGroupLabel>
        {routes.map((item) => (
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
