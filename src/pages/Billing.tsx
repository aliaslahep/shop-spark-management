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
import { Search, ShoppingCart, Plus, Trash2, CreditCard, Printer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for available products
const availableProducts = [
  { id: "P001", name: "Wireless Earbuds", price: 1299, stock: 23 },
  { id: "P002", name: "USB-C Cable", price: 499, stock: 52 },
  { id: "P003", name: "Power Bank 10000mAh", price: 1799, stock: 11 },
  { id: "P004", name: "Bluetooth Speaker", price: 2499, stock: 14 },
  { id: "P005", name: "Smartphone Case", price: 599, stock: 78 },
  { id: "P006", name: "Wireless Mouse", price: 899, stock: 32 },
];

// Billing item type
interface BillingItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Billing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [billingItems, setBillingItems] = useState<BillingItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const { toast } = useToast();
  
  // Filter products based on search term
  const filteredProducts = searchTerm 
    ? availableProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : availableProducts;
  
  const handleAddToBill = (product: typeof availableProducts[0]) => {
    const existingItem = billingItems.find(item => item.id === product.id);
    
    if (existingItem) {
      // Increment quantity if already in cart
      setBillingItems(
        billingItems.map(item => 
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new item with quantity 1
      setBillingItems([...billingItems, { ...product, quantity: 1 }]);
    }
    
    toast({
      title: "Added to bill",
      description: `${product.name} added to the current bill`,
    });
  };
  
  const handleRemoveItem = (itemId: string) => {
    setBillingItems(billingItems.filter(item => item.id !== itemId));
  };
  
  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setBillingItems(
      billingItems.map(item => 
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };
  
  const handleCheckout = () => {
    if (billingItems.length === 0) {
      toast({
        title: "Empty Bill",
        description: "Please add items to the bill before checkout",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Processing Payment",
      description: "This would open the payment dialog in a complete implementation",
    });
  };
  
  // Calculate totals
  const subtotal = billingItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // Assuming 18% GST
  const total = subtotal + tax;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Product selection area */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <ShoppingCart className="mr-2 h-6 w-6" /> New Transaction
          </h1>
          <p className="text-muted-foreground">Create a new sale transaction</p>
        </div>
        
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products by name or scan barcode..."
                className="w-full pl-9 bg-muted/40 border-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {availableProducts.map((product) => (
              <Card key={product.id} className="p-4 cursor-pointer hover:border-primary transition-colors">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold">₹{product.price.toFixed(2)}</span>
                    <Button size="sm" onClick={() => handleAddToBill(product)}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Billing area */}
      <div className="space-y-4">
        <Card className="p-4 bg-card border-border">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <div className="space-y-3">
              <div>
                <label htmlFor="name" className="text-sm font-medium block mb-1">Name</label>
                <Input 
                  id="name" 
                  placeholder="Customer name" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-medium block mb-1">Phone</label>
                <Input 
                  id="phone" 
                  placeholder="Contact number" 
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <h2 className="text-lg font-semibold mb-4">Current Bill</h2>
          
          {billingItems.length > 0 ? (
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billingItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-sm">{item.name}</TableCell>
                        <TableCell className="text-sm">₹{item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-6 w-6 p-0" 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="mx-2 text-sm">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-6 w-6 p-0" 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50" 
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax (18% GST)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Button className="w-full" onClick={handleCheckout}>
                    <CreditCard className="h-4 w-4 mr-2" /> Proceed to Payment
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => toast({ title: "Print", description: "This would print the bill in a complete implementation" })}>
                    <Printer className="h-4 w-4 mr-2" /> Print Bill
                  </Button>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <ShoppingCart className="h-10 w-10 mx-auto mb-2 opacity-20" />
              <p>No items in the bill yet</p>
              <p className="text-sm">Search and add products from the left</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
