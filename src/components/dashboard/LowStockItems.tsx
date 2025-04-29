
import * as React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for low stock items
const lowStockItems = [
  { id: "P001", name: "Wireless Earbuds", sku: "WE-001", inStock: 3, minStock: 10 },
  { id: "P002", name: "USB-C Cable", sku: "UC-002", inStock: 2, minStock: 15 },
  { id: "P003", name: "Power Bank 10000mAh", sku: "PB-003", inStock: 1, minStock: 5 },
  { id: "P004", name: "Bluetooth Speaker", sku: "BS-004", inStock: 4, minStock: 8 },
];

export function LowStockItems() {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold">Low Stock Items</h3>
        <p className="text-muted-foreground text-sm">Products that need reordering soon</p>
      </div>
      <ScrollArea className="h-[300px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>In Stock</TableHead>
              <TableHead>Min Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStockItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell className="text-destructive font-medium">{item.inStock}</TableCell>
                <TableCell>{item.minStock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
