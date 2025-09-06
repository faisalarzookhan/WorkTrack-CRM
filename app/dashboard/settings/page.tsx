"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "next-themes"
import { useI18n, languages, type LanguageCode } from "@/lib/i18n"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Check, Lock, Moon, Palette, Sun, User } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useI18n()

  // Profile settings
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.username || "",
    phone: "+1 (555) 123-4567",
    bio: "I work in the IT department and manage equipment resources.",
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    taskReminders: true,
    timesheetReminders: true,
    approvalUpdates: true,
    maintenanceAlerts: false,
  })

  // Security settings
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would update the user profile
    alert("Profile updated successfully!")
  }

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would update the password
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    alert("Password updated successfully!")
  }

  return (
    <div className="container space-y-6 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t.settings.title}</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            {t.settings.profile}
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" />
            {t.settings.appearance}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            {t.settings.notifications}
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="mr-2 h-4 w-4" />
            {t.settings.security}
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.settings.profile}</CardTitle>
              <CardDescription>Manage your profile information and preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg" alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" type="button">
                    Change Avatar
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    />
                  </div>
                </div>

                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.settings.appearance}</CardTitle>
              <CardDescription>Customize the appearance of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>{t.settings.theme}</Label>
                <RadioGroup value={theme} onValueChange={(value) => setTheme(value)} className="flex space-x-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light" className="flex items-center">
                      <Sun className="mr-2 h-4 w-4" />
                      {t.settings.light}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark" className="flex items-center">
                      <Moon className="mr-2 h-4 w-4" />
                      {t.settings.dark}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">{t.settings.system}</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>{t.settings.language}</Label>
                <Select value={language} onValueChange={(value) => setLanguage(value as LanguageCode)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(languages).map(([code, { name, flag }]) => (
                      <SelectItem key={code} value={code}>
                        <div className="flex items-center">
                          <span className="mr-2">{flag}</span>
                          <span>{name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Color Scheme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    className="h-20 w-full border-2 border-primary bg-background p-0"
                    onClick={() => document.documentElement.style.setProperty("--primary", "hsl(222.2 47.4% 11.2%)")}
                  >
                    <div className="flex h-full w-full flex-col">
                      <div className="h-1/2 w-full bg-primary"></div>
                      <div className="flex h-1/2 w-full items-center justify-center">Default</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 w-full border-2 border-blue-600 bg-background p-0"
                    onClick={() => document.documentElement.style.setProperty("--primary", "hsl(221.2 83.2% 53.3%)")}
                  >
                    <div className="flex h-full w-full flex-col">
                      <div className="h-1/2 w-full bg-blue-600"></div>
                      <div className="flex h-1/2 w-full items-center justify-center">Blue</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 w-full border-2 border-green-600 bg-background p-0"
                    onClick={() => document.documentElement.style.setProperty("--primary", "hsl(142.1 76.2% 36.3%)")}
                  >
                    <div className="flex h-full w-full flex-col">
                      <div className="h-1/2 w-full bg-green-600"></div>
                      <div className="flex h-1/2 w-full items-center justify-center">Green</div>
                    </div>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Layout Density</Label>
                <RadioGroup defaultValue="comfortable" className="flex space-x-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="density-compact" />
                    <Label htmlFor="density-compact">Compact</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comfortable" id="density-comfortable" />
                    <Label htmlFor="density-comfortable">Comfortable</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="spacious" id="density-spacious" />
                    <Label htmlFor="density-spacious">Spacious</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.settings.notifications}</CardTitle>
              <CardDescription>Configure how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications in the browser</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="task-reminders">Task Reminders</Label>
                    <p className="text-sm text-muted-foreground">Notifications for upcoming and overdue tasks</p>
                  </div>
                  <Switch
                    id="task-reminders"
                    checked={notifications.taskReminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, taskReminders: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="timesheet-reminders">Timesheet Reminders</Label>
                    <p className="text-sm text-muted-foreground">Reminders to submit your timesheet</p>
                  </div>
                  <Switch
                    id="timesheet-reminders"
                    checked={notifications.timesheetReminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, timesheetReminders: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="approval-updates">Approval Updates</Label>
                    <p className="text-sm text-muted-foreground">Updates on approval requests</p>
                  </div>
                  <Switch
                    id="approval-updates"
                    checked={notifications.approvalUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, approvalUpdates: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-alerts">Maintenance Alerts</Label>
                    <p className="text-sm text-muted-foreground">Alerts for equipment maintenance</p>
                  </div>
                  <Switch
                    id="maintenance-alerts"
                    checked={notifications.maintenanceAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, maintenanceAlerts: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.settings.security}</CardTitle>
              <CardDescription>Manage your account security settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSecuritySubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={securityForm.currentPassword}
                    onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={securityForm.newPassword}
                    onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={securityForm.confirmPassword}
                    onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                  />
                </div>
                <Button type="submit">Update Password</Button>
              </form>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <Button variant="outline">Enable 2FA</Button>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Login Sessions</h3>
                <p className="text-sm text-muted-foreground">Manage your active login sessions.</p>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">Windows 10 • Chrome • New York, USA</p>
                    </div>
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View All Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

