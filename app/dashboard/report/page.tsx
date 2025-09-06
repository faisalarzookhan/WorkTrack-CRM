"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BarChart, CalendarIcon, Download, FileText, PieChart, Printer, Share2, Plus } from "lucide-react"
import { format, subDays } from "date-fns"

export default function ReportPage() {
  const { user } = useAuth()
  const [reportType, setReportType] = useState("timesheet")
  const [dateRange, setDateRange] = useState("week")
  const [date, setDate] = useState<Date>(new Date())

  const formatDateRange = () => {
    const today = new Date()

    switch (dateRange) {
      case "week":
        return `${format(subDays(today, 7), "MMM d, yyyy")} - ${format(today, "MMM d, yyyy")}`
      case "month":
        return `${format(subDays(today, 30), "MMM d, yyyy")} - ${format(today, "MMM d, yyyy")}`
      case "quarter":
        return `${format(subDays(today, 90), "MMM d, yyyy")} - ${format(today, "MMM d, yyyy")}`
      default:
        return format(today, "MMM d, yyyy")
    }
  }

  return (
    <div className="container space-y-6 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last 90 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">164.5</div>
            <p className="text-xs text-muted-foreground">+12.5% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+4 from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Equipment Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+7% from previous period</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timesheet" onValueChange={setReportType} className="space-y-4">
        <TabsList>
          <TabsTrigger value="timesheet">Timesheet</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
        </TabsList>

        <TabsContent value="timesheet" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Timesheet Report</CardTitle>
                <CardDescription>Hours worked for {formatDateRange()}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border border-dashed p-4 flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="mx-auto h-8 w-8 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">Hours by Project</h3>
                  <p className="text-sm text-muted-foreground">Bar chart showing hours worked by project</p>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <h3 className="font-medium">Summary</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Project Alpha</span>
                      <span className="font-medium">68.5 hours</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[42%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Project Beta</span>
                      <span className="font-medium">45.0 hours</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[27%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Project Gamma</span>
                      <span className="font-medium">32.0 hours</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[19%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Internal</span>
                      <span className="font-medium">19.0 hours</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[12%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Task Report</CardTitle>
                <CardDescription>Task completion for {formatDateRange()}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border border-dashed p-4 flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="mx-auto h-8 w-8 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">Task Status Distribution</h3>
                  <p className="text-sm text-muted-foreground">Pie chart showing task status distribution</p>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <h3 className="font-medium">Summary</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-md bg-secondary p-3">
                    <div className="text-sm text-muted-foreground">Completed</div>
                    <div className="text-2xl font-bold">28</div>
                    <Badge variant="success" className="mt-1">
                      70%
                    </Badge>
                  </div>
                  <div className="rounded-md bg-secondary p-3">
                    <div className="text-sm text-muted-foreground">In Progress</div>
                    <div className="text-2xl font-bold">8</div>
                    <Badge variant="warning" className="mt-1">
                      20%
                    </Badge>
                  </div>
                  <div className="rounded-md bg-secondary p-3">
                    <div className="text-sm text-muted-foreground">Pending</div>
                    <div className="text-2xl font-bold">4</div>
                    <Badge variant="destructive" className="mt-1">
                      10%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Equipment Usage Report</CardTitle>
                <CardDescription>Equipment utilization for {formatDateRange()}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border border-dashed p-4 flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="mx-auto h-8 w-8 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">Equipment Usage</h3>
                  <p className="text-sm text-muted-foreground">Bar chart showing equipment usage by type</p>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <h3 className="font-medium">Equipment Status</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-md bg-secondary p-3">
                    <div className="text-sm text-muted-foreground">Operational</div>
                    <div className="text-2xl font-bold">12</div>
                    <Badge variant="success" className="mt-1">
                      80%
                    </Badge>
                  </div>
                  <div className="rounded-md bg-secondary p-3">
                    <div className="text-sm text-muted-foreground">Maintenance</div>
                    <div className="text-2xl font-bold">2</div>
                    <Badge variant="warning" className="mt-1">
                      13%
                    </Badge>
                  </div>
                  <div className="rounded-md bg-secondary p-3">
                    <div className="text-sm text-muted-foreground">Non-operational</div>
                    <div className="text-2xl font-bold">1</div>
                    <Badge variant="destructive" className="mt-1">
                      7%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>Configure automatic report generation and delivery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-md border p-4">
              <div>
                <h3 className="font-medium">Weekly Timesheet Report</h3>
                <p className="text-sm text-muted-foreground">Sent every Monday at 8:00 AM</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Email</Badge>
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-md border p-4">
              <div>
                <h3 className="font-medium">Monthly Equipment Report</h3>
                <p className="text-sm text-muted-foreground">Sent on the 1st of each month</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Email</Badge>
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Schedule New Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

