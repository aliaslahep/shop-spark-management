
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserCheck, Plus, Filter, Download, Mail, Phone, Edit, Eye, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for staff members
const staffMembers = [
  { 
    id: "S001", 
    name: "Raj Kumar", 
    role: "Admin",
    phone: "9876543210", 
    email: "raj@example.com",
    joinDate: "Jan 10, 2024",
    status: "Active"
  },
  { 
    id: "S002", 
    name: "Priya Singh", 
    role: "Cashier",
    phone: "9876543211", 
    email: "priya@example.com",
    joinDate: "Feb 15, 2024",
    status: "Active"
  },
  { 
    id: "S003", 
    name: "Vikram Sharma", 
    role: "Inventory Manager",
    phone: "9876543212", 
    email: "vikram@example.com",
    joinDate: "Jan 5, 2024",
    status: "Active"
  },
  { 
    id: "S004", 
    name: "Neha Patel", 
    role: "Cashier",
    phone: "9876543213", 
    email: "neha@example.com",
    joinDate: "Mar 20, 2024",
    status: "On Leave"
  },
  { 
    id: "S005", 
    name: "Arun Verma", 
    role: "Sales Executive",
    phone: "9876543214", 
    email: "arun@example.com",
    joinDate: "Apr 1, 2024",
    status: "Active"
  },
];

export default function Staff() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Filter staff based on search term
  const filteredStaff = searchTerm 
    ? staffMembers.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : staffMembers;
  
  const handleAddStaff = () => {
    toast({
      title: "Add Staff",
      description: "This would open a staff creation form in a complete implementation.",
    });
  };

  const handleViewStaff = (staffId: string) => {
    toast({
      title: "View Staff",
      description: `Viewing details for staff ${staffId}`,
    });
  };
  
  const handleEditStaff = (staffId: string) => {
    toast({
      title: "Edit Staff",
      description: `Editing staff ${staffId}`,
    });
  };
  
  const handleResetPassword = (staffId: string) => {
    toast({
      title: "Reset Password",
      description: `Password reset link has been sent to the staff member`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <UserCheck className="mr-2 h-6 w-6" /> Staff Management
          </h1>
          <p className="text-muted-foreground">Manage your staff members and their roles</p>
        </div>
        
        <div>
          <Button onClick={handleAddStaff} className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" /> Add New Staff
          </Button>
        </div>
      </div>
      
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search staff..."
                className="w-full pl-9 bg-muted/40 border-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => toast({ title: "Filter", description: "Filter dialog would appear here" })}>
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
              <Button variant="outline" size="sm" onClick={() => toast({ title: "Export", description: "Exporting staff data..." })}>
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium">{staff.id}</TableCell>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        staff.role === "Admin"
                          ? "bg-primary/10 text-primary dark:bg-primary/20"
                          : staff.role === "Cashier"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : staff.role === "Inventory Manager"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {staff.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1" /> {staff.phone}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="h-3 w-3 mr-1" /> {staff.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{staff.joinDate}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        staff.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : staff.status === "On Leave"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-destructive/10 text-destructive dark:bg-destructive/20"
                      }`}
                    >
                      {staff.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => handleViewStaff(staff.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => handleEditStaff(staff.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => handleResetPassword(staff.id)}
                      >
                        <Lock className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
