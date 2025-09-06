"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, FileText, Plus, CheckCircle, AlertCircle } from "lucide-react"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns"

// Mock timesheet data
const MOCK_TIMESHEETS = [
  {
    id: "1",
    date: "2023-03-20",
    startTime: "09:00",
    endTime: "17:00",
    breakDuration: 60,
    project: "Project Alpha",
    description: "Development work on new features",
    status: "approved",
  },
  {
    id: "2",
    date: "2023-03-19",
    startTime: "08:30",
    endTime: "16:30",
    breakDuration: 60,
    project: "Project Beta",
    description: "Bug fixes and testing",
    status: "approved",
  },
  {
    id: "3",
    date: "2023-03-18",
    startTime: "09:15",
    endTime: "17:45",
    breakDuration: 45,
    project: "Project Alpha",
    description: "Client meeting and documentation",
    status: "pending",
  },
  {
    id: "4",
    date: "2023-03-17",
    startTime: "09:00",
    endTime: "18:00",
    breakDuration: 60,
    project: "Project Gamma",
    description: "Training session",
    status: "approved",
  },
  {
    id: "5",
    date: "2023-03-16",
    startTime: "08:45",
    endTime: "16:45",
    breakDuration: 60,
    project: "Project Beta",
    description: "Code review and refactoring",
    status: "rejected",
  },
]

// Mock projects
const PROJECTS = ["Project Alpha", "Project Beta", "Project Gamma", "Project Delta", "Internal"]

export default function TimesheetPage() {
  const { user } = useAuth()
  const [date, setDate] = useState<Date>(new Date())
  const [timesheets, setTimesheets] = useState(MOCK_TIMESHEETS)
  const [showAddTimesheetDialog, setShowAddTimesheetDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("daily")

  // New timesheet form state
  const [newTimesheet, setNewTimesheet] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    startTime: "09:00",
    endTime: "17:00",
    breakDuration: 60,
    project: PROJECTS[0],
    description: "",
  })

  const handleAddTimesheet = () => {
    const timesheetData = {
      id: Date.now().toString(),
      ...newTimesheet,
      status: "pending",
    }

    setTimesheets([timesheetData, ...timesheets])
    setShowAddTimesheetDialog(false)
    setNewTimesheet({
      date: format(new Date(), "yyyy-MM-dd"),
      startTime: "09:00",
      endTime: "17:00",
      breakDuration: 60,
      project: PROJECTS[0],
      description: "",
    })
  }

  const calculateHours = (startTime: string, endTime: string, breakDuration: number) => {
    const [startHour, startMinute] = startTime.split(":").map(Number)
    const [endHour, endMinute] = endTime.split(":").map(Number)

    const startMinutes = startHour * 60 + startMinute
    const endMinutes = endHour * 60 + endMinute

    const totalMinutes = endMinutes - startMinutes - breakDuration
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return `${hours}h ${minutes}m`
  }

  const getCurrentWeekDates = () => {
    const start = startOfWeek(date, { weekStartsOn: 1 }) // Start on Monday
    const end = endOfWeek(date, { weekStartsOn: 1 })
    return eachDayOfInterval({ start, end })
  }

  const weekDates = getCurrentWeekDates()

  const getTimesheetForDate = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd")
    return timesheets.find((t) => t.date === formattedDate)
  }

  return (
    <div className="container space-y-6 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Timesheet</h1>
        <Button onClick={() => setShowAddTimesheetDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Time Entry
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Daily Timesheet</CardTitle>
              <CardDescription>Record your working hours for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="rounded-md border"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Time Entries for {format(date, "MMMM d, yyyy")}</h3>

                  {timesheets.some((t) => t.date === format(date, "yyyy-MM-dd")) ? (
                    <div className="space-y-4">
                      {timesheets
                        .filter((t) => t.date === format(date, "yyyy-MM-dd"))
                        .map((timesheet) => (
                          <div key={timesheet.id} className="rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{timesheet.project}</div>
                              <Badge
                                variant={
                                  timesheet.status === "approved"
                                    ? "success"
                                    : timesheet.status === "rejected"
                                      ? "destructive"
                                      : "outline"
                                }
                              >
                                {timesheet.status}
                              </Badge>
                            </div>
                            <div className="mt-2 text-sm text-muted-foreground">
                              {timesheet.startTime} - {timesheet.endTime} (
                              {calculateHours(timesheet.startTime, timesheet.endTime, timesheet.breakDuration)})
                            </div>
                            <div className="mt-1 text-sm">{timesheet.description}</div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <h3 className="mt-2 text-lg font-medium">No time entries</h3>
                      <p className="text-sm text-muted-foreground">Add a time entry for this date</p>
                      <Button variant="outline" className="mt-4" onClick={() => setShowAddTimesheetDialog(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Time Entry
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Weekly Timesheet</CardTitle>
              <CardDescription>View and manage your time entries for the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Button variant="outline" onClick={() => setDate(addDays(date, -7))}>
                    Previous Week
                  </Button>
                  <h3 className="font-medium">
                    Week of {format(weekDates[0], "MMM d")} - {format(weekDates[6], "MMM d, yyyy")}
                  </h3>
                  <Button variant="outline" onClick={() => setDate(addDays(date, 7))}>
                    Next Week
                  </Button>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {weekDates.map((day, index) => {
                    const timesheet = getTimesheetForDate(day)
                    const isToday = isSameDay(day, new Date())

                    return (
                      <div
                        key={index}
                        className={`flex flex-col rounded-lg border p-2 ${
                          isToday ? "border-primary bg-primary/5" : ""
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">{format(day, "EEE")}</div>
                          <div className={`text-lg font-medium ${isToday ? "text-primary" : ""}`}>
                            {format(day, "d")}
                          </div>
                        </div>

                        <div className="mt-2 flex-1">
                          {timesheet ? (
                            <div className="rounded-md bg-secondary p-2 text-xs">
                              <div className="font-medium">{timesheet.project}</div>
                              <div className="text-muted-foreground">
                                {calculateHours(timesheet.startTime, timesheet.endTime, timesheet.breakDuration)}
                              </div>
                              <div className="mt-1">
                                <Badge
                                  variant={
                                    timesheet.status === "approved"
                                      ? "success"
                                      : timesheet.status === "rejected"
                                        ? "destructive"
                                        : "outline"
                                  }
                                  className="text-[10px]"
                                >
                                  {timesheet.status}
                                </Badge>
                              </div>
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              className="h-auto w-full p-1 text-xs"
                              onClick={() => {
                                setDate(day)
                                setShowAddTimesheetDialog(true)
                              }}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Weekly Summary</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="rounded-md bg-secondary p-3">
                      <div className="text-sm text-muted-foreground">Total Hours</div>
                      <div className="text-2xl font-bold">38h 15m</div>
                    </div>
                    <div className="rounded-md bg-secondary p-3">
                      <div className="text-sm text-muted-foreground">Approved</div>
                      <div className="text-2xl font-bold">24h 30m</div>
                    </div>
                    <div className="rounded-md bg-secondary p-3">
                      <div className="text-sm text-muted-foreground">Pending</div>
                      <div className="text-2xl font-bold">8h 30m</div>
                    </div>
                    <div className="rounded-md bg-secondary p-3">
                      <div className="text-sm text-muted-foreground">Rejected</div>
                      <div className="text-2xl font-bold">5h 15m</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Timesheet History</CardTitle>
              <CardDescription>View and manage all your time entries</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timesheets.map((timesheet) => (
                    <TableRow key={timesheet.id}>
                      <TableCell>{new Date(timesheet.date).toLocaleDateString()}</TableCell>
                      <TableCell>{timesheet.project}</TableCell>
                      <TableCell>
                        {calculateHours(timesheet.startTime, timesheet.endTime, timesheet.breakDuration)}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{timesheet.description}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            timesheet.status === "approved"
                              ? "success"
                              : timesheet.status === "rejected"
                                ? "destructive"
                                : "outline"
                          }
                        >
                          {timesheet.status === "approved" && <CheckCircle className="mr-1 h-3 w-3" />}
                          {timesheet.status === "rejected" && <AlertCircle className="mr-1 h-3 w-3" />}
                          {timesheet.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showAddTimesheetDialog} onOpenChange={setShowAddTimesheetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Time Entry</DialogTitle>
            <DialogDescription>Record your working hours for a specific date</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={newTimesheet.date}
                  onChange={(e) => setNewTimesheet({ ...newTimesheet, date: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start-time">Start Time</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="start-time"
                    type="time"
                    value={newTimesheet.startTime}
                    onChange={(e) => setNewTimesheet({ ...newTimesheet, startTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end-time">End Time</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="end-time"
                    type="time"
                    value={newTimesheet.endTime}
                    onChange={(e) => setNewTimesheet({ ...newTimesheet, endTime: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="break">Break Duration (minutes)</Label>
              <Input
                id="break"
                type="number"
                min="0"
                step="15"
                value={newTimesheet.breakDuration}
                onChange={(e) => setNewTimesheet({ ...newTimesheet, breakDuration: Number.parseInt(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project">Project</Label>
              <Select
                value={newTimesheet.project}
                onValueChange={(value) => setNewTimesheet({ ...newTimesheet, project: value })}
              >
                <SelectTrigger id="project">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {PROJECTS.map((project) => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="What did you work on?"
                value={newTimesheet.description}
                onChange={(e) => setNewTimesheet({ ...newTimesheet, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddTimesheetDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTimesheet}>Save Entry</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

