import * as React from "react"
import {
  Sprout,
  Home,
  LineChart,
  Settings2,
  Leaf,
  Sun,
  Heart,
  Plus,
} from "lucide-react"

import { NavMain } from "@/presentation/layouts/main-layout/sidebar/nav-main"
import { NavProjects } from "@/presentation/layouts/main-layout/sidebar/nav-projects"
import { NavUser } from "@/presentation/layouts/main-layout/sidebar/nav-user"
import { TeamSwitcher } from "@/presentation/layouts/main-layout/sidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/presentation/components/ui/sidebar"

const data = {
  user: {
    name: "John Garden",
    email: "john@plantcare.com",
    avatar: "/images/default-avatar.jpg",
  },
  teams: [
    {
      name: "Indoor Plants",
      logo: Leaf,
      plan: "Active",
    },
    {
      name: "Outdoor Garden",
      logo: Sun,
      plan: "Active",
    },
    {
      name: "Herb Garden",
      logo: Sprout,
      plan: "Planning",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Statistics",
          url: "/dashboard/statistics",
        },
        {
          title: "Reports",
          url: "/dashboard/reports",
        },
      ],
    },
    {
      title: "Plant Care",
      url: "/plant-care",
      icon: Heart,
      items: [
        {
          title: "Watering Schedule",
          url: "/plant-care/watering",
        },
        {
          title: "Fertilizing",
          url: "/plant-care/fertilizing",
        },
        {
          title: "Health Tracking",
          url: "/plant-care/health",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: LineChart,
      items: [
        {
          title: "Growth Trends",
          url: "/analytics/growth",
        },
        {
          title: "Water Usage",
          url: "/analytics/water",
        },
        {
          title: "Health History",
          url: "/analytics/health",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "Preferences",
          url: "/settings/preferences",
        },
        {
          title: "Notifications",
          url: "/settings/notifications",
        },
        {
          title: "Account",
          url: "/settings/account",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Indoor Collection",
      url: "/collections/indoor",
      icon: Leaf,
    },
    {
      name: "Garden Beds",
      url: "/collections/garden",
      icon: Sun,
    },
    {
      name: "New Plants",
      url: "/collections/new",
      icon: Plus,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
