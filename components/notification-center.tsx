"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Calendar, Check, FileText, Info, Truck, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

// Mock notifications data
const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    type: "task",
    title: "New task assigned",
    description: "You have been assigned a new task: Complete quarterly report",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
  },
  {
    id: "2",
    type: "timesheet",
    title: "Timesheet approved",
    description: "Your timesheet for last week has been approved",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
  },
  {
    id: "3",
    type: "equipment",
    title: "Equipment maintenance",
    description: "Scheduled maintenance for Excavator XL2000 is due tomorrow",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
  },
  {
    id: "4",
    type: "system",
    title: "System update",
    description: "WorkTrack will be updated tonight at 2:00 AM. No downtime expected.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
  {
    id: "5",
    type: "task",
    title: "Task reminder",
    description: "Task 'Review project proposal' is due in 2 days",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: true,
  },
]

type NotificationType = "task" | "timesheet" | "equipment" | "system"

interface NotificationCenterProps {
  onClose: () => void
}

export default function NotificationCenter({ onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)
  const [activeTab, setActiveTab] = useState<string>("all")

  const filteredNotifications = activeTab === "all" ? notifications : notifications.filter((n) => n.type === activeTab)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "task":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "timesheet":
        return <Calendar className="h-5 w-5 text-green-500" />
      case "equipment":
        return <Truck className="h-5 w-5 text-yellow-500" />
      case "system":
        return <Info className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <motion.div
      className="fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-full max-w-sm border-l bg-background shadow-lg"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      data-notification-center="true"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Notifications</h2>
            {unreadCount > 0 && (
              <Badge variant="default" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="mr-1 h-4 w-4" />
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="relative rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="task"
                className="relative rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Tasks
              </TabsTrigger>
              <TabsTrigger
                value="timesheet"
                className="relative rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Timesheet
              </TabsTrigger>
              <TabsTrigger
                value="equipment"
                className="relative rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Equipment
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="flex-1 overflow-auto p-0">
            {filteredNotifications.length > 0 ? (
              <div className="divide-y">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex gap-3 p-4 transition-colors ${notification.read ? "bg-background" : "bg-primary/5"}`}
                  >
                    <div className="mt-1 flex-shrink-0">
                      {getNotificationIcon(notification.type as NotificationType)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{notification.title}</h3>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 h-7 px-2 text-xs"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="mr-1 h-3 w-3" />
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <Bell className="mb-2 h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-medium">No notifications</h3>
                <p className="text-sm text-muted-foreground">
                  {activeTab === "all"
                    ? "You don't have any notifications yet"
                    : `You don't have any ${activeTab} notifications`}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  )
}

