"use client"

import { usePathname, useRouter } from "next/navigation"
import { BarChart2, Briefcase, Calendar, Home, Settings, Truck } from "lucide-react"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

const navItems = [
  {
    name: "navigation.dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "navigation.department",
    href: "/dashboard/department",
    icon: Briefcase,
  },
  {
    name: "navigation.timesheet",
    href: "/dashboard/timesheet",
    icon: Calendar,
  },
  {
    name: "navigation.equipment",
    href: "/dashboard/equipment",
    icon: Truck,
  },
  {
    name: "navigation.report",
    href: "/dashboard/report",
    icon: BarChart2,
  },
  {
    name: "navigation.settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export default function BottomNavBar() {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useI18n()

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className={cn("nav-item", isActive ? "nav-item-active" : "nav-item-inactive")}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{t[item.name as keyof typeof t]}</span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute bottom-0 h-1 w-12 rounded-t-md bg-primary"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

