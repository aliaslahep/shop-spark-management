
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
import { Search, Users, Plus, Filter, Download, Phone, Mail, Edit, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for customers
const customers = [
  { 
    id: "C001", 
    name: "John Doe", 
    phone: "9876543210", 
    email: "johndoe@example.com",
    totalPurchases: 12,
    totalSpent: 15250,
    joinDate: "Jan 15, 2025",
    lastPurchase: "Apr 20, 2025" 
  },
  { 
    id: "C002", 
    name: "Jane Smith", 
    phone: "9876543211", 
    email: "janesmith@example.com",
    totalPurchases: 8,
    totalSpent: 9800,
    joinDate: "Feb 3, 2025",
    lastPurchase: "Apr 22, 2025" 
  },
  { 
    id: "C003", 
    name: "Robert Johnson", 
    phone: "9876543212", 
    email: "robert@example.com",
    totalPurchases: 5,
    totalSpent: 6200,
    joinDate: "Feb 18, 2025",
    lastPurchase: "Apr 10, 2025" 
  },
  { 
    id: "C004", 
    name: "Emily Davis", 
    phone: "9876543213", 
    email: "emily@example.com",
    totalPurchases: 15,
    totalSpent: 18450,
    joinDate: "Jan 5, 2025",
    lastPurchase: "Apr 23, 2025" 
  },
  { 
    id: "C005", 
    name: "Michael Wilson", 
    phone: "9876543214", 
    email: "michael@example.com",
    totalPurchases: 3,
    totalSpent: 3800,
    joinDate: "Mar 12, 2025",
    lastPurchase: "Apr 15, 2025" 
  },
  { 
    id: "C006", 
    name: "Sarah Brown", 
    phone: "9876543215", 
    email: "sarah@example.com",
    totalPurchases: 7,
    totalSpent: 7950,
    joinDate: "Feb 8, 2025",
    lastPurchase: "Apr 21, 2025" 
  },
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Filter customers based on search term
  const filteredCustomers = searchTerm 
    ? customers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : customers;
  
  const handleAddCustomer = () => {
    toast({
      title: "Add Customer",
      description: "This would open a customer creation form in a complete implementation.",
    });
  };

  const handleViewCustomer = (customerId: string) => {
    toast({
      title: "View Customer",
      description: `Viewing details for customer ${customerId}`,
    });
  };
  
  const handleEditCustomer = (customerId: string) => {
    toast({
      title: "Edit Customer",
      description: `Editing customer ${customerId}`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Users className="mr-2 h-6 w-6" /> Customer Management
          </h1>
          <p className="text-muted-foreground">Manage your customers and their information</p>
        </div>
        
        <div>
          <Button onClick={handleAddCustomer} className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" /> Add New Customer
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
                placeholder="Search customers..."
                className="w-full pl-9 bg-muted/40 border-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => toast({ title: "Filter", description: "Filter dialog would appear here" })}>
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
              <Button variant="outline" size="sm" onClick={() => toast({ title: "Export", description: "Exporting customer data..." })}>
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
                <TableHead>Contact</TableHead>
                <TableHead>Total Purchases</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Purchase</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1" /> {customer.phone}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="h-3 w-3 mr-1" /> {customer.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.totalPurchases}</TableCell>
                  <TableCell>₹{customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>{customer.joinDate}</TableCell>
                  <TableCell>{customer.lastPurchase}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => handleViewCustomer(customer.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => handleEditCustomer(customer.id)}
                      >
                        <Edit className="h-4 w-4" />
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
