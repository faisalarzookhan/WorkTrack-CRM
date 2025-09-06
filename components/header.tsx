"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n"
import { Bell, LogOut, Menu, Search, Settings, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ThemeSwitcher from "@/components/theme-switcher"
import LanguageSwitcher from "@/components/language-switcher"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import NotificationCenter from "@/components/notification-center"

interface HeaderProps {
  title?: string
  showSearch?: boolean
  searchQuery?: string
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onMenuClick?: () => void
}

export default function Header({
  title,
  showSearch = false,
  searchQuery = "",
  onSearchChange,
  onMenuClick,
}: HeaderProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { t } = useI18n()
  const [notifications, setNotifications] = useState(3)
  const [showNotifications, setShowNotifications] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  // Close notifications panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (
        showNotifications &&
        !target.closest('[data-notification-center="true"]') &&
        !target.closest('[data-notification-trigger="true"]')
      ) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showNotifications])

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          {onMenuClick && (
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          {title && <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>}
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          {showSearch && (
            <>
              {/* Mobile search button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              >
                {isSearchExpanded ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>

              {/* Desktop search always visible, mobile search conditionally visible */}
              <AnimatePresence>
                {!isSearchExpanded && window.innerWidth < 768 ? null : (
                  <motion.div
                    className={`relative ${isSearchExpanded ? "absolute left-0 right-0 top-0 z-50 flex h-16 items-center justify-center bg-background px-4" : "hidden md:block"}`}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground md:left-3" />
                    <Input
                      type="search"
                      placeholder={t.common.search}
                      className="w-full rounded-lg bg-background pl-10 md:w-[300px] md:pl-9"
                      value={searchQuery || ""}
                      onChange={onSearchChange || (() => {})}
                    />
                    {isSearchExpanded && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 md:hidden"
                        onClick={() => setIsSearchExpanded(false)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          <div className="hidden md:flex md:items-center md:gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setShowNotifications(!showNotifications)}
            data-notification-trigger="true"
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]"
              >
                {notifications}
              </Badge>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://avatar.vercel.sh/${user?.username}`} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.username}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>{t.settings.title}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t.common.logout}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Notification Center */}
      <AnimatePresence>
        {showNotifications && <NotificationCenter onClose={() => setShowNotifications(false)} />}
      </AnimatePresence>
    </>
  )
}

