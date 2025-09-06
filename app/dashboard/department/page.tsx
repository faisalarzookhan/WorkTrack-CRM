"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Users, Code, Settings } from "lucide-react"

// Mock department data
const DEPARTMENTS = {
  HR: {
    name: "Human Resources",
    icon: Users,
    description: "Manage employee records, recruitment, and HR policies",
    documents: [
      { id: "1", name: "Employee Handbook", type: "PDF" },
      { id: "2", name: "Onboarding Checklist", type: "DOCX" },
      { id: "3", name: "Leave Policy", type: "PDF" },
    ],
    members: 12,
  },
  IT: {
    name: "Information Technology",
    icon: Code,
    description: "Manage IT infrastructure, software development, and technical support",
    documents: [
      { id: "1", name: "IT Security Policy", type: "PDF" },
      { id: "2", name: "Software Request Form", type: "DOCX" },
      { id: "3", name: "Network Diagram", type: "PNG" },
    ],
    members: 8,
  },
  Administrator: {
    name: "Administration",
    icon: Settings,
    description: "Manage administrative tasks, facilities, and general operations",
    documents: [
      { id: "1", name: "Office Policies", type: "PDF" },
      { id: "2", name: "Vendor Contracts", type: "PDF" },
      { id: "3", name: "Facility Maintenance Schedule", type: "XLSX" },
    ],
    members: 5,
  },
}

export default function DepartmentPage() {
  const { user } = useAuth()
  const userDepartments = user?.departments || []

  // If user has access to "All" departments, show all departments
  const departments = userDepartments.includes("All") ? Object.keys(DEPARTMENTS) : userDepartments

  if (departments.length === 0) {
    return (
      <div className="container p-4 pt-6">
        <h1 className="text-2xl font-bold">Departments</h1>
        <p className="mt-4 text-muted-foreground">You are not assigned to any departments.</p>
      </div>
    )
  }

  return (
    <div className="container space-y-6 p-4 pt-6">
      <h1 className="text-2xl font-bold">Departments</h1>

      <Tabs defaultValue={departments[0]}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
          {departments.map((dept) => (
            <TabsTrigger key={dept} value={dept}>
              {DEPARTMENTS[dept as keyof typeof DEPARTMENTS]?.name || dept}
            </TabsTrigger>
          ))}
        </TabsList>

        {departments.map((dept) => {
          const department = DEPARTMENTS[dept as keyof typeof DEPARTMENTS]
          if (!department) return null

          return (
            <TabsContent key={dept} value={dept} className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <department.icon className="h-5 w-5 text-primary" />
                    <CardTitle>{department.name}</CardTitle>
                  </div>
                  <CardDescription>{department.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{department.members} members</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{department.documents.length} documents</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Department Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {department.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between rounded-md border p-2">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span>{doc.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{doc.type}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

