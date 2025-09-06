"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MapPin, Search, Settings, User, Wrench } from "lucide-react"

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
    nextMaintenance: "2023-05-15",
  },
  {
    id: "2",
    name: "Bulldozer B500",
    type: "Heavy Machinery",
    status: "maintenance",
    location: "Maintenance Bay",
    assignedTo: null,
    lastMaintenance: "2023-03-10",
    nextMaintenance: "2023-06-10",
  },
  {
    id: "3",
    name: "Delivery Truck DT-103",
    type: "Vehicle",
    status: "operational",
    location: "Site B",
    assignedTo: "Robert Johnson",
    lastMaintenance: "2023-01-20",
    nextMaintenance: "2023-04-20",
  },
  {
    id: "4",
    name: "Forklift F-22",
    type: "Warehouse Equipment",
    status: "operational",
    location: "Warehouse",
    assignedTo: "Jane Smith",
    lastMaintenance: "2023-02-28",
    nextMaintenance: "2023-05-28",
  },
  {
    id: "5",
    name: "Crane C-1000",
    type: "Heavy Machinery",
    status: "non-operational",
    location: "Repair Shop",
    assignedTo: null,
    lastMaintenance: "2023-03-05",
    nextMaintenance: "2023-06-05",
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

export default function EquipmentPage() {
  const { user } = useAuth()
  const [equipment, setEquipment] = useState(MOCK_EQUIPMENT)
  const [drivers, setDrivers] = useState(MOCK_DRIVERS)
  const [searchQuery, setSearchQuery] = useState("")
  const [showRequestDialog, setShowRequestDialog] = useState(false)
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null)

  // Request form state
  const [request, setRequest] = useState({
    equipmentId: "",
    newLocation: "",
    reason: "",
  })

  // Maintenance form state
  const [maintenance, setMaintenance] = useState({
    equipmentId: "",
    issueDescription: "",
    priority: "medium",
  })

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

  const handleRequestSubmit = () => {
    // In a real app, this would send the request to the backend
    alert(`Location update request submitted for ${selectedEquipment?.name}`)
    setShowRequestDialog(false)
    setRequest({
      equipmentId: "",
      newLocation: "",
      reason: "",
    })
  }

  const handleMaintenanceSubmit = () => {
    // In a real app, this would send the maintenance request to the backend
    alert(`Maintenance request submitted for ${selectedEquipment?.name}`)
    setShowMaintenanceDialog(false)
    setMaintenance({
      equipmentId: "",
      issueDescription: "",
      priority: "medium",
    })
  }

  return (
    <div className="container space-y-6 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Equipment & Drivers</h1>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="equipment" className="space-y-4">
        <TabsList>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
        </TabsList>

        <TabsContent value="equipment" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Equipment Inventory</CardTitle>
              <CardDescription>View and manage equipment status and location</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Maintenance</TableHead>
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
                          className="capitalize"
                        >
                          {equip.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                          {equip.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        {equip.assignedTo ? (
                          <div className="flex items-center">
                            <User className="mr-1 h-3 w-3 text-muted-foreground" />
                            {equip.assignedTo}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-xs">
                          <div>Last: {equip.lastMaintenance}</div>
                          <div>Next: {equip.nextMaintenance}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedEquipment(equip)
                              setRequest({
                                ...request,
                                equipmentId: equip.id,
                              })
                              setShowRequestDialog(true)
                            }}
                          >
                            <MapPin className="mr-1 h-3 w-3" />
                            Update Location
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedEquipment(equip)
                              setMaintenance({
                                ...maintenance,
                                equipmentId: equip.id,
                              })
                              setShowMaintenanceDialog(true)
                            }}
                          >
                            <Wrench className="mr-1 h-3 w-3" />
                            Maintenance
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Driver Management</CardTitle>
              <CardDescription>View and manage driver status and assignments</CardDescription>
            </CardHeader>
            <CardContent>
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
                          className="capitalize"
                        >
                          {driver.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                          {driver.currentLocation}
                        </div>
                      </TableCell>
                      <TableCell>{driver.contactNumber}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Settings className="mr-1 h-3 w-3" />
                          Manage
                        </Button>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Location Update Request Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Equipment Location</DialogTitle>
            <DialogDescription>Submit a request to update the location of {selectedEquipment?.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="current-location">Current Location</Label>
              <Input id="current-location" value={selectedEquipment?.location || ""} disabled />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-location">New Location</Label>
              <Input
                id="new-location"
                placeholder="Enter new location"
                value={request.newLocation}
                onChange={(e) => setRequest({ ...request, newLocation: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Update</Label>
              <Input
                id="reason"
                placeholder="Explain why the location needs to be updated"
                value={request.reason}
                onChange={(e) => setRequest({ ...request, reason: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleRequestSubmit}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Maintenance Request Dialog */}
      <Dialog open={showMaintenanceDialog} onOpenChange={setShowMaintenanceDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Maintenance</DialogTitle>
            <DialogDescription>Submit a maintenance request for {selectedEquipment?.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="issue-description">Issue Description</Label>
              <Input
                id="issue-description"
                placeholder="Describe the issue that needs maintenance"
                value={maintenance.issueDescription}
                onChange={(e) => setMaintenance({ ...maintenance, issueDescription: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={maintenance.priority}
                onValueChange={(value) => setMaintenance({ ...maintenance, priority: value })}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMaintenanceDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleMaintenanceSubmit}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

