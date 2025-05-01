import { useState, useEffect } from "react";
import axios from "axios";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, Users, Plus, Filter, Download, Phone, Mail, Edit, Eye 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // or sessionStorage, depending on where you store it
  
    axios.get(`${import.meta.env.VITE_API_URL}/customer/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setCustomers(response.data.customers || []);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Failed to fetch customer list",
        });
        console.error("Error fetching customers:", error);
      });
  }, []);

  const filteredCustomers = searchTerm 
    ? customers.filter((customer: any) =>
        customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : customers;

  const handleAddCustomer = () => {
    navigate("/customers/add");
  };

  const handleViewCustomer = (customerId: string) => {
    navigate(`/customers/view/${customerId}`);
  };

  const handleEditCustomer = (customerId: string) => {
    navigate(`/customers/edit/${customerId}`);
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
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => toast({ title: "Filter", description: "Filter dialog would appear here" })}
              >
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => toast({ title: "Export", description: "Exporting customer data..." })}
              >
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
              {filteredCustomers.map((customer: any) => (
                <TableRow key={customer.id}>
                  <Link to={`/customers/view/${customer.id}`}>
                    <TableCell className="font-medium">C{String(customer.id).padStart(3, "0")}</TableCell>
                  </Link>
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
                  <TableCell>—</TableCell>
                  <TableCell>—</TableCell>
                  <TableCell>—</TableCell>
                  <TableCell>—</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link to={`/customers/view/${customer.id}`}>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0" 
                          href={`/customers/view/${customer.id}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
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
