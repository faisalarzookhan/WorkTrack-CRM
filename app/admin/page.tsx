"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, CheckCircle, Trash2, UserPlus, Users, Edit, Building, Truck } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import AdminHeader from "@/components/admin-header"
import AdminSidebar from "@/components/admin-sidebar"

// Mock user data
const MOCK_USERS = [
  {
    id: "1",
    username: "1234@xyz.com",
    name: "John Doe",
    role: "user",
    departments: ["HR"],
    status: "active",
    lastLogin: "2023-03-15T10:30:00",
    createdAt: "2023-01-10T08:00:00",
  },
  {
    id: "2",
    username: "2902@xyz.com",
    name: "Faisal",
    role: "user",
    departments: ["IT", "Administrator"],
    status: "active",
    lastLogin: "2023-03-18T14:45:00",
    createdAt: "2023-01-15T09:30:00",
  },
  {
    id: "3",
    username: "admin@xyz.com",
    name: "Admin User",
    role: "admin",
    departments: ["All"],
    status: "active",
    lastLogin: "2023-03-20T09:15:00",
    createdAt: "2022-12-01T10:00:00",
  },
  {
    id: "4",
    username: "5678@xyz.com",
    name: "Jane Smith",
    role: "user",
    departments: ["HR"],
    status: "inactive",
    lastLogin: "2023-02-28T16:20:00",
    createdAt: "2023-01-20T11:15:00",
  },
  {
    id: "5",
    username: "9012@xyz.com",
    name: "Robert Johnson",
    role: "user",
    departments: ["Finance"],
    status: "active",
    lastLogin: "2023-03-19T11:10:00",
    createdAt: "2023-02-05T13:45:00",
  },
]

// Mock department data
const MOCK_DEPARTMENTS = [
  {
    id: "1",
    name: "Human Resources",
    code: "HR",
    description: "Manages employee relations and recruitment",
    memberCount: 12,
    createdAt: "2022-10-01T09:00:00",
  },
  {
    id: "2",
    name: "Information Technology",
    code: "IT",
    description: "Handles technical infrastructure and support",
    memberCount: 8,
    createdAt: "2022-10-01T09:00:00",
  },
  {
    id: "3",
    name: "Finance",
    code: "FIN",
    description: "Manages company finances and accounting",
    memberCount: 6,
    createdAt: "2022-10-01T09:00:00",
  },
  {
    id: "4",
    name: "Administration",
    code: "Administrator",
    description: "Oversees administrative functions",
    memberCount: 5,
    createdAt: "2022-10-01T09:00:00",
  },
  {
    id: "5",
    name: "Operations",
    code: "OPS",
    description: "Manages day-to-day operations",
    memberCount: 15,
    createdAt: "2022-11-15T10:30:00",
  },
]

// Mock equipment data
const MOCK_EQUIPMENT = [
  {
    id: "1",
    name: "Excavator XL2000",
    type: "Heavy Machinery",
    status: "operational",
    location: "Site A",
    assignedTo: "John Doe",
    lastMaintenance: "2023-02-15",
  },
  {
    id: "2",
    name: "Bulldozer B500",
    type: "Heavy Machinery",
    status: "maintenance",
    location: "Maintenance Bay",
    assignedTo: null,
    lastMaintenance: "2023-03-10",
  },
  {
    id: "3",
    name: "Delivery Truck DT-103",
    type: "Vehicle",
    status: "operational",
    location: "Site B",
    assignedTo: "Robert Johnson",
    lastMaintenance: "2023-01-20",
  },
  {
    id: "4",
    name: "Forklift F-22",
    type: "Warehouse Equipment",
    status: "operational",
    location: "Warehouse",
    assignedTo: "Jane Smith",
    lastMaintenance: "2023-02-28",
  },
  {
    id: "5",
    name: "Crane C-1000",
    type: "Heavy Machinery",
    status: "non-operational",
    location: "Repair Shop",
    assignedTo: null,
    lastMaintenance: "2023-03-05",
  },
]

// Mock driver data
const MOCK_DRIVERS = [
  {
    id: "1",
    name: "Michael Brown",
    licenseNumber: "DL-12345",
    licenseType: "Commercial",
    status: "available",
    currentLocation: "Site A",
    contactNumber: "555-1234",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    licenseNumber: "DL-67890",
    licenseType: "Commercial",
    status: "on-duty",
    currentLocation: "In Transit",
    contactNumber: "555-5678",
  },
  {
    id: "3",
    name: "David Lee",
    licenseNumber: "DL-24680",
    licenseType: "Commercial",
    status: "off-duty",
    currentLocation: "Home",
    contactNumber: "555-9012",
  },
  {
    id: "4",
    name: "Emily Chen",
    licenseNumber: "DL-13579",
    licenseType: "Commercial",
    status: "on-duty",
    currentLocation: "Site B",
    contactNumber: "555-3456",
  },
  {
    id: "5",
    name: "James Taylor",
    licenseNumber: "DL-97531",
    licenseType: "Commercial",
    status: "available",
    currentLocation: "Office",
    contactNumber: "555-7890",
  },
]

// Mock approval requests
const MOCK_APPROVALS = [
  {
    id: "1",
    type: "location_update",
    requestedBy: "Jane Smith",
    requestedAt: "2023-03-18T14:30:00",
    status: "pending",
    details: {
      equipment: "Excavator XL2000",
      oldLocation: "Site A",
      newLocation: "Site C",
    },
  },
  {
    id: "2",
    type: "driver_assignment",
    requestedBy: "Robert Johnson",
    requestedAt: "2023-03-19T09:45:00",
    status: "approved",
    details: {
      driver: "Michael Brown",
      equipment: "Delivery Truck DT-103",
    },
  },
  {
    id: "3",
    type: "maintenance_request",
    requestedBy: "Faisal",
    requestedAt: "2023-03-20T11:15:00",
    status: "pending",
    details: {
      equipment: "Forklift F-22",
      reason: "Hydraulic system issues",
    },
  },
  {
    id: "4",
    type: "new_equipment",
    requestedBy: "John Doe",
    requestedAt: "2023-03-17T16:20:00",
    status: "rejected",
    details: {
      equipmentType: "Crane",
      model: "C-2000",
      reason: "Budget constraints",
    },
  },
  {
    id: "5",
    type: "driver_leave",
    requestedBy: "David Lee",
    requestedAt: "2023-03-16T10:30:00",
    status: "approved",
    details: {
      startDate: "2023-04-01",
      endDate: "2023-04-05",
      reason: "Personal leave",
    },
  },
]

export default function AdminPage() {
  const { user, isAdmin } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState(MOCK_USERS)
  const [departments, setDepartments] = useState(MOCK_DEPARTMENTS)
  const [equipment, setEquipment] = useState(MOCK_EQUIPMENT)
  const [drivers, setDrivers] = useState(MOCK_DRIVERS)
  const [approvals, setApprovals] = useState(MOCK_APPROVALS)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddUserDialog, setShowAddUserDialog] = useState(false)
  const [showAddDepartmentDialog, setShowAddDepartmentDialog] = useState(false)
  const [showAddEquipmentDialog, setShowAddEquipmentDialog] = useState(false)
  const [showAddDriverDialog, setShowAddDriverDialog] = useState(false)

  // New user form state
  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
    role: "user",
    departments: [] as string[],
    password: "",
  })

  // New department form state
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    code: "",
    description: "",
  })

  // New equipment form state
  const [newEquipment, setNewEquipment] = useState({
    name: "",
    type: "",
    status: "operational",
    location: "",
    assignedTo: "",
  })

  // New driver form state
  const [newDriver, setNewDriver] = useState({
    name: "",
    licenseNumber: "",
    licenseType: "Commercial",
    status: "available",
    currentLocation: "",
    contactNumber: "",
  })

  useEffect(() => {
    // Redirect if not admin
    if (!isAdmin) {
      router.push("/dashboard")
    }
  }, [isAdmin, router])

  if (!isAdmin) {
    return null
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredEquipment = equipment.filter(
    (equip) =>
      equip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equip.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equip.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.currentLocation.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddUser = () => {
    if (!newUser.username || !newUser.name || !newUser.password) {
      setError("Please fill in all required fields")
      return
    }

    if (newUser.password.length < 6 || newUser.password.length > 16) {
      setError("Password must be between 6 and 16 characters")
      return
    }

    const userData = {
      id: Date.now().toString(),
      username: newUser.username,
      name: newUser.name,
      role: newUser.role,
      departments: newUser.departments.length > 0 ? newUser.departments : ["Unassigned"],
      status: "active",
      lastLogin: null,
      createdAt: new Date().toISOString(),
    }

    setUsers([...users, userData])
    setShowAddUserDialog(false)
    setNewUser({
      username: "",
      name: "",
      role: "user",
      departments: [],
      password: "",
    })
    setError("")
  }

  const handleAddDepartment = () => {
    if (!newDepartment.name || !newDepartment.code) {
      setError("Please fill in all required fields")
      return
    }

    const departmentData = {
      id: Date.now().toString(),
      name: newDepartment.name,
      code: newDepartment.code,
      description: newDepartment.description,
      memberCount: 0,
      createdAt: new Date().toISOString(),
    }

    setDepartments([...departments, departmentData])
    setShowAddDepartmentDialog(false)
    setNewDepartment({
      name: "",
      code: "",
      description: "",
    })
    setError("")
  }

  const handleAddEquipment = () => {
    if (!newEquipment.name || !newEquipment.type || !newEquipment.location) {
      setError("Please fill in all required fields")
      return
    }

    const equipmentData = {
      id: Date.now().toString(),
      name: newEquipment.name,
      type: newEquipment.type,
      status: newEquipment.status,
      location: newEquipment.location,
      assignedTo: newEquipment.assignedTo || null,
      lastMaintenance: new Date().toISOString().split("T")[0],
    }

    setEquipment([...equipment, equipmentData])
    setShowAddEquipmentDialog(false)
    setNewEquipment({
      name: "",
      type: "",
      status: "operational",
      location: "",
      assignedTo: "",
    })
    setError("")
  }

  const handleAddDriver = () => {
    if (!newDriver.name || !newDriver.licenseNumber || !newDriver.contactNumber) {
      setError("Please fill in all required fields")
      return
    }

    const driverData = {
      id: Date.now().toString(),
      name: newDriver.name,
      licenseNumber: newDriver.licenseNumber,
      licenseType: newDriver.licenseType,
      status: newDriver.status,
      currentLocation: newDriver.currentLocation || "Office",
      contactNumber: newDriver.contactNumber,
    }

    setDrivers([...drivers, driverData])
    setShowAddDriverDialog(false)
    setNewDriver({
      name: "",
      licenseNumber: "",
      licenseType: "Commercial",
      status: "available",
      currentLocation: "",
      contactNumber: "",
    })
    setError("")
  }

  const handleUpdateUserStatus = (id: string, newStatus: string) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, status: newStatus } : user)))
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleDeleteDepartment = (id: string) => {
    setDepartments(departments.filter((dept) => dept.id !== id))
  }

  const handleDeleteEquipment = (id: string) => {
    setEquipment(equipment.filter((equip) => equip.id !== id))
  }

  const handleDeleteDriver = (id: string) => {
    setDrivers(drivers.filter((driver) => driver.id !== id))
  }

  const handleApproval = (id: string, approved: boolean) => {
    setApprovals(
      approvals.map((approval) =>
        approval.id === id ? { ...approval, status: approved ? "approved" : "rejected" } : approval,
      ),
    )
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader
          title="Admin Dashboard"
          user={user}
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
        />

        <main className="container p-4 pt-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="users" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="drivers">Drivers</TabsTrigger>
              <TabsTrigger value="approvals">Approvals</TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">User Management</CardTitle>
                    <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
                      <DialogTrigger asChild>
                        <Button>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Add User
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New User</DialogTitle>
                          <DialogDescription>
                            Create a new user account with the required information.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="username">Username (Email)</Label>
                            <Input
                              id="username"
                              placeholder="employee@organization.com"
                              value={newUser.username}
                              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              placeholder="John Doe"
                              value={newUser.name}
                              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="••••••"
                              value={newUser.password}
                              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            />
                            <p className="text-xs text-muted-foreground">Must be 6-16 characters</p>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="role">Role</Label>
                            <Select
                              value={newUser.role}
                              onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                            >
                              <SelectTrigger id="role">
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label>Departments</Label>
                            <ScrollArea className="h-32 rounded-md border">
                              <div className="p-4 space-y-2">
                                {departments.map((dept) => (
                                  <div key={dept.id} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`dept-${dept.id}`}
                                      checked={newUser.departments.includes(dept.code)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setNewUser({
                                            ...newUser,
                                            departments: [...newUser.departments, dept.code],
                                          })
                                        } else {
                                          setNewUser({
                                            ...newUser,
                                            departments: newUser.departments.filter((d) => d !== dept.code),
                                          })
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor={`dept-${dept.id}`}
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      {dept.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddUser}>Create User</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Username</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Departments</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Login</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>
                              <Badge variant={user.role === "admin" ? "destructive" : "outline"}>{user.role}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {user.departments.map((dept) => (
                                  <Badge key={dept} variant="secondary" className="text-xs">
                                    {dept}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={user.status === "active" ? "success" : "destructive"}
                                className="flex w-fit items-center gap-1"
                              >
                                {user.status === "active" ? (
                                  <CheckCircle className="h-3 w-3" />
                                ) : (
                                  <AlertCircle className="h-3 w-3" />
                                )}
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {formatDate(user.lastLogin)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handleUpdateUserStatus(user.id, user.status === "active" ? "inactive" : "active")
                                  }
                                >
                                  <Edit className="h-4 w-4 text-muted-foreground" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredUsers.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              No users found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Departments Tab */}
            <TabsContent value="departments" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Department Management</CardTitle>
                    <Dialog open={showAddDepartmentDialog} onOpenChange={setShowAddDepartmentDialog}>
                      <DialogTrigger asChild>
                        <Button>
                          <Building className="mr-2 h-4 w-4" />
                          Add Department
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Department</DialogTitle>
                          <DialogDescription>Create a new department with the required information.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="dept-name">Department Name</Label>
                            <Input
                              id="dept-name"
                              placeholder="Human Resources"
                              value={newDepartment.name}
                              onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="dept-code">Department Code</Label>
                            <Input
                              id="dept-code"
                              placeholder="HR"
                              value={newDepartment.code}
                              onChange={(e) => setNewDepartment({ ...newDepartment, code: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="dept-desc">Description</Label>
                            <Input
                              id="dept-desc"
                              placeholder="Manages employee relations and recruitment"
                              value={newDepartment.description}
                              onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowAddDepartmentDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddDepartment}>Create Department</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <CardDescription>Manage departments, assign users, and control access</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Code</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Members</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDepartments.map((dept) => (
                          <TableRow key={dept.id}>
                            <TableCell className="font-medium">{dept.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{dept.code}</Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{dept.description}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{dept.memberCount}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {formatDate(dept.createdAt)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4 text-muted-foreground" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteDepartment(dept.id)}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredDepartments.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                              No departments found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Equipment Tab */}
            <TabsContent value="equipment" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Equipment Management</CardTitle>
                    <Dialog open={showAddEquipmentDialog} onOpenChange={setShowAddEquipmentDialog}>
                      <DialogTrigger asChild>
                        <Button>
                          <Truck className="mr-2 h-4 w-4" />
                          Add Equipment
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Equipment</DialogTitle>
                          <DialogDescription>Register new equipment with the required information.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="equip-name">Equipment Name</Label>
                            <Input
                              id="equip-name"
                              placeholder="Excavator XL3000"
                              value={newEquipment.name}
                              onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="equip-type">Type</Label>
                            <Select
                              value={newEquipment.type}
                              onValueChange={(value) => setNewEquipment({ ...newEquipment, type: value })}
                            >
                              <SelectTrigger id="equip-type">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Heavy Machinery">Heavy Machinery</SelectItem>
                                <SelectItem value="Vehicle">Vehicle</SelectItem>
                                <SelectItem value="Warehouse Equipment">Warehouse Equipment</SelectItem>
                                <SelectItem value="Office Equipment">Office Equipment</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="equip-status">Status</Label>
                            <Select
                              value={newEquipment.status}
                              onValueChange={(value) => setNewEquipment({ ...newEquipment, status: value })}
                            >
                              <SelectTrigger id="equip-status">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="operational">Operational</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                <SelectItem value="non-operational">Non-operational</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="equip-location">Location</Label>
                            <Input
                              id="equip-location"
                              placeholder="Site A"
                              value={newEquipment.location}
                              onChange={(e) => setNewEquipment({ ...newEquipment, location: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="equip-assigned">Assigned To (Optional)</Label>
                            <Select
                              value={newEquipment.assignedTo}
                              onValueChange={(value) => setNewEquipment({ ...newEquipment, assignedTo: value })}
                            >
                              <SelectTrigger id="equip-assigned">
                                <SelectValue placeholder="Select user" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="unassigned">Unassigned</SelectItem>
                                {users
                                  .filter((u) => u.status === "active")
                                  .map((user) => (
                                    <SelectItem key={user.id} value={user.name}>
                                      {user.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowAddEquipmentDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddEquipment}>Add Equipment</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <CardDescription>Manage equipment inventory, maintenance, and assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Assigned To</TableHead>
                          <TableHead>Last Maintenance</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredEquipment.map((equip) => (
                          <TableRow key={equip.id}>
                            <TableCell className="font-medium">{equip.name}</TableCell>
                            <TableCell>{equip.type}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  equip.status === "operational"
                                    ? "success"
                                    : equip.status === "maintenance"
                                      ? "warning"
                                      : "destructive"
                                }
                              >
                                {equip.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{equip.location}</TableCell>
                            <TableCell>
                              {equip.assignedTo || <span className="text-muted-foreground">Unassigned</span>}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">{equip.lastMaintenance}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4 text-muted-foreground" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteEquipment(equip.id)}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredEquipment.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              No equipment found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Drivers Tab */}
            <TabsContent value="drivers" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Driver Management</CardTitle>
                    <Dialog open={showAddDriverDialog} onOpenChange={setShowAddDriverDialog}>
                      <DialogTrigger asChild>
                        <Button>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Add Driver
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Driver</DialogTitle>
                          <DialogDescription>Register a new driver with the required information.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="driver-name">Full Name</Label>
                            <Input
                              id="driver-name"
                              placeholder="John Doe"
                              value={newDriver.name}
                              onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="driver-license">License Number</Label>
                            <Input
                              id="driver-license"
                              placeholder="DL-12345"
                              value={newDriver.licenseNumber}
                              onChange={(e) => setNewDriver({ ...newDriver, licenseNumber: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="driver-license-type">License Type</Label>
                            <Select
                              value={newDriver.licenseType}
                              onValueChange={(value) => setNewDriver({ ...newDriver, licenseType: value })}
                            >
                              <SelectTrigger id="driver-license-type">
                                <SelectValue placeholder="Select license type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Commercial">Commercial</SelectItem>
                                <SelectItem value="Non-Commercial">Non-Commercial</SelectItem>
                                <SelectItem value="Special">Special</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="driver-status">Status</Label>
                            <Select
                              value={newDriver.status}
                              onValueChange={(value) => setNewDriver({ ...newDriver, status: value })}
                            >
                              <SelectTrigger id="driver-status">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="on-duty">On Duty</SelectItem>
                                <SelectItem value="off-duty">Off Duty</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="driver-location">Current Location</Label>
                            <Input
                              id="driver-location"
                              placeholder="Office"
                              value={newDriver.currentLocation}
                              onChange={(e) => setNewDriver({ ...newDriver, currentLocation: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="driver-contact">Contact Number</Label>
                            <Input
                              id="driver-contact"
                              placeholder="555-1234"
                              value={newDriver.contactNumber}
                              onChange={(e) => setNewDriver({ ...newDriver, contactNumber: e.target.value })}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowAddDriverDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddDriver}>Add Driver</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <CardDescription>Manage drivers, licenses, and assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>License</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDrivers.map((driver) => (
                          <TableRow key={driver.id}>
                            <TableCell className="font-medium">{driver.name}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{driver.licenseNumber}</span>
                                <span className="text-xs text-muted-foreground">{driver.licenseType}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  driver.status === "available"
                                    ? "success"
                                    : driver.status === "on-duty"
                                      ? "warning"
                                      : "outline"
                                }
                              >
                                {driver.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{driver.currentLocation}</TableCell>
                            <TableCell>{driver.contactNumber}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4 text-muted-foreground" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteDriver(driver.id)}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredDrivers.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                              No drivers found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Approvals Tab */}
            <TabsContent value="approvals" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">Approval Requests</CardTitle>
                  <CardDescription>
                    Review and approve requests for changes to equipment, drivers, and other resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Requested By</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {approvals.map((approval) => (
                          <TableRow key={approval.id}>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {approval.type.replace(/_/g, " ")}
                              </Badge>
                            </TableCell>
                            <TableCell>{approval.requestedBy}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {formatDate(approval.requestedAt)}
                            </TableCell>
                            <TableCell>
                              <div className="max-w-xs text-sm">
                                {approval.type === "location_update" && (
                                  <span>
                                    Move {approval.details.equipment} from {approval.details.oldLocation} to{" "}
                                    {approval.details.newLocation}
                                  </span>
                                )}
                                {approval.type === "driver_assignment" && (
                                  <span>
                                    Assign {approval.details.driver} to {approval.details.equipment}
                                  </span>
                                )}
                                {approval.type === "maintenance_request" && (
                                  <span>
                                    Maintenance for {approval.details.equipment}: {approval.details.reason}
                                  </span>
                                )}
                                {approval.type === "new_equipment" && (
                                  <span>
                                    New {approval.details.equipmentType} ({approval.details.model})
                                  </span>
                                )}
                                {approval.type === "driver_leave" && (
                                  <span>
                                    Leave from {approval.details.startDate} to {approval.details.endDate}
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  approval.status === "approved"
                                    ? "success"
                                    : approval.status === "rejected"
                                      ? "destructive"
                                      : "warning"
                                }
                              >
                                {approval.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {approval.status === "pending" ? (
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
                                    onClick={() => handleApproval(approval.id, true)}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 border-destructive text-destructive hover:bg-red-50"
                                    onClick={() => handleApproval(approval.id, false)}
                                  >
                                    Reject
                                  </Button>
                                </div>
                              ) : (
                                <span className="text-sm text-muted-foreground">No actions available</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                        {approvals.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                              No approval requests found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

