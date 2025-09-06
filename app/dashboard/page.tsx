"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Truck,
  BarChart2,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for tasks
const MOCK_TASKS = [
  {
    id: "1",
    title: "Complete quarterly report",
    dueDate: "2023-03-31",
    status: "pending",
    priority: "high",
  },
  {
    id: "2",
    title: "Review project proposal",
    dueDate: "2023-03-25",
    status: "completed",
    priority: "medium",
  },
  {
    id: "3",
    title: "Schedule team meeting",
    dueDate: "2023-03-22",
    status: "pending",
    priority: "low",
  },
  {
    id: "4",
    title: "Update equipment inventory",
    dueDate: "2023-03-28",
    status: "pending",
    priority: "medium",
  },
  {
    id: "5",
    title: "Prepare monthly presentation",
    dueDate: "2023-03-30",
    status: "pending",
    priority: "high",
  },
]

// Mock activity data
const MOCK_ACTIVITIES = [
  {
    id: "1",
    type: "task",
    action: "completed",
    subject: "Review project proposal",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    user: {
      name: "John Doe",
      avatar: "JD",
    },
  },
  {
    id: "2",
    type: "timesheet",
    action: "submitted",
    subject: "Weekly timesheet",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    user: {
      name: "Jane Smith",
      avatar: "JS",
    },
  },
  {
    id: "3",
    type: "equipment",
    action: "updated",
    subject: "Excavator XL2000 location",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    user: {
      name: "Robert Johnson",
      avatar: "RJ",
    },
  },
  {
    id: "4",
    type: "department",
    action: "joined",
    subject: "IT Department",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    user: {
      name: "Emily Chen",
      avatar: "EC",
    },
  },
]

// Mock stats data
const MOCK_STATS = {
  tasks: {
    total: 12,
    completed: 5,
    pending: 7,
    change: 15, // percentage change from last period
    trend: "up",
  },
  hours: {
    total: 38.5,
    billable: 32.5,
    nonBillable: 6,
    change: 8,
    trend: "up",
  },
  equipment: {
    total: 15,
    inUse: 12,
    maintenance: 2,
    available: 1,
    change: -5,
    trend: "down",
  },
  departments: {
    total: 4,
    active: 3,
    members: 28,
    change: 0,
    trend: "neutral",
  },
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { t } = useI18n()
  const [tasks, setTasks] = useState(MOCK_TASKS)
  const [newTask, setNewTask] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const pendingTasks = tasks.filter((task) => task.status === "pending")
  const completedTasks = tasks.filter((task) => task.status === "completed")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const addTask = () => {
    if (!newTask.trim()) return

    const task = {
      id: Date.now().toString(),
      title: newTask,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "pending",
      priority: "medium",
    }

    setTasks([...tasks, task])
    setNewTask("")
  }

  const toggleTaskStatus = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: task.status === "completed" ? "pending" : "completed" } : task,
      ),
    )
  }

  const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredPendingTasks = filteredTasks.filter((task) => task.status === "pending")
  const filteredCompletedTasks = filteredTasks.filter((task) => task.status === "completed")

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 24 * 60) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / (60 * 24))}d ago`
    }
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="container space-y-6 p-4">
        <h1 className="text-2xl font-bold">{t.dashboard.title}</h1>

        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Welcome back, {user?.name}!</h2>
                <p className="mt-1 text-muted-foreground">
                  Here's what's happening with your tasks and projects today.
                </p>
              </div>
              <div className="mt-4 flex space-x-2 md:mt-0">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Task
                </Button>
                <Button variant="outline">View Reports</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <Card className="dashboard-stat-card">
              <div className="flex items-center justify-between">
                <div className="dashboard-stat-icon">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <Badge
                  variant={MOCK_STATS.tasks.trend === "up" ? "success" : "destructive"}
                  className="flex items-center"
                >
                  {MOCK_STATS.tasks.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                  )}
                  {Math.abs(MOCK_STATS.tasks.change)}%
                </Badge>
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-muted-foreground">{t.dashboard.tasks}</h3>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold">{MOCK_STATS.tasks.total}</p>
                  <p className="ml-2 text-sm text-muted-foreground">
                    <span className="font-medium text-green-600">{MOCK_STATS.tasks.completed}</span> completed
                  </p>
                </div>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-secondary">
                <div
                  className="h-1.5 rounded-full bg-primary"
                  style={{ width: `${(MOCK_STATS.tasks.completed / MOCK_STATS.tasks.total) * 100}%` }}
                ></div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="dashboard-stat-card">
              <div className="flex items-center justify-between">
                <div className="dashboard-stat-icon">
                  <Clock className="h-5 w-5" />
                </div>
                <Badge
                  variant={MOCK_STATS.hours.trend === "up" ? "success" : "destructive"}
                  className="flex items-center"
                >
                  {MOCK_STATS.hours.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                  )}
                  {Math.abs(MOCK_STATS.hours.change)}%
                </Badge>
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-muted-foreground">{t.timesheet.title}</h3>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold">{MOCK_STATS.hours.total}h</p>
                  <p className="ml-2 text-sm text-muted-foreground">this week</p>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded bg-secondary/50 px-2 py-1">
                  <span className="font-medium text-primary">{MOCK_STATS.hours.billable}h</span> billable
                </div>
                <div className="rounded bg-secondary/50 px-2 py-1">
                  <span className="font-medium text-muted-foreground">{MOCK_STATS.hours.nonBillable}h</span>{" "}
                  non-billable
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="dashboard-stat-card">
              <div className="flex items-center justify-between">
                <div className="dashboard-stat-icon">
                  <Truck className="h-5 w-5" />
                </div>
                <Badge
                  variant={MOCK_STATS.equipment.trend === "up" ? "success" : "destructive"}
                  className="flex items-center"
                >
                  {MOCK_STATS.equipment.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                  )}
                  {Math.abs(MOCK_STATS.equipment.change)}%
                </Badge>
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-muted-foreground">{t.equipment.title}</h3>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold">{MOCK_STATS.equipment.total}</p>
                  <p className="ml-2 text-sm text-muted-foreground">units total</p>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div className="rounded bg-secondary/50 px-2 py-1">
                  <span className="font-medium text-green-600">{MOCK_STATS.equipment.inUse}</span> in use
                </div>
                <div className="rounded bg-secondary/50 px-2 py-1">
                  <span className="font-medium text-yellow-600">{MOCK_STATS.equipment.maintenance}</span> maint.
                </div>
                <div className="rounded bg-secondary/50 px-2 py-1">
                  <span className="font-medium text-blue-600">{MOCK_STATS.equipment.available}</span> avail.
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="dashboard-stat-card">
              <div className="flex items-center justify-between">
                <div className="dashboard-stat-icon">
                  <Briefcase className="h-5 w-5" />
                </div>
                <Badge
                  variant={MOCK_STATS.departments.trend === "up" ? "success" : "outline"}
                  className="flex items-center"
                >
                  {MOCK_STATS.departments.trend === "up" ? <ArrowUpRight className="mr-1 h-3 w-3" /> : null}
                  {Math.abs(MOCK_STATS.departments.change) || "No change"}
                </Badge>
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-muted-foreground">{t.navigation.department}</h3>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold">{MOCK_STATS.departments.total}</p>
                  <p className="ml-2 text-sm text-muted-foreground">departments</p>
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs">
                <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{MOCK_STATS.departments.members}</span>
                <span className="ml-1 text-muted-foreground">team members</span>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-7">
          {/* Tasks Section - 4 columns on medium screens and up */}
          <Card className="md:col-span-4">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t.dashboard.tasks}</CardTitle>
                  <CardDescription>Track your tasks and manage your workload</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder={t.dashboard.addTask}
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  className="flex-1"
                />
                <Button size="sm" onClick={addTask}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="flex items-center font-medium text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    {t.dashboard.pendingTasks} ({filteredPendingTasks.length})
                  </h3>
                  <div className="mt-2 space-y-2">
                    {isLoading ? (
                      // Loading skeleton
                      <>
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex animate-pulse items-center space-x-2 rounded-md border p-2">
                            <div className="h-4 w-4 rounded-sm bg-muted"></div>
                            <div className="flex-1">
                              <div className="h-4 w-3/4 rounded bg-muted"></div>
                              <div className="mt-1 h-3 w-1/4 rounded bg-muted"></div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : filteredPendingTasks.length > 0 ? (
                      <motion.div variants={containerVariants} initial="hidden" animate="show">
                        {filteredPendingTasks.map((task) => (
                          <motion.div
                            key={task.id}
                            variants={itemVariants}
                            className="group flex items-center space-x-2 rounded-md border p-2 transition-all hover:bg-accent"
                          >
                            <Checkbox
                              checked={task.status === "completed"}
                              onCheckedChange={() => toggleTaskStatus(task.id)}
                              className="h-4 w-4"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{task.title}</p>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                                {task.priority === "high" && (
                                  <Badge variant="destructive" className="ml-2">
                                    High
                                  </Badge>
                                )}
                                {task.priority === "medium" && (
                                  <Badge variant="warning" className="ml-2">
                                    Medium
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <AlertCircle className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <div className="flex h-20 items-center justify-center rounded-md border border-dashed">
                        <p className="text-sm text-muted-foreground">{t.dashboard.noTasks}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center font-medium text-muted-foreground">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    {t.dashboard.completedTasks} ({filteredCompletedTasks.length})
                  </h3>
                  <div className="mt-2 space-y-2">
                    {isLoading ? (
                      // Loading skeleton
                      <>
                        {[1, 2].map((i) => (
                          <div key={i} className="flex animate-pulse items-center space-x-2 rounded-md border p-2">
                            <div className="h-4 w-4 rounded-sm bg-muted"></div>
                            <div className="flex-1">
                              <div className="h-4 w-3/4 rounded bg-muted"></div>
                              <div className="mt-1 h-3 w-1/4 rounded bg-muted"></div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : filteredCompletedTasks.length > 0 ? (
                      <motion.div variants={containerVariants} initial="hidden" animate="show">
                        {filteredCompletedTasks.map((task) => (
                          <motion.div
                            key={task.id}
                            variants={itemVariants}
                            className="group flex items-center space-x-2 rounded-md border p-2 transition-all hover:bg-accent"
                          >
                            <Checkbox
                              checked={task.status === "completed"}
                              onCheckedChange={() => toggleTaskStatus(task.id)}
                              className="h-4 w-4"
                            />
                            <div className="flex-1">
                              <p className="line-through">{task.title}</p>
                              <p className="text-xs text-muted-foreground">
                                Completed on {format(new Date(), "MMM d, yyyy")}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <div className="flex h-20 items-center justify-center rounded-md border border-dashed">
                        <p className="text-sm text-muted-foreground">No completed tasks yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed - 3 columns on medium screens and up */}
          <Card className="md:col-span-3">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your team</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                // Loading skeleton
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex animate-pulse gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted"></div>
                      <div className="flex-1">
                        <div className="h-4 w-3/4 rounded bg-muted"></div>
                        <div className="mt-1 h-3 w-1/2 rounded bg-muted"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="show">
                  {MOCK_ACTIVITIES.map((activity) => (
                    <motion.div key={activity.id} className="flex gap-3" variants={itemVariants}>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://avatar.vercel.sh/${activity.user.name}`} />
                        <AvatarFallback>{activity.user.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user.name}</span>{" "}
                          <span className="text-muted-foreground">{activity.action}</span>{" "}
                          <span className="font-medium">{activity.subject}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{formatTimeAgo(activity.timestamp)}</p>
                      </div>
                    </motion.div>
                  ))}

                  <Button variant="outline" className="mt-2 w-full text-sm">
                    Load more activities
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Weekly Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
            <CardDescription>Your performance and activity for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="hours">
              <TabsList className="mb-4">
                <TabsTrigger value="hours">Hours Logged</TabsTrigger>
                <TabsTrigger value="tasks">Tasks Completed</TabsTrigger>
                <TabsTrigger value="equipment">Equipment Usage</TabsTrigger>
              </TabsList>

              <TabsContent value="hours" className="space-y-4">
                <div className="h-[200px] w-full rounded-md border">
                  {/* Placeholder for chart */}
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="text-center">
                      <BarChart2 className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Hours logged by day</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <TooltipProvider>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Total Hours</h3>
                        <Tooltip>
                          <TooltipTrigger>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>8% increase from last week</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <p className="mt-1 text-2xl font-bold">38.5h</p>
                      <p className="text-xs text-muted-foreground">Mar 15 - Mar 21, 2023</p>
                    </div>
                  </TooltipProvider>

                  <div className="rounded-lg border p-3">
                    <h3 className="text-sm font-medium">Billable Hours</h3>
                    <p className="mt-1 text-2xl font-bold">32.5h</p>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-secondary">
                      <div className="h-1.5 rounded-full bg-primary" style={{ width: "84%" }}></div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">84% of total hours</p>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h3 className="text-sm font-medium">Productivity</h3>
                    <p className="mt-1 text-2xl font-bold">92%</p>
                    <div className="mt-2 grid grid-cols-7 gap-1">
                      {[95, 90, 88, 92, 96, 91, 94].map((value, i) => (
                        <div key={i} className="space-y-1">
                          <div className="h-10 w-full rounded-sm bg-secondary">
                            <div className="rounded-sm bg-primary" style={{ height: `${value}%` }}></div>
                          </div>
                          <p className="text-center text-[10px] text-muted-foreground">
                            {["M", "T", "W", "T", "F", "S", "S"][i]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tasks">
                <div className="h-[200px] w-full rounded-md border">
                  {/* Placeholder for chart */}
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="text-center">
                      <CheckCircle2 className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Tasks completed by day</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="equipment">
                <div className="h-[200px] w-full rounded-md border">
                  {/* Placeholder for chart */}
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="text-center">
                      <Truck className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Equipment usage by type</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

