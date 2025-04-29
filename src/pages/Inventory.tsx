
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
import { Package, Plus, Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock data for inventory items
const inventoryItems = [
  { 
    id: "P001", 
    name: "Wireless Earbuds", 
    sku: "WE-001", 
    category: "Electronics",
    price: 1299,
    inStock: 23,
    minStock: 10
  },
  { 
    id: "P002", 
    name: "USB-C Cable", 
    sku: "UC-002", 
    category: "Accessories",
    price: 499,
    inStock: 52,
    minStock: 15
  },
  { 
    id: "P003", 
    name: "Power Bank 10000mAh", 
    sku: "PB-003", 
    category: "Electronics",
    price: 1799,
    inStock: 11,
    minStock: 5
  },
  { 
    id: "P004", 
    name: "Bluetooth Speaker", 
    sku: "BS-004", 
    category: "Audio",
    price: 2499,
    inStock: 14,
    minStock: 8
  },
  { 
    id: "P005", 
    name: "Smartphone Case", 
    sku: "SC-005", 
    category: "Accessories",
    price: 599,
    inStock: 78,
    minStock: 20
  },
  { 
    id: "P006", 
    name: "Wireless Mouse", 
    sku: "WM-006", 
    category: "Computer",
    price: 899,
    inStock: 32,
    minStock: 10
  },
  { 
    id: "P007", 
    name: "HDMI Cable", 
    sku: "HC-007", 
    category: "Accessories",
    price: 699,
    inStock: 43,
    minStock: 15
  },
  { 
    id: "P008", 
    name: "Wireless Keyboard", 
    sku: "WK-008", 
    category: "Computer",
    price: 1499,
    inStock: 19,
    minStock: 8
  },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Filter items based on search term
  const filteredItems = searchTerm 
    ? inventoryItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : inventoryItems;
  
  const handleAddProduct = () => {
    toast({
      title: "Add Product",
      description: "This would open a product creation form in a complete implementation.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Package className="mr-2 h-6 w-6" /> Inventory Management
          </h1>
          <p className="text-muted-foreground">Manage your products and stock levels</p>
        </div>
        
        <div>
          <Button onClick={handleAddProduct} className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" /> Add New Product
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
                placeholder="Search products..."
                className="w-full pl-9 bg-muted/40 border-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => toast({ title: "Filter", description: "Filter dialog would appear here" })}>
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
              <Button variant="outline" size="sm" onClick={() => toast({ title: "Export", description: "Exporting inventory data..." })}>
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
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Min Stock</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>₹{item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.inStock}</TableCell>
                  <TableCell>{item.minStock}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.inStock <= item.minStock * 0.5
                          ? "bg-destructive/10 text-destructive dark:bg-destructive/20"
                          : item.inStock <= item.minStock
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {item.inStock <= item.minStock * 0.5
                        ? "Critical"
                        : item.inStock <= item.minStock
                        ? "Low Stock"
                        : "In Stock"}
                    </span>
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
