"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Mail, MapPin, Phone, User } from "lucide-react"
import Header from "@/components/header"

export default function ProfilePage() {
  const { user } = useAuth()

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.username || "",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    department: user?.departments[0] || "Unassigned",
    bio: "I work in the IT department and manage equipment resources. I have been with the company for 3 years and specialize in project management and resource allocation.",
    skills: ["Project Management", "Equipment Handling", "Team Leadership", "Resource Planning"],
    joinDate: "January 15, 2020",
  })

  // Mock activity data
  const recentActivities = [
    { id: 1, type: "task", action: "completed", item: "Quarterly Report", date: "2023-03-20" },
    { id: 2, type: "timesheet", action: "submitted", item: "Weekly Timesheet", date: "2023-03-19" },
    { id: 3, type: "equipment", action: "updated", item: "Excavator XL2000 location", date: "2023-03-18" },
    { id: 4, type: "task", action: "created", item: "Schedule Team Meeting", date: "2023-03-17" },
    { id: 5, type: "department", action: "joined", item: "IT Department", date: "2023-03-15" },
  ]

  // Mock projects data
  const projects = [
    { id: 1, name: "Project Alpha", role: "Project Manager", status: "In Progress", completion: 65 },
    { id: 2, name: "Project Beta", role: "Team Member", status: "Completed", completion: 100 },
    { id: 3, name: "Project Gamma", role: "Resource Coordinator", status: "Planning", completion: 15 },
  ]

  const handleSaveProfile = () => {
    // In a real app, this would save to the backend
    alert("Profile updated successfully!")
  }

  return (
    <div className="space-y-6 pb-10">
      <Header title="Profile" />

      <div className="container space-y-6 p-4">
        {/* Profile Header */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={`https://avatar.vercel.sh/${user?.username}`} alt={user?.name} />
              <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-muted-foreground">
                {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} • {user?.departments.join(", ")}
              </p>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-1 h-4 w-4" />
                  {user?.username}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {profileData.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  Joined {profileData.joinDate}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button>Edit Profile</Button>
              <Button variant="outline">View Reports</Button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Sidebar */}
          <div className="space-y-6 md:col-span-1">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{profileData.bio}</p>

                <div className="mt-4">
                  <h3 className="mb-2 text-sm font-medium">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{profileData.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="mb-2 text-sm font-medium">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-2">
                      <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                        {activity.type === "task" && <FileText className="h-3 w-3 text-primary" />}
                        {activity.type === "timesheet" && <Calendar className="h-3 w-3 text-primary" />}
                        {activity.type === "equipment" && <FileText className="h-3 w-3 text-primary" />}
                        {activity.type === "department" && <User className="h-3 w-3 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.action}</span> {activity.item}
                        </p>
                        <p className="text-xs text-muted-foreground">{new Date(activity.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Projects Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>Projects you are currently working on</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div key={project.id} className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{project.name}</h3>
                            <Badge
                              variant={
                                project.status === "Completed"
                                  ? "success"
                                  : project.status === "In Progress"
                                    ? "info"
                                    : "warning"
                              }
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">Role: {project.role}</p>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs">
                              <span>Progress</span>
                              <span>{project.completion}%</span>
                            </div>
                            <div className="mt-1 h-2 w-full rounded-full bg-secondary">
                              <div
                                className="h-2 rounded-full bg-primary"
                                style={{ width: `${project.completion}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Statistics</CardTitle>
                    <CardDescription>Your performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-lg border p-4 text-center">
                        <h3 className="text-sm font-medium text-muted-foreground">Tasks Completed</h3>
                        <p className="mt-2 text-3xl font-bold">24</p>
                        <p className="mt-1 text-xs text-muted-foreground">Last 30 days</p>
                      </div>
                      <div className="rounded-lg border p-4 text-center">
                        <h3 className="text-sm font-medium text-muted-foreground">Hours Logged</h3>
                        <p className="mt-2 text-3xl font-bold">156</p>
                        <p className="mt-1 text-xs text-muted-foreground">Last 30 days</p>
                      </div>
                      <div className="rounded-lg border p-4 text-center">
                        <h3 className="text-sm font-medium text-muted-foreground">Efficiency Rate</h3>
                        <p className="mt-2 text-3xl font-bold">92%</p>
                        <p className="mt-1 text-xs text-muted-foreground">Above average</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>All Projects</CardTitle>
                        <CardDescription>All projects you are involved with</CardDescription>
                      </div>
                      <Button>
                        <FileText className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 border-b bg-muted/50 p-3 text-sm font-medium">
                        <div>Project Name</div>
                        <div>Role</div>
                        <div>Status</div>
                        <div>Progress</div>
                      </div>
                      {projects.map((project) => (
                        <div key={project.id} className="grid grid-cols-4 border-b p-3 text-sm last:border-0">
                          <div className="font-medium">{project.name}</div>
                          <div>{project.role}</div>
                          <div>
                            <Badge
                              variant={
                                project.status === "Completed"
                                  ? "success"
                                  : project.status === "In Progress"
                                    ? "info"
                                    : "warning"
                              }
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-full rounded-full bg-secondary">
                                <div
                                  className="h-2 rounded-full bg-primary"
                                  style={{ width: `${project.completion}%` }}
                                ></div>
                              </div>
                              <span className="w-8 text-xs">{project.completion}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Update your profile information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        />
                      </div>

                      <Button type="button" onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Notification settings can be managed in the Settings page.
                    </p>
                    <Button variant="outline" className="mt-4">
                      Go to Notification Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

