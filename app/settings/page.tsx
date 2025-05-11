"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Settings as SettingsIcon,
  Building2,
  LayoutGrid,
  Palette,
  Users,
  ShieldCheck,
  Bell,
  Plug,
  Save,
  Mail,
  Image as ImageIcon,
  Globe,
  Filter,
  Download,
  ChevronDown
} from "lucide-react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination"
import { SearchInput } from "@/components/search-input"

const settingsTabs = [
  { label: "General", value: "general", icon: <SettingsIcon className="mr-2 h-5 w-5" /> },
  { label: "Organization Profile", value: "organization", icon: <Building2 className="mr-2 h-5 w-5" /> },
  { label: "Modules & Features", value: "modules", icon: <LayoutGrid className="mr-2 h-5 w-5" /> },
  { label: "Appearance", value: "appearance", icon: <Palette className="mr-2 h-5 w-5" /> },
  { label: "Users & Permissions", value: "users", icon: <Users className="mr-2 h-5 w-5" /> },
  { label: "Security", value: "security", icon: <ShieldCheck className="mr-2 h-5 w-5" /> },
  { label: "Notifications", value: "notifications", icon: <Bell className="mr-2 h-5 w-5" /> },
  { label: "Integrations", value: "integrations", icon: <Plug className="mr-2 h-5 w-5" /> },
]

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [maintenanceMode, setMaintenanceMode] = useState(true)
  const [systemName, setSystemName] = useState("BluMax")
  const [timeZone, setTimeZone] = useState("india")
  const [dateFormat, setDateFormat] = useState("ddmmyyyy")
  const [language, setLanguage] = useState("india")
  const [activeTab, setActiveTab] = useState("general")

  // Organization Profile fields
  const [orgName, setOrgName] = useState("City Hospital")
  const [orgType, setOrgType] = useState("Hospital")
  const [orgLogo, setOrgLogo] = useState(null)
  const [orgAddress, setOrgAddress] = useState("")
  const [orgEmail, setOrgEmail] = useState("usmanndako@gmail.com")
  const [orgPhoneCountry, setOrgPhoneCountry] = useState("+91")
  const [orgPhone, setOrgPhone] = useState("08065650633")

  // Modules & Features toggles
  const [modules, setModules] = useState<Record<string, boolean>>({
    patient: true,
    appointments: true,
    inpatient: true,
    ehr: true,
    billing: true,
    inventory: true,
    hr: true,
    compliance: true,
    reports: true,
  })

  const [showUserForm, setShowUserForm] = useState(false)
  const [editUser, setEditUser] = useState<null | { name: string; department: string; role: string; userId: string; phone: string; status: string }>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [userToDelete, setUserToDelete] = useState<null | { name: string; department: string; role: string; userId: string; phone: string; status: string }>(null)

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  // Tab content renderers
  function renderTabContent() {
    switch (activeTab) {
      case "general":
        return (
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic system settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-name">System Name</Label>
                <Input id="system-name" value={systemName} onChange={e => setSystemName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Default Time Zone</Label>
                <Select value={timeZone} onValueChange={setTimeZone}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="india">India (GMT +5:30)</SelectItem>
                    <SelectItem value="us">US (GMT -5:00)</SelectItem>
                    <SelectItem value="uk">UK (GMT +0:00)</SelectItem>
                    <SelectItem value="aus">Australia (GMT +10:00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select value={dateFormat} onValueChange={setDateFormat}>
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ddmmyyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mmddyyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="yyyymmdd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Default Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="india">India (GMT +5:30)</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <div className="text-sm text-gray-500">Temporarily disable access to all users except administrators</div>
                </div>
                <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>
            </CardContent>
          </Card>
        )
      case "organization":
        return (
          <Card className="max-w-3xl">
            <CardHeader>
              <CardTitle>Organization Profile</CardTitle>
              <CardDescription>Manage your organization's details and branding.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" value={orgName} onChange={e => setOrgName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-type">Organization Type</Label>
                <Select value={orgType} onValueChange={setOrgType}>
                  <SelectTrigger id="org-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hospital">Hospital</SelectItem>
                    <SelectItem value="Clinic">Clinic</SelectItem>
                    <SelectItem value="Lab">Lab</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Organization Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded border bg-gray-50">
                    <Building2 className="h-8 w-8 text-gray-400" />
                  </div>
                  <Button variant="outline" type="button">
                    <ImageIcon className="mr-2 h-5 w-5" /> Upload Logo
                  </Button>
                </div>
                <div className="text-xs text-gray-500 mt-1">Recommended size: 400x400px. Max 2MB. PNG or JPG format</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-address">Address</Label>
                <Input id="org-address" value={orgAddress} onChange={e => setOrgAddress(e.target.value)} placeholder="Address" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label>Email</Label>
                  <div className="flex items-center bg-gray-100 rounded px-3 py-2">
                    <Mail className="mr-2 h-5 w-5 text-gray-400" />
                    <span>{orgEmail}</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <Label>Phone Number</Label>
                  <div className="flex items-center bg-gray-100 rounded px-3 py-2">
                    <Globe className="mr-2 h-5 w-5 text-gray-400" />
                    <Select value={orgPhoneCountry} onValueChange={setOrgPhoneCountry}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+91">🇮🇳 +91</SelectItem>
                        <SelectItem value="+1">🇺🇸 +1</SelectItem>
                        <SelectItem value="+44">🇬🇧 +44</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input className="ml-2" value={orgPhone} onChange={e => setOrgPhone(e.target.value)} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case "modules":
        return (
          <Card className="max-w-3xl">
            <CardHeader>
              <CardTitle>Modules & Features</CardTitle>
              <CardDescription>Enable or disable system modules based on your subscription.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { key: "patient", label: "Patient Management", desc: "Manage patient profiles, demographics, and medical history" },
                { key: "appointments", label: "Appointments (OPD)", desc: "Schedule and manage outpatient appointments" },
                { key: "inpatient", label: "Inpatient Management (IPD)", desc: "Manage admitted patients, bed allocation, and discharge" },
                { key: "ehr", label: "Electronic Health Records", desc: "Electronic health records, clinical notes, and medical documentation" },
                { key: "billing", label: "Billing & Payments", desc: "Invoice generation, payments, and insurance claims" },
                { key: "inventory", label: "Inventory & Pharmacy", desc: "Track medicines, supplies, and manage pharmacy operations" },
                { key: "hr", label: "HR & Staff Management", desc: "Manage staff records, scheduling, and payroll" },
                { key: "compliance", label: "Compliance & Audit", desc: "System auditing, compliance tracking, and security logs", badge: "Required" },
                { key: "reports", label: "Reports & Analytics", desc: "Generate reports and analyze healthcare data" },
              ].map((mod) => (
                <div key={mod.key} className="flex items-center border-b last:border-b-0 py-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">{mod.label}</span>
                      {mod.badge && <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded">{mod.badge}</span>}
                    </div>
                    <div className="text-gray-500 text-sm">{mod.desc}</div>
                  </div>
                  <Switch checked={modules[mod.key]} onCheckedChange={v => setModules(m => ({ ...m, [mod.key]: v }))} />
                </div>
              ))}
            </CardContent>
          </Card>
        )
      case "appearance":
        return (
          <Card className="max-w-3xl">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your BluMax System.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Organization Name</Label>
                <Input value={orgName} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-[#6E59A5] border-2 border-white" />
                  <Input value="#6E59A5" readOnly className="w-32" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex gap-4">
                  <div className="flex-1 border rounded-lg p-4 flex flex-col items-center cursor-pointer">
                    <div className="w-full h-8 bg-gray-100 rounded mb-2" />
                    Light
                  </div>
                  <div className="flex-1 border-2 border-black rounded-lg p-4 flex flex-col items-center cursor-pointer">
                    <div className="w-full h-8 bg-gray-800 rounded mb-2" />
                    Dark
                  </div>
                  <div className="flex-1 border rounded-lg p-4 flex flex-col items-center cursor-pointer">
                    <div className="w-full h-8 bg-gradient-to-r from-gray-100 to-gray-800 rounded mb-2" />
                    System
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Dashboard Layout</Label>
                <Select value="cards">
                  <SelectTrigger>
                    <SelectValue placeholder="Cards Layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cards">Cards Layout</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Animations</Label>
                  <div className="text-sm text-gray-500">Enable UI animations and transitions</div>
                </div>
                <Switch checked={true} />
              </div>
            </CardContent>
          </Card>
        )
      case "users":
        // Mock data for users
        const users = [
          { name: "Janet Adebayo", department: "Cardiology", role: "Doctor", userId: "GM021210", phone: "958452354", status: "Active" },
          { name: "Janet Adebayo", department: "Cardiology", role: "Nurse", userId: "GM021210", phone: "958452354", status: "Active" },
          { name: "Janet Adebayo", department: "Cardiology", role: "Nurse", userId: "GM021210", phone: "958452354", status: "In-Active" },
          { name: "Janet Adebayo", department: "Cardiology", role: "Admin", userId: "GM021210", phone: "958452354", status: "Active" },
          { name: "Janet Adebayo", department: "Cardiology", role: "Lab", userId: "GM021210", phone: "958452354", status: "Active" },
          { name: "Janet Adebayo", department: "Cardiology", role: "Staff", userId: "GM021210", phone: "958452354", status: "In-Active" },
        ]
        return (
          <Card className="max-w-5xl">
            <CardHeader>
              <CardTitle>Users & Permissions</CardTitle>
              <CardDescription>Manage user roles and access permissions.</CardDescription>
            </CardHeader>
            <CardContent>
              {showUserForm ? (
                <div className="mb-8 rounded-lg border p-6 bg-gray-50">
                  <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label>First Name</Label>
                      <Input value={editUser?.name || ""} readOnly />
                    </div>
                    <div>
                      <Label>ID Proof</Label>
                      <Select value={"Male"}>
                        <SelectTrigger><SelectValue placeholder="Male" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Registration Date</Label>
                      <Input value="12/12/2020" readOnly />
                    </div>
                    <div>
                      <Label>Number</Label>
                      <Select value="Single">
                        <SelectTrigger><SelectValue placeholder="Single" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Single">Single</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input value={"usmanndako@gmail.com"} readOnly />
                    </div>
                    <div>
                      <Label>Department</Label>
                      <Select value={editUser?.department || "Cardiology"}>
                        <SelectTrigger><SelectValue placeholder="Cardiology" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cardiology">Cardiology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Input value={editUser?.phone || "+91 08065650633"} readOnly />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Select value={editUser?.role || "Doctor"}>
                        <SelectTrigger><SelectValue placeholder="Doctor" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Doctor">Doctor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Gender</Label>
                      <Select value="Male">
                        <SelectTrigger><SelectValue placeholder="Male" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Permissions</Label>
                      <Select value="Read/Write">
                        <SelectTrigger><SelectValue placeholder="Read/Write" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Read/Write">Read/Write</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Marital Status</Label>
                      <Select value="Single">
                        <SelectTrigger><SelectValue placeholder="Single" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Single">Single</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Username</Label>
                      <Input value="Valid" readOnly />
                    </div>
                    <div>
                      <Label>City</Label>
                      <Input value="Yaba" readOnly />
                    </div>
                    <div>
                      <Label>Password</Label>
                      <Input value="" type="password" readOnly />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Address</Label>
                      <Input value="No. 93 Skyfield Apartments" readOnly />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => { setShowUserForm(false); setEditUser(null); }}>Cancel</Button>
                    {editUser ? (
                      <>
                        <Button variant="destructive">Delete</Button>
                        <Button className="bg-[#1e40af] text-white">Update</Button>
                      </>
                    ) : (
                      <Button className="bg-[#1e40af] text-white">Create New User</Button>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  {/* Table actions */}
                  <div className="flex flex-wrap gap-2 items-center mb-4">
                    <SearchInput className="w-64" placeholder="Search" />
                    <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" />Filter</Button>
                    <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Download</Button>
                  </div>
                  <div className="flex justify-end mb-4">
                    <Button onClick={() => { setEditUser(null); setShowUserForm(true); }} className="bg-[#1e40af] text-white">
                      + Add User
                    </Button>
                  </div>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead><input type="checkbox" /></TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>User ID</TableHead>
                          <TableHead>Phone No</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user, idx) => (
                          <TableRow key={idx}>
                            <TableCell><input type="checkbox" /></TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.department}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.userId}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm" className="flex items-center gap-1">Actions <ChevronDown className="h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={() => { setEditUser(user); setShowUserForm(true); }}>Edit</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => { setUserToDelete(user); setShowDeleteDialog(true); }}>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                            <TableCell>
                              <Badge className={user.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                {user.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-500">10 items per page &nbsp; 1-10 of 200 items</div>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                        <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationEllipsis /></PaginationItem>
                        <PaginationItem><PaginationLink href="#">44</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationNext href="#" /></PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )
      case "security":
        return (
          <Card className="max-w-3xl">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security options and authentication settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Two-Factor Authentication (2FA)</Label>
                  <div className="text-sm text-gray-500">Require 2FA for all administrator accounts</div>
                </div>
                <Switch checked={true} />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Force Password Reset</Label>
                  <div className="text-sm text-gray-500">Require password changes every 90 days</div>
                </div>
                <Switch checked={true} />
              </div>
              <div className="space-y-2">
                <Label>Password Policy</Label>
                <Select value="strong">
                  <SelectTrigger>
                    <SelectValue placeholder="Strong (10+ with numbers and symbols)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strong">Strong (10+ with numbers and symbols)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Session Timeout</Label>
                <Select value="30">
                  <SelectTrigger>
                    <SelectValue placeholder="30 minutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )
      case "notifications":
        return (
          <Card className="max-w-3xl">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure system notifications and alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Email Notifications", desc: "Send system alerts via email" },
                { label: "SMS Notifications", desc: "Send appointment reminders via SMS" },
                { label: "In-App Notifications", desc: "Show notifications within the application" },
                { label: "Critical Alerts", desc: "Send high-priority alerts for urgent matters" },
              ].map((item, idx) => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <div>
                    <span className="font-semibold">{item.label}</span>
                    <div className="text-gray-500 text-sm">{item.desc}</div>
                  </div>
                  <Switch checked={true} />
                </div>
              ))}
            </CardContent>
          </Card>
        )
      case "integrations":
        return (
          <Card className="max-w-3xl flex flex-col items-center justify-center min-h-[300px]">
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect your system with external services.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <Globe className="h-16 w-16 text-gray-300 mb-4" />
              <div className="font-semibold text-lg mb-1">External Integrations</div>
              <div className="text-gray-500 text-center max-w-md">External API integrations will be available soon. Connect with diagnostic labs, insurance providers, and government health systems.</div>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="flex gap-8 items-start">
        {/* Vertical Tab Menu */}
        <div className="w-64 min-w-[200px] bg-white rounded-lg border p-4 flex flex-col gap-1 shadow-sm">
          {settingsTabs.map(tab => (
            <button
              key={tab.value}
              className={`flex items-center text-left px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab.value
                  ? 'bg-[#f4f4f5] text-[#222] font-semibold' // active style
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        {/* Main Content Area */}
        <div className="flex-1 relative">
          {/* Save Changes Button at Top Right */}
          <div className="flex justify-end mb-4">
            <Button onClick={handleSave} disabled={loading} className="bg-[#7c3aed] hover:bg-[#5a67f6]">
              <Save className="mr-2 h-5 w-5" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
          {renderTabContent()}
        </div>
      </div>
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg p-8 w-full max-w-md text-center">
            <h3 className="text-lg font-bold mb-4">Delete User?</h3>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-center gap-4 mt-6">
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
              <Button variant="destructive" onClick={() => {
                // Remove user from your users array here
                setShowDeleteDialog(false);
              }}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
